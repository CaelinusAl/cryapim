import type { OriginStoryContent } from "@/content/types";
import { SECTION_IDS } from "@/content/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Reveal } from "@/components/ui/Reveal";

/**
 * OriginStory — 6. ekran (EN SON): ATÖLYE & BOĞAZ.
 * Çırağan/Boğaz kimlik değil, ilham alınan yaratım alanı. Marka-güvenli:
 * ölçülü anlatım + resmî ortaklık olmadığına dair not.
 */
export function OriginStory({ content }: { content: OriginStoryContent }) {
  return (
    <section
      id={SECTION_IDS.originStory}
      className="relative px-6 md:px-10 py-20 md:py-28 max-w-6xl mx-auto scroll-mt-24"
    >
      <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
        <Reveal>
          <MediaFrame
            media={content.media}
            accent="#1f4a73"
            ratio="4 / 3"
            label="ilham manzarası · görsel yakında"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </Reveal>

        <Reveal delay={80}>
          <div>
            <SectionHeading kicker={content.kicker} title={content.title} />
            <div className="mt-6 space-y-4">
              {content.body.map((p, i) => (
                <p key={i} className="body-readable text-mist-300 max-w-xl">
                  {p}
                </p>
              ))}
            </div>
            {content.note && (
              <p className="mono-tag text-mist-500 mt-8 max-w-xl leading-relaxed">
                {content.note}
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
