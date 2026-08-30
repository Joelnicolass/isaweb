"use client";

import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/presentation/components/ui/dialog";
import { Button, ButtonVariant } from "@/presentation/components/ui/button";
import { Icon, IconName } from "@/presentation/components/ui/icon";
import { DataAttr } from "@/presentation/shared/data-attr";
import { SECTION_ID_BY_NAV, SectionId } from "@/shared/site";
import { NAV_LABEL_KEY } from "./constants";
import { s } from "./styles";
import { useHeaderViewModel } from "./use-header-view-model";

export function Header() {
  const { open, setOpen, toggle, overlay, goTo, navItems, socials } =
    useHeaderViewModel();
  const t = useTranslations("nav");
  const a11y = useTranslations("a11y");

  return (
    <Dialog modal={false} open={open} onOpenChange={setOpen}>
      <div className={s.bar}>
        <button
          type="button"
          className={s.brand}
          onClick={() => goTo(SectionId.Hero)}
        >
          {t("brand")}
        </button>
        <Button
          variant={ButtonVariant.Ghost}
          aria-label={open ? a11y("closeMenu") : a11y("openMenu")}
          aria-expanded={open}
          onClick={toggle}
          className={s.toggle}
        >
          <Icon name={open ? IconName.Close : IconName.Menu} />
        </Button>
      </div>
      <DialogContent ref={overlay} className={s.overlay} aria-describedby={undefined}>
        <DialogTitle className={s.srOnly}>{t("menu")}</DialogTitle>
        <nav className={s.nav}>
          {navItems.map((item) => (
            <button
              key={item}
              type="button"
              className={s.link}
              {...{ [DataAttr.OverlayLink]: "" }}
              onClick={() => goTo(SECTION_ID_BY_NAV[item])}
            >
              {t(NAV_LABEL_KEY[item])}
            </button>
          ))}
        </nav>
        <div className={s.socials}>
          {socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={s.social}
              {...{ [DataAttr.OverlayLink]: "" }}
            >
              {social.handle}
            </a>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
