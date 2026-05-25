import { defineConfig } from 'wxt';

export default defineConfig({
  manifest: {
    host_permissions: [
      'https://claude.ai/*',
      'http://localhost:3334/*',
    ],
  },
});
