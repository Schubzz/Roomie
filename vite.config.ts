import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';
import {VitePWA} from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        react(),
        legacy(),
        VitePWA({
            registerType: "autoUpdate",
            workbox: {
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/firestore\.googleapis\.com\/*/,
                        handler: "NetworkFirst",
                        options: {
                            cacheName: 'firebase-cache',
                            expiration: {
                                maxEntries: 50,
                                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Tage
                            },
                            cacheableResponse: {
                                statuses: [0, 200],
                            },
                        }
                    },
                    {
                        urlPattern: ({request}) =>
                            request.destination === 'document' ||
                            request.destination === 'script' ||
                            request.destination === 'style',
                        handler: 'NetworkFirst',
                        options: {
                            cacheName: 'assets-cache',
                            expiration: {
                                maxEntries: 50,
                                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Tage
                            },
                            cacheableResponse: {
                                statuses: [0, 200],
                            },
                        },
                    }
                ]
            }
        }),
    ],
});
