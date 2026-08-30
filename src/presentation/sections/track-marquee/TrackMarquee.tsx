"use client";

import { useTranslations } from "next-intl";
import { MarqueeTrack } from "@/presentation/components/ui/marquee-track";
import { s } from "./styles";
import { useTrackMarqueeViewModel } from "./use-track-marquee-view-model";

export function TrackMarquee() {
  const { scope, items } = useTrackMarqueeViewModel();
  const t = useTranslations("marquee");

  return (
    <section ref={scope} className={s.root} aria-hidden>
      <MarqueeTrack>
        {items.map((title, index) => (
          <span key={`${title}-${index}`} className={s.item}>
            {title}
            <span className={s.sep}>{t("separator")}</span>
          </span>
        ))}
      </MarqueeTrack>
    </section>
  );
}
