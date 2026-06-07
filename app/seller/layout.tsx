import SellerNav from "../components/layout/navbars/sellernav";
import SellerBuyerFooter from "../components/layout/footers/SellerBuyerFooter";


export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full flex flex-col">
      <SellerNav/>
      <main>{children}</main>
      <SellerBuyerFooter/>
    </div>
  );
}
