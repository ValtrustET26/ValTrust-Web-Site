import BuyerNav from "../components/layout/navbars/buyernav";
export default function BuyerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full flex flex-col">
      <BuyerNav/>
      <main>{children}</main>
    </div>
  );
}
