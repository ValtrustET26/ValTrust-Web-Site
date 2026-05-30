"use client";

import { CheckCircle } from "lucide-react";

export default function Page() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 px-4">
      
      {/* Popup */}
      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          bg-[#fafaf9]
          shadow-2xl
          p-6
          sm:p-8
          text-center
          overflow-hidden
        "
      >

        {/* Title + Icon */}
        <div className="flex items-center justify-center gap-2 mb-5">
          <h2
            className="
              text-4xl
              sm:text-5xl
              font-extrabold
              text-[#171717]
            "
          >
            Success!
          </h2>

          <CheckCircle
            size={42}
            className="text-green-500"
            strokeWidth={2.5}
          />
        </div>

        {/* Description */}
        <p
          className="
            text-base
            sm:text-lg
            text-gray-700
            leading-relaxed
            mb-8
          "
        >
          Your property is now listed in the{" "}
          <span className="text-[#1A6373] font-semibold">
            Property Marketplace.
          </span>
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          
          <button
            className="
              flex-1
              rounded-2xl
              bg-[#1A6373]
              py-4
              text-lg
              font-semibold
              text-white
              transition-all
              duration-300
              hover:bg-[#144d59]
              hover:scale-[1.02]
              active:scale-95
              shadow-lg
            "
          >
            View Property
          </button>

          <button
            className="
              flex-1
              rounded-2xl
              bg-[#1A6373]
              py-4
              text-lg
              font-semibold
              text-white
              transition-all
              duration-300
              hover:bg-[#144d59]
              hover:scale-[1.02]
              active:scale-95
              shadow-lg
            "
          >
            Continue
          </button>

        </div>
      </div>
    </div>
  );
}