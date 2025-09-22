export const TAROT_CONFIG = {
  2: {
    Sun: process.env.TAROT2_SUN,
    Moon: process.env.TAROT2_MOON,
    Star: process.env.TAROT2_STAR,
    max_tokens: Number(process.env.TAROT2_MAX),
  },
  3: {
    Sun: process.env.TAROT3_SUN,
    Moon: process.env.TAROT3_MOON,
    Star: process.env.TAROT3_STAR,
    max_tokens: Number(process.env.TAROT3_MAX),
  },
  4: {
    Sun: process.env.TAROT4_SUN,
    Moon: process.env.TAROT4_MOON,
    Star: process.env.TAROT4_STAR,
    max_tokens: Number(process.env.TAROT4_MAX),
  },
};
