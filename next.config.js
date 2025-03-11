/** @type {import('next').NextConfig} */
require('dotenv').config();
const isDev = process.env.NODE_ENV === 'development';
const path = require('path');
const { env } = require('process');
const lhost =
  'https://next.ftso.local https://directus.ftso.local https://webdata.ftso.eu http://localhost:3000'; // backend
// Definizione dell'header Content-Security-Policy
//script-src 'self' 'unsafe-eval' 'unsafe-inline' ${lhost};
/*const cspHeader = `
  default-src 'self' ${lhost};
  style-src 'self' 'unsafe-inline' ${lhost};
  img-src 'self' blob: data: ${lhost};
  font-src 'self' ${lhost};
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-src 'self' ${lhost};
  child-src 'self' ${lhost} blob:;
  frame-ancestors 'self' localhost:* ${lhost};
  upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, ' ')
  .trim();*/

const cspHeader = `
  default-src 'self' https://next.ftso.local https://directus.ftso.local https://webdata.ftso.eu http://localhost:3000;
  img-src 'self' https://webdata.ftso.eu data: blob: *;  
  frame-src 'self' https://next.ftso.local https://directus.ftso.local https://next.ftso.local https://webdata.ftso.eu http://localhost:3000; 
  child-src 'self' blob:; 
  frame-ancestors 'self' https://next.ftso.local https://directus.ftso.local https://webdata.ftso.eu http://localhost:3000;
  script-src 'self' https://next.ftso.local https://directus.ftso.local https://webdata.ftso.eu http://localhost:3000;
  style-src 'self' https://next.ftso.local http://localhost:3000;
`
  .replace(/\s{2,}/g, ' ')
  .trim();

let data = {
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  /*exportPathMap: async function exportPathMap() {
    return {
      '/draft': { page: '/draft' }, // Esporta solo /draft
      // Non includere /draft/[id]
    };
  },*/
};

let redirectForProd = {
  source: '/draft/:path*',
  destination: '/',
  permanent: false,
};

let redirects = async function redirects() {
  if (isDev) {
    return [];
  }
  return [redirectForProd];
};

console.log('isDev?', isDev);

// Configurazione per ambiente di sviluppo
if (isDev) {
  data = {};
  redirectForProd = null;
}

console.log('isDev?', data);

const nextConfig = {
  ...data,
  reactStrictMode: true,
  experimental: {
    optimizeCss: false, // Evita stili inline
    disableOptimizedLoading: true,
  },
  devIndicators: {
    autoPrerender: false,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'webdata.ftso.eu',
        pathname: '/assets/**',
      },
    ],
  },
  crossOrigin: 'anonymous',
  compress: false,
  env: {
    NO_CNAME: 'true',
    NEXT_PUBLIC_DIRECTUS_URL: env.NEXT_PUBLIC_DIRECTUS_URL,
    DIRECTUS_URL: env.DIRECTUS_URL,
  },
  redirects,
  async headers() {
    return [
      {
        source: '/(.*)', // Applica gli header a tutte le rotte
        headers: [
          { key: 'X-Forwarded-Proto', value: 'https' },
          {
            key: 'Access-Control-Allow-Origin',
            value: lhost, // Consenti richieste da Directus
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type',
          },
          {
            key: 'X-Frame-Options',
            value: `ALLOW-FROM ${lhost}`, // Consenti iframe solo da Directus
          },
          {
            key: 'Content-Security-Policy',
            value: cspHeader, // Permetti iframe da Directus
          },
        ],
      },
      // Header applicati alle API
      /*{
        source: '/api/:path*', // Route per le API
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*', // Cambia a seconda delle esigenze
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },*/
      // Header per l'anteprima specifica
      /*{
        source: '/draft/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'http://localhost:8055', // Indirizzo di Directus
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
          {
            key: 'Content-Security-Policy',
            value: cspHeader,
          },
        ],
      },*/
      /*{
        source: '/:path*', // Applica la configurazione a tutte le rotte
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self' ${lhost};
              script-src 'self' ${lhost};
              style-src 'self' 'unsafe-inline' ${lhost};
              img-src 'self' ${lhost} data:;
              frame-src 'self' ${lhost};
              child-src 'self' ${lhost};
            `.replace(/\n/g, ''), // Rimuove i ritorni a capo
          },
        ],
      },*/
    ];
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.optimization.minimize = false; // Evita eval() in Fast Refresh
      config.devtool = false; // Disabilita source maps (che usano eval())
    }
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
  serverRuntimeConfig: {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000,
  },
};

module.exports = nextConfig;
