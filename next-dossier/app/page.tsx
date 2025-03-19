import About from "./components/About";
import ContactForm from "./components/Contact";
import Hero from "./components/Hero";
import Navigation from "./components/Navigation";
import Portfolio from "./components/Portfolio";
import Pricing from "./components/Pricing";
import Profile from "./components/Profile";
import Resume from "./components/Resume";
import Services from "./components/Services";
import Skill from "./components/Skills";
import Testimonial from "./components/Testimonial";

export default function Home() {
  return (
    <div className="lg:min-h-screen lg:flex bg-gray-900 text-foreground lg:p-8  lg:w-screen overflow-x-hidden">
      <Profile />
      <Navigation />
      <div className="flex flex-col">
        <Hero />
        <About />
        <Resume />
        <Services />
        <Skill />
        <Portfolio />
        <Testimonial />
        <Pricing />
        <ContactForm />
      </div>
    </div>
  );
}
