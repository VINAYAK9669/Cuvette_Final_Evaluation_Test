import Advancement from "../components/HomePage/Advancement";
import Client from "../components/HomePage/Client";
import Features from "../components/HomePage/Features";
import Footer from "../components/HomePage/Footer";
import FormBots from "../components/HomePage/FormBots";
import FormSection from "../components/HomePage/FormSection";
import Hero from "../components/HomePage/Hero";
import Nav from "../components/HomePage/Nav";
import RealTime from "../components/HomePage/RealTime";

function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <section className="section-margin ">
        <Nav />
      </section>
      <section className="section-margin  ">
        <Hero />
      </section>
      <section className="section-margin ">
        <FormSection />
      </section>
      <section className="section-margin ">
        <Advancement />
      </section>
      <section className="section-margin ">
        <Client />
      </section>
      <section className="section-margin ">
        <RealTime />
      </section>
      <section className="section-margin ">
        <Features />
      </section>
      <section className="section-margin ">
        <FormBots />
      </section>
      <section className="section-margin ">
        <Footer />
      </section>
    </div>
  );
}

export default HomePage;
