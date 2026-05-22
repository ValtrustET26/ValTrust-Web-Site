
import NewProperty from "../components/layout/seller/newproperties"
import NewLand from "../components/layout/seller/newland"
import ReviewCard from "../components/layout/seller/reviewcard"
import ReviewForm from "../components/layout/seller/leavereview"
import ListingCarousel from "../components/layout/seller/listingcardcarousel"



export default function HomeSeller(){
    return(
    <main className="min-h-screen   bg-[#fafaf9]">
        <section className="relative h-[320px] w-full overflow-hidden">
            <div className="absolute inset-0 bg-gray-300" />
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative z-10 flex h-full items-center px-6 md:px-12">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
              Find The <br />
              Land Of Your <br />
              Dreams With <br />
              Valtrust
            </h1>
          </div>
        </div>
        </section>
 
        <section className="mx-auto max-w-6xl px-4 py-10 md:px-8">
          <NewProperty/>
          <NewLand/>
      </section>

      {/* LISTINGS */}
<section className="mx-auto mb-16 max-w-5xl">
  
  <h2 className="mb-6 text-2xl font-semibold text-[#171717]">
    Explore other seller’s listings
  </h2>

  <ListingCarousel />
</section>

{/* REVIEWS */}
<section className="mx-auto max-w-5xl"> 
  <h2 className="text-3xl font-bold text-[#0B1E4A]">
    Sellers Reviews
  </h2>
  <p className="mb-8 text-base text-gray-600">
    Experiences From Our Clients
  </p>
  <div className="grid items-start gap-5 lg:grid-cols-2">
    {/*Review section*/}
    <ReviewCard
      name="Roberto Méndez"
      rating={5}
      review="I had an excellent experience using this website to evaluate and list my house for sale. The platform made the entire process incredibly simple and professional from start to finish. I was especially impressed by how detailed the property valuation was. It didn’t just give me a random estimate  it analyzed the neighborhood, nearby sales, market trends, property size, amenities, and many other factors to provide a realistic and accurate price range for my home."
    />
 <div className=" grid items-start flex flex-col gap-6">
    <ReviewCard
      name="Alberto Ramírez"
      rating={5}
      review= "Great platform for homeowners! The valuation was detailed and accurate, and listing my property was fast and easy."
    />
    <ReviewCard
      name="Nohemy Hernández"
      rating={5}
      review="Very useful website for selling a house. I loved how it analyzed the area and market prices to give a realistic property value."
    />
    </div>
  </div>
</section>
<ReviewForm/>
    </main>
    )
}
 
