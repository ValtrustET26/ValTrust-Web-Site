export const metadata = {
  title: "Valtrust Login",
};
import Image from "next/image";

export default function Login() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      <div className="absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-gradient-to-br from-blue-600 to-blue-400" />

      <div className="relative z-10 flex min-h-screen flex-col md:flex-row">
        <section className="flex w-full items-center justify-center px-6 py-10 md:w-1/2 lg:px-24">
          <div className="w-full max-w-md">
              <Image
                src={"/valtrust-isologo.png"}
                alt={"Valtrust Isologo"}
                height={200}
                width={200}
              />
           

            <div className="mb-8">
              <h2 className="text-4xl font-light text-black sm:text-5xl">
                Welcome Back
              </h2>
            </div>

            <form className="space-y-4">
              <div>
                <label className="mb-2 block text-sm text-gray-600">
                  Email or username
                </label>

                <input
                  type="text"
                  placeholder="Enter your email"
                  className="h-11 w-full rounded-md border border-gray-300 px-4 text-black outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-600">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Enter your password"
                  className="h-11 w-full rounded-md border border-gray-300 px-4 text-black outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
                <label className="flex items-center text-gray-500">
                  <input type="checkbox" className="mr-2" />
                  Remember me
                </label>

                <a href="#" className="text-[#2f8fb6] hover:underline">
                  Forgot your password?
                </a>
              </div>

              <button
                type="submit"
                className="h-11 w-full rounded-md bg-blue-400 font-semibold text-white transition hover:bg-blue-500"
              >
                LOGIN
              </button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-300" />
              <span className="text-sm text-gray-400">OR</span>
              <div className="h-px flex-1 bg-gray-300" />
            </div>

            <div className="space-y-3">
              <button className="flex h-11 w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white transition hover:bg-gray-50">
                <span className="text-sm font-medium text-gray-800">
                  LOGIN WITH GOOGLE
                </span>
              </button>

              <button className="flex h-11 w-full items-center justify-center gap-3 rounded-md bg-[#252d8d] text-white transition hover:bg-[#1d2370]">
                <span className="text-lg font-bold">f</span>

                <span className="text-sm font-medium">LOGIN WITH FACEBOOK</span>
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?
                <a
                  href="#"
                  className="ml-1 font-semibold text-[#2f8fb6] hover:underline"
                >
                  Register here
                </a>
              </p>
            </div>
          </div>
        </section>

        <section className="relative hidden h-screen overflow-hidden md:flex md:w-1/2 items-center justify-center">
          <div className="absolute -right-28 -top-40 h-[720px] w-[720px] rounded-full bg-gradient-to-br from-[#163d96] via-[#2458d4] to-[#3f95ff]" />

          <div className="absolute -bottom-20 -right-16 h-[320px] w-[320px] rounded-full bg-[#14337e]" />

          <div className="relative z-10 text-center text-white mb-10 ml-10">
            <Image
              src={"/valtrust-isologo-white.png"}
              alt={"Valtrust Isologo"}
              height={200}
              width={200}
            />

            <p className="text-2xl text-black font-bold -mt-10">Glad to have you here!</p>
          </div>
        </section>
      </div>
    </div>
  );
}
