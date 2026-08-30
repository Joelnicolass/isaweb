"use client";

import { useTranslations } from "next-intl";
import { Icon } from "@/presentation/components/ui/icon";
import { SectionLabel } from "@/presentation/components/ui/section-label";
import { SocialLink } from "@/presentation/components/ui/social-link";
import { DataAttr } from "@/presentation/shared/data-attr";
import { SectionId } from "@/shared/site";
import { SOCIAL_ICON, SOCIAL_LABEL_KEY } from "./constants";
import { s } from "./styles";
import { useListenViewModel } from "./use-listen-view-model";

export function Listen() {
  const { scope, socials } = useListenViewModel();
  const t = useTranslations("listen");
  const socialT = useTranslations("social");

  return (
    <section ref={scope} id={SectionId.Listen} className={s.root}>
      <SectionLabel label={t("label")} index={t("index")} />
      <p className={s.intro}>{t("intro")}</p>
      <div className={s.list}>
        {socials.map((social) => (
          <div key={social.platform} {...{ [DataAttr.ListenItem]: "" }}>
            <SocialLink
              href={social.url}
              label={socialT(SOCIAL_LABEL_KEY[social.platform])}
              handle={social.handle}
              arrow={t("arrow")}
              icon={<Icon name={SOCIAL_ICON[social.platform]} />}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
