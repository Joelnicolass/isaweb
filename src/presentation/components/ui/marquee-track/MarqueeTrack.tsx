import { DataAttr } from "@/presentation/shared/data-attr";
import { cn } from "@/shared/cn";
import { s } from "./styles";
import type { MarqueeTrackProps } from "./types";

export function MarqueeTrack({ children, className }: MarqueeTrackProps) {
  return (
    <div className={cn(s.viewport, className)}>
      <div className={s.track} {...{ [DataAttr.MarqueeTrack]: "" }}>
        <div className={s.group}>{children}</div>
        <div className={s.group} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
