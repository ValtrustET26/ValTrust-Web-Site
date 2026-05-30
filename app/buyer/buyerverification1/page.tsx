"use client";

import { useState } from "react";
import {
  IdCard,
  ScanFace,
  FileText,
  Check,
} from "lucide-react";

export default function Page() {
  const [step, setStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: "DUI",
      description: "Upload a clear photo of your DUI",
      icon: <IdCard size={70} strokeWidth={1.5} />,
    },
    {
      id: 2,
      title: "Face ID",
      description: "Verify your face",
      icon: <ScanFace size={70} strokeWidth={1.5} />,
    },
    {
      id: 3,
      title: "Property Deed",
      description: "Upload the house document",
      icon: <FileText size={70} strokeWidth={1.5} />,
    },
  ];

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4 py-10">
      <section className="w-full max-w-6xl bg-white rounded-3xl shadow-xl border border-gray-200 p-8 md:p-12">
        
        {/* TITLE */}
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold text-black">
            Buyer Verification
          </h1>

          {/* PROGRESS BAR */}
          <div className="w-full max-w-3xl mt-8 relative">
            <div className="absolute top-1/2 left-0 w-full h-[3px] bg-gray-300 -translate-y-1/2 rounded-full" />

            <div
              className="absolute top-1/2 left-0 h-[3px] bg-[#0f7c90] -translate-y-1/2 rounded-full transition-all duration-500"
              style={{
                width:
                  step === 1
                    ? "0%"
                    : step === 2
                    ? "50%"
                    : "100%",
              }}
            />

            <div className="relative flex justify-between">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center
                    transition-all duration-300
                    ${
                      step >= item
                        ? "bg-[#0f7c90] border-[#0f7c90] text-white"
                        : "bg-white border-gray-400"
                    }
                  `}
                >
                  {step > item ? (
                    <Check size={14} />
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="text-center mt-14">
            <p className="text-[#172554] font-semibold text-xl leading-snug">
              Upload your ID, verify your face, and add the property deed.
            </p>

            <p className="text-[#172554] font-semibold text-xl">
              Make sure everything is clear and visible
            </p>
          </div>
        </div>

        {/* STEPS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
          {steps.map((item) => {
            const active = step === item.id;
            const completed = step > item.id;

            return (
              <div
                key={item.id}
                className="flex flex-col items-center text-center"
              >
                <h3
                  className={`
                    font-semibold text-lg mb-4 transition-all
                    ${
                      active
                        ? "text-[#0f7c90]"
                        : completed
                        ? "text-green-600"
                        : "text-black"
                    }
                  `}
                >
                  {item.title}
                </h3>

                <div
                  className={`
                    w-[170px] h-[120px]
                    rounded-xl border-2
                    flex items-center justify-center
                    transition-all duration-300
                    ${
                      active
                        ? "border-[#0f7c90] bg-[#ecfeff] scale-105 shadow-lg"
                        : completed
                        ? "border-green-500 bg-green-50"
                        : "border-gray-300 bg-[#fafafa]"
                    }
                  `}
                >
                  <div
                    className={
                      active
                        ? "text-[#0f7c90]"
                        : completed
                        ? "text-green-600"
                        : "text-gray-500"
                    }
                  >
                    {item.icon}
                  </div>
                </div>

                <p className="mt-5 text-gray-700 text-base max-w-[220px]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* BUTTONS */}
        <div className="flex justify-center gap-6 mt-16">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className={`
              px-10 py-3 rounded-full text-white font-semibold
              transition-all duration-300
              ${
                step === 1
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#0b1f5c] hover:scale-105"
              }
            `}
          >
            Go back
          </button>

          <button
            onClick={nextStep}
            disabled={step === 3}
            className={`
              px-10 py-3 rounded-full text-white font-semibold
              transition-all duration-300
              ${
                step === 3
                  ? "bg-green-600 cursor-default"
                  : "bg-[#0b1f5c] hover:scale-105"
              }
            `}
          >
            {step === 3 ? "Completed" : "Continue"}
          </button>
        </div>
      </section>
    </main>
  );
}