import { defineConfig } from 'tsup';
// import postcss from 'postcss';
import { compile } from 'sass';

export default defineConfig({
  entry: ['src/index.ts'], // Your component's entry point
  format: ['esm', 'cjs'], // The formats you want to output
  dts: true, // Generate TypeScript declaration files
  splitting: false,
  sourcemap: true,
  clean: true,

  esbuildPlugins: [
    {
      name: 'sass-loader',
      setup: (build) => {
        build.onLoad({ filter: /\.scss$/ }, (args) => {
          const result = compile(args.path);
          return {
            contents: result.css,
            loader: 'css',
          };
        });
      },
    },
  ],
});
