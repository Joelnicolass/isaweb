export enum SocialPlatform {
  Spotify = "spotify",
  Instagram = "instagram",
  TikTok = "tiktok",
}

export type Artist = {
  name: string;
};

export type Track = {
  title: string;
  year: number;
  coverSrc: string;
  coverAlt: string;
  spotifyUrl: string;
  spotifyEmbedUrl: string;
};

export type SocialLink = {
  platform: SocialPlatform;
  url: string;
  handle: string;
};

export const SITE = {
  artist: {
    name: "Isabella Amaro",
  },
  track: {
    title: "Ojos Achinados",
    year: 2026,
    coverSrc: "/images/ojos-achinados.jpg",
    coverAlt: "Isabella Amaro con guitarra acústica, portada de Ojos Achinados",
    spotifyUrl: "https://open.spotify.com/artist/6b6tdV6oiCReUv2iuXxGvK",
    spotifyEmbedUrl:
      "https://open.spotify.com/embed/artist/6b6tdV6oiCReUv2iuXxGvK?utm_source=generator&theme=0",
  },
  socials: [
    {
      platform: SocialPlatform.Spotify,
      url: "https://open.spotify.com/artist/6b6tdV6oiCReUv2iuXxGvK",
      handle: "Isabella Amaro",
    },
    {
      platform: SocialPlatform.Instagram,
      url: "https://www.instagram.com/amaroisabella__/",
      handle: "@amaroisabella__",
    },
    {
      platform: SocialPlatform.TikTok,
      url: "https://www.tiktok.com/@isabella_am4ro",
      handle: "@isabella_am4ro",
    },
  ],
} as const satisfies {
  artist: Artist;
  track: Track;
  socials: readonly SocialLink[];
};
