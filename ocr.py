from flask import Flask, request, jsonify
import pytesseract
from pytesseract import Output
import cv2
import numpy as np
from flask_cors import CORS
from pdf2image import convert_from_bytes
import re

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Servidor funcionando"


def blurry_image(image, threshold=150):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    score = cv2.Laplacian(gray, cv2.CV_64F).var()
    return score < threshold, score

def get_ocr_confidence(gray):
    data = pytesseract.image_to_data(
        gray,
        lang='spa+eng',
        output_type=Output.DICT
    )
    confidences = []

    for conf in data['conf']:
        try:
            conf = float(conf)

            if conf > 0:
                confidences.append(conf)
        except:
            pass

    if len(confidences) ==0:
        return 0
    return sum(confidences) / len(confidences)


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
            print('blur score', score)

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

            confidence = get_ocr_confidence(gray)
            
            texto_limpio = re.sub(r'[^A-Za-zÁÉÍÓÚáéíóúÑñ0-9]', '', text)
            print('OCR confidence', confidence)
            print('readable chars', len(texto_limpio))

            if len(texto_limpio) < 100:
                raise Exception(
                    f"{file.filename} contains insufficient readable chars"
                )
            if confidence < 80:
                raise Exception(
                    f'{file.filename} OCR confidence is too low'
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
        print('blur score', score)

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

        confidence = get_ocr_confidence(gray)

        texto_limpio = re.sub(r'[^A-Za-zÁÉÍÓÚáéíóúÑñ0-9]','',texto_documento)

        print("OCR confidence:", confidence)
        print("Readable chars:", len(texto_limpio))

        if len(texto_limpio) < 100:
            raise Exception(
                f"{file.filename} contains insufficient readable text"
            )

        if confidence < 80:
            raise Exception(
                f"{file.filename} OCR confidence too low"
            )

    return texto_documento


@app.route('/upload', methods=['POST'])
def upload():

    print("================================", flush=True)
    print("UPLOAD RECIBIDO", flush=True)
    print("================================", flush=True)

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