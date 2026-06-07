import BuyerNav from "../components/layout/navbars/buyernav";
import SellerBuyerFooter from "../components/layout/footers/SellerBuyerFooter";
export default function BuyerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full flex flex-col">
      <BuyerNav/>
      <main>{children}</main>
       <SellerBuyerFooter/>
    </div>
  );
}
