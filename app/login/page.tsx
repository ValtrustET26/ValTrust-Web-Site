"use client";
import Image from "next/image";
import { useSignIn, useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  // ✅ Clerk v7 (Core 3): igual que useSignUp, retorna { signIn, errors, fetchStatus }
  const { signIn, errors, fetchStatus } = useSignIn();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isLoading = fetchStatus === "fetching";

  // Si ya está autenticado, redirige
  if (isSignedIn) {
    router.push("/");
    return null;
  }

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Please complete the form");
      return;
    }

    // ✅ Clerk v7: signIn.password() en lugar de signIn.create()
    const { error } = await signIn.password({
      emailAddress: email.trim(),
      password,
    });

    if (error) {
      setErrorMessage(error.message || "Invalid Credentials");
      console.error(JSON.stringify(error, null, 2));
      return;
    }

    // ✅ Clerk v7: signIn.finalize() en lugar de setActive()
    if (signIn.status === "complete") {
    await signIn.finalize({
      navigate: () => {
        router.push("/buyer");
      },
    });
  } else if (signIn.status === "needs_second_factor") {
    // El usuario tiene MFA activado, necesitas manejar ese paso
    setErrorMessage("Se requiere segundo factor de autenticación");
  } else if (signIn.status === "needs_client_trust") {
    // Clerk detectó un dispositivo nuevo/desconocido
    setErrorMessage("Dispositivo no reconocido, revisa tu email");
  } else {
    console.log("Status inesperado:", signIn.status);
  }
  };

  const handleGoogleLogin = async () => {
  const { error } = await signIn.sso({
    strategy: "oauth_google",
    redirectCallbackUrl: "/sso-callback",
    redirectUrl: "/",
  });
  if (error) console.error(error.message);
};

const handleFacebookLogin = async () => {
  const { error } = await signIn.sso({
    strategy: "oauth_facebook",
    redirectCallbackUrl: "/sso-callback",
    redirectUrl: "/",
  });
    if (error) console.error(error.message);
};
  

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

            {/* Errores */}
            {errorMessage && (
              <p className="mb-4 rounded-md bg-red-50 px-4 py-2 text-sm text-red-600">
                {errorMessage}
              </p>
            )}
           


            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm text-gray-600">
                  Email or username
                </label>
                <input
                  type="text"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                disabled={isLoading}
                className="h-11 w-full rounded-md bg-blue-400 font-semibold text-white transition hover:bg-blue-500 disabled:opacity-60"
              >
                {isLoading ? "Logging in..." : "LOGIN"}
              </button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-300" />
              <span className="text-sm text-gray-400">OR</span>
              <div className="h-px flex-1 bg-gray-300" />
            </div>

            <div className="space-y-3">
              <button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="flex h-11 w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white transition hover:bg-gray-50 disabled:opacity-60"
              >
                <span className="text-sm font-medium text-gray-800">
                  LOGIN WITH GOOGLE
                </span>
              </button>

              <button
                onClick={handleFacebookLogin}
                disabled={isLoading}
                className="flex h-11 w-full items-center justify-center gap-3 rounded-md bg-[#252d8d] text-white transition hover:bg-[#1d2370] disabled:opacity-60"
              >
                <span className="text-lg font-bold">f</span>
                <span className="text-sm font-medium">LOGIN WITH FACEBOOK</span>
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?
                <a
                  href="/signup"
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
            <p className="text-2xl text-black font-bold -mt-10">
              Glad to have you here!
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}