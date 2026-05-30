from flask import Flask, request, jsonify
import pytesseract
import cv2
import numpy as np
from flask_cors import CORS
from pdf2image import convert_from_bytes

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Servidor funcionando"


def blurry_image(image, threshold=100):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    score = cv2.Laplacian(gray, cv2.CV_64F).var()
    return score < threshold, score


def process_file(file):

    if file is None:
        raise Exception("File not received")

    filename = file.filename.lower()
    texto_documento = ""

    print("Procesando:", file.filename)

    # PDF
    if filename.endswith(".pdf"):

        pdf_bytes = file.read()

        pages = convert_from_bytes(pdf_bytes)

        for index, page in enumerate(pages):

            img = np.array(page)
            img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)

            blurry, score = blurry_image(img)

            if blurry:
                raise Exception(
                    f"The page {index + 1} of {file.filename} is blurry"
                )

            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

            print("Iniciando OCR PDF")
            text = pytesseract.image_to_string(
                gray,
                lang="spa+eng"
            )
            print("Terminando OCR PDF")

            if len(text.strip()) < 1:
                raise Exception(
                    f"{file.filename} is not clear"
                )

            texto_documento += text + "\n"

    # Imagen
    else:

        npimg = np.frombuffer(file.read(), np.uint8)

        img = cv2.imdecode(
            npimg,
            cv2.IMREAD_COLOR
        )

        if img is None:
            raise Exception(
                f"Could not read {file.filename}"
            )

        blurry, score = blurry_image(img)

        if blurry:
            raise Exception(
                f"{file.filename} is blurry"
            )

        gray = cv2.cvtColor(
            img,
            cv2.COLOR_BGR2GRAY
        )

        print("Iniciando OCR Imagen")
        texto_documento = pytesseract.image_to_string(
            gray,
            lang="spa+eng"
        )
        print("Terminando OCR Imagen")

        if len(texto_documento.strip()) < 1:
            raise Exception(
                f"{file.filename} is not clear"
            )

    return texto_documento


@app.route('/upload', methods=['POST'])
def upload():

    print("UPLOAD RECIBIDO")

    try:

        deed_file = request.files.get("deed")
        excerpt_file = request.files.get("excerpt")
        dui_file = request.files.get("dui")

        print("DEED:", deed_file)
        print("EXCERPT:", excerpt_file)
        print("DUI:", dui_file)

        deed_text = process_file(deed_file)
        excerpt_text = process_file(excerpt_file)
        dui_text = process_file(dui_file)

        return jsonify({
            "success": True,
            "deed": {
                "filename": deed_file.filename,
                "texto": deed_text
            },
            "excerpt": {
                "filename": excerpt_file.filename,
                "texto": excerpt_text
            },
            "dui": {
                "filename": dui_file.filename,
                "texto": dui_text
            }
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "message": str(e)
        }), 400


if __name__ == "__main__":
    app.run(debug=True)