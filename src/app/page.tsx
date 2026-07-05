import { getContent } from "@/lib/content";
import { HeroSection } from "@/features/hero/HeroSection";
import { MarqueeSection } from "@/features/marquee/MarqueeSection";
import { AboutSection } from "@/features/about/AboutSection";
import { WorksSection } from "@/features/works/WorksSection";
import { ServicesSection } from "@/features/services/ServicesSection";
import { ProcessSection } from "@/features/process/ProcessSection";
import { ManifestoSection } from "@/features/manifesto/ManifestoSection";
import { ContactSection } from "@/features/contact/ContactSection";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  const content = getContent("tr");

  return (
    <>
      <HeroSection content={content.hero} />
      <main>
        <MarqueeSection content={content.marquee} />
        <AboutSection content={content.about} />
        <WorksSection content={content.works} />
        <ServicesSection content={content.services} />
        <ProcessSection content={content.process} />
        <ManifestoSection content={content.manifesto} />
        <ContactSection content={content.cta} />
      </main>
      <SiteFooter content={content.footer} />
    </>
  );
}
