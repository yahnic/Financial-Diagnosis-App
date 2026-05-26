import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        name: "HappyInvest Financial Diagnosis",

        short_name: "HappyInvest",

        theme_color: "#081018",

        background_color: "#081018",

        display: "standalone",

        icons: [
          {
            src: "/icon-192.png",

            sizes: "192x192",

            type: "image/png",
          },

          {
            src: "/icon-512.png",

            sizes: "512x512",

            type: "image/png",
          },
        ],
      },
    }),
  ],
});
