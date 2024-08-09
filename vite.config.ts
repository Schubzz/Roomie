import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'prompt',
            injectRegister: "auto",
            workbox: {
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/firestore\.googleapis\.com\/google\.firestore\.v1\.Firestore\.*/,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'firebase-cache',
                            expiration: {
                                maxEntries: 50,
                                maxAgeSeconds: 30 * 24 * 60 * 60,
                            },
                            cacheableResponse: {
                                statuses: [0, 200],
                            },
                        },
                    },
                ],
            },
        }),
    ],
});
