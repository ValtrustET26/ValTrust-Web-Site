import Image from "next/image";
import LandingNav from "./components/layout/navbars/landingnav";


export default function Home() {
  return (
    <div className="flex flex-col bg-zinc-50 font-sans dark:bg-black">
      <LandingNav />

      <section className="relative h-screen w-full overflow-hidden">
        <Image
          src={""}
          alt="landing image"
          className="object-cover"
          fill
          priority
        />

        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute inset-0 z-10 flex items-center px-6 md:px-12">
          <div className="max-w-4xl">
            <h1 className="text-[clamp(2.5rem,8vw,6rem)] font-bold text-white leading-tight">
              Find Your Dream's <br />
              Land with <br />
              Valtrust
            </h1>
          </div>
        </div>
      </section>

      <section className="bg-wh-main">
        <div className="flex flex-col bg-wh-main gap-5 w-full text-black justify-center items-center mt-10 ">
          <div className="flex flex-col bg-white text-black justify-center items-center p-10 w-2/3 h-2/3">
            <Image src={""} alt={"asdf"} />

            <p>Visualize Homes</p>
          </div>

          <div className="flex flex-col bg-white text-black justify-center items-center p-10 w-2/3 h-2/3">
            <Image src={""} alt={"asdf"} />

            <p>Top Listing</p>
          </div>

          <div className="flex flex-col bg-white text-black justify-center items-center p-10 w-2/3 h-2/3">
            <Image src={""} alt={"asdf"} />

            <p>Evaluate Land</p>
          </div>
        </div>
      </section>

      <section className="">
        <div className="flex flex-col"></div>
      </section>
    </div>
  );
}
