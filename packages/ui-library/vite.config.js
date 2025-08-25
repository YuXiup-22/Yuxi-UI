// packages/ui-library/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      entryRoot: 'src',
      rollupTypes: true,
      aliasesExclude: ['@yuxi-ui/button'],
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'), // 主入口
        button: resolve(__dirname, 'src/button.ts'), // 单独 Button 入口
      },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName}.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@yuxi-ui/button'], // 💥 关键：将独立组件包也外部化
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@yuxi-ui/button': 'MyOrgButton', // 给外部化的包提供全局名称（UMD 格式可能需要）
        },

        // chunkFileNames: `[name].mjs`,
        // assetFileNames: `[name].[ext]`,
      },
    },
  },
  // 可以根据需要添加 resolve.alias，但 pnpm workspace 通常能处理好
});
