import AIServices from "@/components/AIServices";
import BenefitsBanner from "@/components/BenefitsBanner";
import Collaboration from "@/components/Collaboration";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WebsiteBundles from "@/components/WebsiteBundles";
// import Pricing from "@/components/Pricing";
import Implementation from "@/components/Implementation";
import ButtonGradient from "@/public/assets/svg/ButtonGradient";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header locale={locale} />
        <Hero />
        <Collaboration />
        <AIServices />
        <WebsiteBundles />
        <Implementation />
        <BenefitsBanner />
        {/* <Pricing /> */}
        <Contact />
        <Footer />
      </div>
      <ButtonGradient />
    </>
  );
}