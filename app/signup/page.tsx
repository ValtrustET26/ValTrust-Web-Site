"use client";
import Image from "next/image";
import { useSignUp, useUser, useAuth, } from "@clerk/nextjs";
import { useState } from "react";
import { SubmitEventHandler } from "react";
import { X } from "lucide-react";


export default function SignUp() {
  const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setErrorMessage] = useState("")
   const [verification, setVerification] = useState(false); 
  const role = "buyer"
  const {signUp, errors, fetchStatus} = useSignUp();
  const [code, setCode] = useState("");
  
  

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please complete the form");
      return;
    } else if (password !== confirmPassword) {
      setErrorMessage("The passwords do not match ");
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMessage("Invalid email address");
      return;
    } else if (role == null) {
      setErrorMessage("Please choose a role");
      return;
    } else {
      setErrorMessage("");
    }

   try {
    await signUp.create({
      emailAddress: email.trim(),
      password,
      unsafeMetadata: {
        firstName,
        lastName,
        role,
      },
    });
   await signUp.verifications.sendEmailCode();
    const result = await signUp.verifications.verifyEmailCode({
      code,
    });
    

       

     setVerification(true);
   } catch (err: any) {
     setErrorMessage(err.errors?.[0]?.message || "problems with SignUp");
     console.log(error)
   }

   
  };


  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      <div className="absolute -bottom-28 -left-28 w-72 h-72 rounded-full bg-gradient-to-br from-[#2563eb] to-[#60a5fa] z-0" />

      <div className="relative z-10 min-h-screen flex flex-col md:flex-row">
        {!verification && (
          <div className="w-full md:w-1/2 min-h-screen flex items-center justify-center px-6 sm:px-10 lg:px-24 py-10">
            <div className="w-full max-w-md -mt-10">
              <div>
                <Image
                  src={"/valtrust-isologo.png"}
                  alt={"Valtrust Isologo"}
                  height={200}
                  width={200}
                />
              </div>

              <div className="mb-8">
                <h2 className="text-4xl sm:text-5xl font-light text-black mb-2">
                  Sign Up
                </h2>

                <p className="text-gray-500">
                  Sign up to continue your experience
                </p>
              </div>
              {error != "" && (
                <div className=" flex justify-center bg-red-200 border-solid border-2 border-red-400 text-black text-center rounded-md  mb-3 h-10 items-center">
                  <p className="w-7/8">{error}</p>
                  <X
                    size={12}
                    className="w-1/8"
                    onClick={() => setErrorMessage("")}
                  />
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    value={firstName}
                    type="text"
                    placeholder="First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full h-11 px-4 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#4ea2ff] text-black"
                  />
                </div>
                <div>
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                    placeholder="Last Name"
                    className="w-full h-11 px-4 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#4ea2ff] text-black"
                  />
                </div>

                <div>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                    className="w-full h-11 px-4 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#4ea2ff] text-black"
                  />
                </div>

                <div>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    className="w-full h-11 px-4 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#4ea2ff] text-black"
                  />
                </div>

                <div>
                  <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                    placeholder="Confirm password"
                    className="w-full h-11 px-4 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#4ea2ff] text-black"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-11 rounded-md bg-[#5aa8ff] hover:bg-[#4696ee] text-white font-semibold transition"
                >
                  Sign Up
                </button>

                <div id="clerk-captcha"></div>
              </form>

              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-gray-300" />
                <span className="text-gray-400 text-sm">OR</span>
                <div className="flex-1 h-px bg-gray-300" />
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?
                  <a
                    href="#"
                    className="text-[#2f8fb6] font-semibold hover:underline ml-1"
                  >
                    Login
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}

        {verification && (
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter 6-digit code"
          />
        )}

        <div className="hidden md:flex md:w-1/2 h-screen items-center justify-center relative overflow-hidden">
          <div className="absolute -top-40 -right-28 w-[720px] h-[720px] rounded-full bg-gradient-to-br from-[#163d96] via-[#2458d4] to-[#3f95ff]" />

          <div className="absolute -bottom-28 -right-16 w-[320px] h-[320px] rounded-full bg-[#14337e]" />

          <div className="relative z-10 text-center text-white mb-10 ml-10">
            <Image
              src={"/valtrust-isologo-white.png"}
              alt={"Valtrust Isologo"}
              height={200}
              width={200}
            />

            <p className="text-4xl text-black">Welcome</p>

            <p className="text-xl lg:text-2xl text-black -mt-20 font-bold ">
              Glad to have you here!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
