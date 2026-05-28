import SellerNav from "../components/layout/navbars/sellernav";


export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full flex flex-col">
      <SellerNav/>
      <main>{children}</main>
    </div>
  );
}
