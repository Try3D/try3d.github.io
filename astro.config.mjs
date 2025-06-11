import { defineConfig } from "astro/config";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  site: "https://try3d.github.io",
  integrations: [tailwind()],
  vite: {
    ssr: {
      external: ["svgo"],
    },
  },
});
