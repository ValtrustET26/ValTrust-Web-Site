"use client";
import Image from "next/image";
import { Menu, X, House, SwatchBook, Gem } from "lucide-react";
import { useState } from "react";



export default function LandingNav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className=" fixed top-0 left-0 bg-wh-main text-sm text-black w-full min-height z-50 fixed backdrop-blur-md">
      <div className="flex items-center h-20">
        <div className="mt-3 flex-1 items-center justify-between">
          <Image
            src={"/valtrust-isologo.png"}
            alt="Logo Image"
            width={125}
            height={125}
          />
        </div>

        <div className="flex flex-col">
          <button
            className="text-3xl md:hidden  items-center p-5 flex items-center flex-3z-50 z-20"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={35} /> : <Menu size={35} className="text-bold " />}
          </button>
        </div>
      </div>

      {open && (
        <div className=" flex text-black flex-col md:hidden w-50 p-8 fixed bg-wh-main items-center top-5 right-4 gap-20 text-xl z-10 rounded-lg shadow-lg border-black border-solid border-2">
          <div className="flex flex-col items-center text-left ">
            <div className="w-full flex gap-2 justify-center items-center ">
              <House size={30} />
              <h3 className="w-full flex flex-col">Home</h3>
            </div>
            <div className="w-full flex gap-2 justify-center items-center">
              <SwatchBook size={30} />
              <h3 className="w-full flex flex-col">About Us</h3>
            </div>
            <div className="w-full flex gap-2 justify-center items-center">
              <Gem size={30} />
              <h3 className="w-full flex flex-col">Premium</h3>
            </div>
          </div>
        </div>
      )}

      <div className="flex md:hidden w-full items-center justify-center p-3 gap-5 text-lg">
        <button className="p-5 bg-zinc-200 w-1/3 rounded-lg font-bold">Sign In</button>
        <button className="p-5 bg-bl-main  w-1/3 rounded-lg text-white font-bold">Sign Up</button>
      </div>
    </nav>
  );
}
