import { getContent } from "@/lib/content";
import { HeroSection } from "@/features/hero/HeroSection";
import { MarqueeSection } from "@/features/marquee/MarqueeSection";
import { AboutSection } from "@/features/about/AboutSection";
import { WorksSection } from "@/features/works/WorksSection";
import { ServicesSection } from "@/features/services/ServicesSection";
import { ProcessSection } from "@/features/process/ProcessSection";
import { ManifestoSection } from "@/features/manifesto/ManifestoSection";
import { ContactSection } from "@/features/contact/ContactSection";
import { ScrollHero } from "@/components/scroll-hero";
import { ScrollScale } from "@/components/scroll-scale";

export default function Home() {
  const content = getContent("tr");

  return (
    <>
      <ScrollHero>
        <HeroSection content={content.hero} />
      </ScrollHero>
      <main>
        <MarqueeSection content={content.marquee} />
        <ScrollScale>
          <AboutSection content={content.about} />
        </ScrollScale>
        <ScrollScale>
          <WorksSection content={content.works} />
        </ScrollScale>
        <ScrollScale>
          <ServicesSection content={content.services} />
        </ScrollScale>
        <ScrollScale>
          <ProcessSection content={content.process} />
        </ScrollScale>
        <ScrollScale>
          <ManifestoSection content={content.manifesto} />
        </ScrollScale>
        <ScrollScale>
          <ContactSection content={content.cta} />
        </ScrollScale>
      </main>
    </>
  );
}
