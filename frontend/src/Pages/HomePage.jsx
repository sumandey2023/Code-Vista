import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import FeaturedSection from "../components/FeaturedSection";

const HomePage = () => {
  return (
    <>
      <div className="bg-gradient-to-br from-base-100 via-base-200 to-base-300">
        <NavBar />
        <Hero />
        <FeaturedSection />
      </div>
    </>
  );
};

export default HomePage;
