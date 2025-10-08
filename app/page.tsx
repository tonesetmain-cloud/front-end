import NavBar from "@/components/navbar/Navbar";
import Welcome from "@/components/home/Welcome";
import MainFeatures from "@/components/home/MainFetures";
import YetToComeFeatures from "@/components/home/YetToComeFeatures";
import Footer from "@/components/footer/Footer";
import Pricing from "@/components/home/Pricing";

export default function Home() {
  return (
    <div>
      <NavBar />
      <Welcome />
      <MainFeatures />
      <YetToComeFeatures />
      <Pricing />
      <Footer />
    </div>
  );
}
