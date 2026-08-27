import About from "./components/About";
import ContactSection from "./components/ContactSection";
import Hero from "./components/Hero";
import Navigation from "./components/Navigation";
import PortfolioSection from "./components/PortfolioSection";
import Pricing from "./components/Pricing";
import Profile from "./components/Profile";
import Resume from "./components/Resume";
import Services from "./components/Services";
import Skill from "./components/Skills";
import Testimonial from "./components/Testimonial";
import ScrollToTop from "./components/ScrollToTop";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Okechuqu",
    url: "https://okechuqu.com/",
    description:
      "Web development, API development, technical SEO, and tutoring services.",
  };

  return (
    <div className="lg:min-h-full lg:flex bg-gray-950 text-foreground lg:p-8 lg:w-full overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Profile />
      <Navigation />
      <main className="flex flex-col w-full lg:ml-[22rem] xl:ml-[20rem] 2xl:ml-[24rem]">
        <Hero />
        <About />
        <Resume />
        <Services />
        <Skill />
        <PortfolioSection />
        <Testimonial />
        <Pricing />
        <ContactSection />
      </main>
      <ScrollToTop />
    </div>
  );
}
