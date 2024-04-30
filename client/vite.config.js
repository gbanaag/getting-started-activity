// import {defineConfig} from 'vite';
// import reactRefresh from '@vitejs/plugin-react-refresh';

import {defineConfig} from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: '../',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
    hmr: {
      clientPort: 443,
    },
  },
});

// // https://vitejs.dev/config/
// export default defineConfig({
//   envDir: '../',
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:3001',
//         changeOrigin: true,
//         secure: false,
//         ws: true,
//       },
//     },
//     hmr: {
//       clientPort: 443,
//     }, 
//     esbuild: {
//       jsxFactory: 'React.createElement',
//       jsxInject: `import React from 'react';`
//     },
//     plugins: [reactRefresh()]
//   },
// });

