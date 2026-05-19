
import Header from "../sections/Header";
import CartSidebar from "./shop/components/CartSidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header/>
      <CartSidebar />
      <main className="">{children}</main>
    </>
  );
}
