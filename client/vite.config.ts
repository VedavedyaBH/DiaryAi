import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    define: {
        __APP_ENV__: process.env.VITE_VERCEL_ENV,
    },
    plugins: [react()],
});
