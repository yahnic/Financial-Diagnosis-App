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
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#2C2C78",
        icons: [
          {
            src: "/icon.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
