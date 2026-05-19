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

      <section className="bg-white p-5 text-black flex flex-col min-h-full p-20">
        <div className="text-lg flex items-center w-full mt-10 justify-start p-10 font-bold font-sans">
          Explore Our Communities
        </div>

        <div className="flex flex-col  w-full items-center justify-center md:flex-row gap-5 ">
          <div className=" md:w-2/5 w-2/3 flex jusify-center flex-col shadow-2xl rounded-lg gap-2 transition-all duration-300 hover:scale-105">
            <div className="relative w-full  h-100 ">
              <Image
                src={"/landing-image.png"}
                alt={"Santa Tecla"}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <h3 className="p-3 font-bold">Santa Tecla</h3>
            <p className="p-2">Urban Area</p>
          </div>

          <div className="md:w-2/5 w-2/3 flex jusify-center flex-col shadow-2xl rounded-lg gap-2 transition-all duration-300 hover:scale-105">
            <div className="relative w-full h-100 ">
              <Image
                src={"/landing-image.png"}
                alt={"Santa Tecla"}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <h3 className="p-3 font-bold">Santa Ana</h3>
            <p className="p-2">Urban Area</p>
          </div>
        </div>
      </section>

      <section className="flex flex-col md:flex-row items-center justify-center w-full bg-white text-black gap-5">
        <div className="w-2/3  flex justify-center items-center flex-col mt-5 gap-5">
          <h2 className="text-5xl font-bold flex justify-start w-full md:w-2/3 ">About Valtrust</h2>
          <p className="text-2xl">
            We are a digital platform that <br />
            modernizes property buying, selling, <br />
            and valuation in El Salvador through <br />
            AI and real market data. We connect <br />
            owners, buyers and investors in a <br />
            secure and transparent environment,
            <br />
            making real state decisions easier <br />
            and smarter.
          </p>
        </div>

        <div className="w-full flex gap-10 items-center justify-center">
          <div className="relative w-1/3 h-50 ">
            <Image
              src={"/landing-image.png"}
              alt={"Santa Tecla"}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="relative w-1/3 h-50 ">
            <Image
              src={"/landing-image.png"}
              alt={"Santa Tecla"}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
