import Hero from "../components/HomePage/Hero";
import Nav from "../components/HomePage/Nav";

function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <div>
        <Nav />
        <Hero />
      </div>
    </div>
  );
}

export default HomePage;
