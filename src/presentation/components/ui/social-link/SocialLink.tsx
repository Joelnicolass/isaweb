import { cn } from "@/shared/cn";
import { s } from "./styles";
import type { SocialLinkProps } from "./types";

export function SocialLink({
  href,
  label,
  handle,
  arrow,
  icon,
  className,
}: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(s.root, className)}
    >
      <span className={s.left}>
        {icon}
        <span className={s.text}>
          <span className={s.label}>{label}</span>
          <span className={s.handle}>{handle}</span>
        </span>
      </span>
      <span className={s.arrow}>{arrow}</span>
    </a>
  );
}
