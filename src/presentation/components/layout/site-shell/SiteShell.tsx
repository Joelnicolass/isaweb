import { getTranslations } from "next-intl/server";
import { Footer } from "@/presentation/components/layout/footer";
import { Header } from "@/presentation/components/layout/header";
import { SectionId } from "@/shared/site";
import { s } from "./styles";
import type { SiteShellProps } from "./types";

export async function SiteShell({ children }: SiteShellProps) {
  const t = await getTranslations("a11y");
  return (
    <>
      <a href={`#${SectionId.Hero}`} className={s.skip}>
        {t("skip")}
      </a>
      <Header />
      <main id="content" className={s.main}>
        {children}
      </main>
      <Footer />
    </>
  );
}
