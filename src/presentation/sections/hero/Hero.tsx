"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button, ButtonVariant } from "@/presentation/components/ui/button";
import { DisplayTitle } from "@/presentation/components/ui/display-title";
import { Icon, IconName } from "@/presentation/components/ui/icon";
import { NextSectionButton } from "@/presentation/components/ui/next-section";
import { SITE } from "@/presentation/content/site";
import { DataAttr } from "@/presentation/shared/data-attr";
import { cn } from "@/shared/cn";
import { SectionId } from "@/shared/site";
import { HERO_IMAGE_SIZES } from "./constants";
import { s } from "./styles";
import { useHeroViewModel } from "./use-hero-view-model";

export function Hero() {
  const { scope, frames, whiteKeys, blackKeys, goNext } = useHeroViewModel();
  const t = useTranslations("hero");
  const a11y = useTranslations("a11y");

  return (
    <section ref={scope} id={SectionId.Hero} className={s.root}>
      <div className={s.stage}>
        <div className={s.cluster}>
          <div className={s.copy}>
            <div className={s.meta}>
              <p className={s.kicker}>{t("kicker")}</p>
              <Button
                variant={ButtonVariant.Arrow}
                href={SITE.track.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={s.cta}
              >
                {t("cta")}
                <Icon name={IconName.Arrow} {...{ [DataAttr.CtaArrow]: "" }} />
              </Button>
            </div>
            <DisplayTitle className={s.title} {...{ [DataAttr.HeroTitle]: "" }}>
              {SITE.artist.name}
            </DisplayTitle>
            <p className={s.subtitle}>{t("subtitle")}</p>
          </div>
          <div className={s.photo} {...{ [DataAttr.HeroPhoto]: "" }}>
            <div className={s.polaroidWrap}>
              <div className={s.photoSlab} aria-hidden />
              <div className={s.polaroid} {...{ [DataAttr.HeroPiano]: "" }}>
                <div className={s.frame}>
                  {frames.map((src, index) => (
                    <div
                      key={src}
                      className={s.layer}
                      aria-hidden={index !== 0}
                      {...{ [DataAttr.HeroFrame]: "" }}
                    >
                      <Image
                        src={src}
                        alt={index === 0 ? t("photoAlt") : ""}
                        fill
                        priority
                        sizes={HERO_IMAGE_SIZES}
                        className={s.image}
                      />
                    </div>
                  ))}
                  <div className={s.shutters} aria-hidden {...{ [DataAttr.HeroShutters]: "" }}>
                    {whiteKeys.map((id) => (
                      <span key={id} className={s.shutter} {...{ [DataAttr.HeroShutter]: "" }} />
                    ))}
                  </div>
                </div>
                <div className={s.piano} aria-hidden>
                  <div className={s.whites}>
                    {whiteKeys.map((id) => (
                      <span key={id} className={s.whiteKey} {...{ [DataAttr.HeroKey]: "" }} />
                    ))}
                  </div>
                  <div className={s.blacks}>
                    {blackKeys.map((key) => (
                      <span
                        key={key.id}
                        className={cn(s.blackKey, key.col)}
                        {...{ [DataAttr.HeroBlackKey]: "" }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NextSectionButton label={a11y("nextSection")} onClick={goNext} />
    </section>
  );
}
