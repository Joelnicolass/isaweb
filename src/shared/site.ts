export enum SectionId {
  Hero = "hero",
  Vinyl = "vinyl",
  Listen = "listen",
}

export enum NavItem {
  Hero = "hero",
  Vinyl = "vinyl",
  Listen = "listen",
}

export const NAV_ITEMS: readonly NavItem[] = [
  NavItem.Hero,
  NavItem.Vinyl,
  NavItem.Listen,
];

export const SECTION_ID_BY_NAV: Record<NavItem, SectionId> = {
  [NavItem.Hero]: SectionId.Hero,
  [NavItem.Vinyl]: SectionId.Vinyl,
  [NavItem.Listen]: SectionId.Listen,
};
