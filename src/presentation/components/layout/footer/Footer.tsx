import { getTranslations } from "next-intl/server";
import { SITE } from "@/presentation/content/site";
import { s } from "./styles";

export async function Footer() {
  const t = await getTranslations("footer");
  return (
    <footer className={s.root}>
      <p className={s.name}>{SITE.artist.name}</p>
      <p className={s.year}>{t("year")}</p>
    </footer>
  );
}
