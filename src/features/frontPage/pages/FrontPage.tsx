import { Nav, YuyuInfo, InfoWebpage, Footer } from "@features";
export default function FrontPage() {
  return (
    <div className="max-w-screen">
      <header className="bg-[url(/public/staticImgs/generalUse/mainHeader.png)] bg-cover bg-center text-center text-[#ff476c] text-shadow-[1px_1px_0_#b81466,2px_2px_0_#b81466,3px_3px_0_#b81466,4px_4px_0_#b81466] h-max text-5xl lg:text-7xl pt-2.5 m-auto py-8">
        <h1>Yuyuko Saigyouji</h1>
      </header>

      <Nav></Nav>
      <div>
        <YuyuInfo />
        <InfoWebpage />
      </div>
      <Footer />
    </div>
  );
}
