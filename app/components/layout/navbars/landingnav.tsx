"use client";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";


export default function LandingNav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className=" fixed top-0 left-0 bg-wh-main text-sm text-black w-full min-height z-50 fixed  backdrop-blur-md">
      <div className="flex items-center">
        <div className="mt-3 flex-1 items-center justify-between">
          <Image src={""} alt="Logo Image" width={"150"} />
        </div>

        <div className="flex flex-col">
          <button
            className="text-3xl md:hidden  items-center p-5 flex items-center flex-3z-50"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={50} /> : <Menu size={50} />}
          </button>
        </div>
      </div>

      {open && (
        <div className=" flex text-black flex-col md:hidden delay-170 ease-in ease-out bg-wh-main items-center right-0 h-screen w-1/2 fixed gap-20 text-xl z-10">
          <div className="flex flex-col items-center h-1/2 w-full divide-y-2 divide-bl-main  ">
            <h3 className="p-10 w-full flex flex-col items-center">Home</h3>
            <h3 className="p-10 w-full flex flex-col items-center">About Us</h3>
            <h3 className="p-10 w-full flex flex-col items-center">Premium</h3>
          </div>

          <div className="flex flex-col gap-4 w-1/2">
            <button className="bg-bl-main text-wh-main text-sm p-5 rounded-xl flex justify-center">
              Sign In
            </button>
            <button className="bg-gray-400 text-wh-main p-5 text-sm rounded-xl flex justify-center">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
