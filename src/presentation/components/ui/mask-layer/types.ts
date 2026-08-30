import type { ComponentProps, ReactNode } from "react";
import type { MaskKind } from "./constants";

export type MaskLayerProps = {
  kind: MaskKind;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<"div">, "className" | "children">;
