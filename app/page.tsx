import Image from "next/image";
import LandingNav from "./components/layout/navbars/landingnav";


export default function Home() {
  return (
    <div className="flex flex-col bg-zinc-50 font-sans dark:bg-black">
      <LandingNav />

      <section className="relative w-full h-[70vh]  md:h-screen overflow-hidden z-1">
        <Image
          src={"/landing-image.png"}
          priority
          className="object-fit object-cover"
          alt={"landing-image"}
          fill
        />

        <div className="absolute inset-0 flex items-center pt-20 md:pt-0r">
          <div className="px-6 md:px-16 max-w-3xl">
            <h1 className="text-white font-bold leading-tight text-5xl sm:text-6xl md:text-7xl">
              Find Your Dream
              <br />
              Land With <br />
              Valtrust
            </h1>
          </div>
        </div>
      </section>

      <section className="bg-white w-full flex text-black gap-10 flex-col md:flex-row  items-center justify-center p-5 -mt-30 md:-mt-40 ">
        <div className="relative w-full md:w-1/3 h-80 rounded-3xl shadow-2xl bg-white p-5 z-12  transition-all duration-300 hover:scale-105">
          <Image
            src={"/visualize-homes.png"}
            alt={"Visualize homes Image"}
            className="object-contain rounded-lg"
            fill
          />
        </div>
        <div className="relative w-full md:w-1/3 h-80 rounded-3xl shadow-2xl bg-white p-5 z-12  transition-all duration-300 hover:scale-105">
          <Image
            src={"/top-listing.png"}
            alt={"Top Listing Image"}
            className="object-contain"
            fill
          />
        </div>
        <div className="relative w-full md:w-1/3 h-80 rounded-3xl shadow-2xl bg-white p-5 z-12  transition-all duration-300 hover:scale-105">
          <Image
            src={"/evaluate-land.png"}
            alt={"Evaluate Land Image"}
            className="object-contain"
            fill
          />
        </div>
      </section>

      <section className="bg-white h-screen text-black">
<div className="text-lg flex items-center w-full mt-10 justify-start p-10 font-bold font-sans">Explore Our Communities</div>
      </section>
    </div>
  );
}
