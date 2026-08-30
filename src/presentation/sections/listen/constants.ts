import { SocialPlatform } from "@/presentation/content/site";
import { IconName } from "@/presentation/components/ui/icon";

export const SOCIAL_ICON: Record<SocialPlatform, IconName> = {
  [SocialPlatform.Spotify]: IconName.Spotify,
  [SocialPlatform.Instagram]: IconName.Instagram,
  [SocialPlatform.TikTok]: IconName.TikTok,
};

export const SOCIAL_LABEL_KEY: Record<SocialPlatform, string> = {
  [SocialPlatform.Spotify]: "spotify",
  [SocialPlatform.Instagram]: "instagram",
  [SocialPlatform.TikTok]: "tiktok",
};
