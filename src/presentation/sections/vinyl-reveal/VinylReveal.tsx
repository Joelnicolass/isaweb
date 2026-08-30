"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button, ButtonVariant } from "@/presentation/components/ui/button";
import { DisplayTitle } from "@/presentation/components/ui/display-title";
import { Icon, IconName } from "@/presentation/components/ui/icon";
import { MaskKind, MaskLayer } from "@/presentation/components/ui/mask-layer";
import { NextSectionButton } from "@/presentation/components/ui/next-section";
import { SectionLabel } from "@/presentation/components/ui/section-label";
import { DataAttr } from "@/presentation/shared/data-attr";
import { SectionId } from "@/shared/site";
import { COVER_SIZES, DISC_SRC, EMBED_HEIGHT, EMBED_TITLE } from "./constants";
import { s } from "./styles";
import { useVinylRevealViewModel } from "./use-vinyl-reveal-view-model";

export function VinylReveal() {
  const { scope, track, goNext } = useVinylRevealViewModel();
  const t = useTranslations("vinyl");
  const a11y = useTranslations("a11y");

  return (
    <div ref={scope} className={s.scope}>
      <section
        id={SectionId.Vinyl}
        className={s.root}
        {...{ [DataAttr.VinylPin]: "" }}
      >
        <p className={s.ghost} aria-hidden {...{ [DataAttr.VinylGhost]: "" }}>
          {track.title}
        </p>
        <div className={s.head}>
          <SectionLabel label={t("label")} index={t("index")} />
          <p className={s.year}>{track.year}</p>
        </div>
        <div className={s.body}>
          <div className={s.stage}>
            <div className={s.discWrap} {...{ [DataAttr.VinylDisc]: "" }}>
              <Image src={DISC_SRC} alt="" fill className={s.disc} unoptimized />
            </div>
            <MaskLayer kind={MaskKind.Vinyl} className={s.mask} {...{ [DataAttr.VinylMask]: "" }}>
              <Image
                src={track.coverSrc}
                alt={track.coverAlt}
                fill
                sizes={COVER_SIZES}
                className={s.cover}
              />
            </MaskLayer>
          </div>
          <div className={s.copy}>
            <DisplayTitle as="h2" className={s.title} {...{ [DataAttr.VinylTitle]: "" }}>
              {track.title}
            </DisplayTitle>
            <div className={s.rule} {...{ [DataAttr.VinylRule]: "" }} />
            <div className={s.actions} {...{ [DataAttr.VinylCopy]: "" }}>
              <Button
                variant={ButtonVariant.Solid}
                href={track.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={s.cta}
              >
                {t("cta")}
                <Icon name={IconName.Arrow} {...{ [DataAttr.CtaArrow]: "" }} />
              </Button>
              <div className={s.player}>
                <p className={s.playerLabel}>{t("preview")}</p>
                <iframe
                  title={EMBED_TITLE}
                  src={track.spotifyEmbedUrl}
                  height={EMBED_HEIGHT}
                  className={s.embed}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
        <NextSectionButton label={a11y("nextSection")} onClick={goNext} />
      </section>
    </div>
  );
}
