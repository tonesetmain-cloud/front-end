import NavBar from "@/components/navbar/Navbar";
import Welcome from "@/components/home/Welcome";
import MainFeatures from "@/components/home/MainFetures";
import YetToComeFeatures from "@/components/home/YetToComeFeatures";
import Footer from "@/components/footer/Footer";
import Pricing from "@/components/home/Pricing";
import Contact from "@/components/home/Contact";

export default function Home() {
  return (
    <div>
      <NavBar home={true} />
      <Welcome />
      <MainFeatures />
      <YetToComeFeatures />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  );
}
