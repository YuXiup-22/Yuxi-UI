// packages/ui-library/vite.config.ts
import { defineConfig, normalizePath } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import { globSync } from 'glob';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pkgs = fs
  .readdirSync(resolve(__dirname, '../'))
  .filter(
    (pkg) =>
      pkg !== 'ui-library' &&
      fs.statSync(resolve(__dirname, `../${pkg}`)).isDirectory(),
  );

const entries = pkgs.reduce((prevObj, pkgName) => {
  const pattern = '**/*.{ts,tsx}';
  const componentSrcDir = resolve(__dirname, `../${pkgName}/src`);
  const componentFiles = globSync(pattern, {
    cwd: componentSrcDir,
  });
  componentFiles.forEach((file) => {
    const normalizedFile = file.replace(/\\/g, '/');

    // b. 构造入口键 (key): 'button/index' 或 'button/style/index'
    // 移除文件名中的 '.ts' 或 '.tsx' 后缀
    const entryKey = `${pkgName}/${normalizedFile.replace(/\.tsx?$/, '')}`;

    // c. 构造入口值 (value): 绝对路径
    const entryValue = resolve(componentSrcDir, file);

    prevObj[entryKey] = entryValue;
  });
  return prevObj;
}, {});
/** css代码分割具体到组件层级 */
const cssCodeLocationPlugin = () => {
  return {
    name: 'css-code-location',
    generateBundle: (options, bundle) => {
      for (const [, chunkInfo] of Object.entries(bundle)) {
        if (chunkInfo.type === 'asset' && chunkInfo.fileName.endsWith('.css')) {
          const match =
            chunkInfo.originalFileNames?.[0].match(/\/([^/]+)\/src\//);
          chunkInfo.fileName = `${match[1]}/${chunkInfo.fileName}`;
        }
      }
    },
  };
};
export default defineConfig({
  plugins: [
    // react({
    //   // jsxRuntime: 'classic', // 放弃原始的jsx转换,因为React不会自动导入，避免缺失变量
    // }),
    cssCodeLocationPlugin(),
    dts({
      outDir: ['./es', './lib'],
      include: [normalizePath(resolve(__dirname, '../**/src'))],
      entryRoot: normalizePath(resolve(__dirname, `../`)),
      exclude: [normalizePath(resolve(__dirname, '../**/node_modules/**'))],
      beforeWriteFile: (filePath, content) => {
        let newFilePath;
        let newContent = content;
        if (filePath.includes('ui-library/src')) {
          newFilePath = filePath.replace('/ui-library/src', '');
          newContent = content.replace(
            /(['"])(?:.*\/)([\w-]+)\/src\1/g,
            '$1./$2$1',
          );
        } else {
          newFilePath = filePath.replace('/src/', '/');
        }
        return {
          filePath: newFilePath,
          content: newContent,
        };
      },
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'), // 主入口
        ...entries,
      },
    },
    cssCodeSplit: true,
    minify: false,
    emptyOutDir: true,
    rollupOptions: {
      preserveEntrySignatures: 'strict',
      external: ['react', 'react-dom', 'antd-style', 'classnames'],
      output: [
        {
          format: 'es',
          dir: 'es',
          chunkFileNames: `_shard/[name]-[hash].js`,
          // assetFileNames: ({ names, ...rest }) => {
          //   console.log(names, rest, 'assetFileNames----------------');
          //   return `assets/[name]-[hash][extname]`;
          // },
          // cssCodeSplit: true,
          // manualChunks: (id, { getModuleInfo, getModuleIds }) => {
          //   // 如果模块路径中包含 'util'，就将其抽离到 'util' chunk 中
          //   if (id.includes('util/src') && !id.includes('node_modules')) {
          //     const predir = normalizePath(resolve(__dirname, '../util/src'));
          //     const utilKey = normalizePath(id)
          //       .replace(predir, 'util/')
          //       .replace(/\.tsx?$/, ''); //替换ts,tsx

          //     return utilKey;
          //   }
          // },
        },
        {
          format: 'cjs',
          dir: 'lib',
          chunkFileNames: `_shard/[name]-[hash].js`,
        },
      ],
    },
  },
  resolve: {
    alias: [
      // vite打包工具内部映射包内引用其他包组件的绝对路径
      {
        find: /^@yuxi-ui\/(.*)$/,
        replacement: normalizePath(resolve(__dirname, '../$1/src')),
      },
    ],
  },
  // 可以根据需要添加 resolve.alias，但 pnpm workspace 通常能处理好
});
