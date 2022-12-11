import svelte from 'rollup-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess';
 import typescript from '@rollup/plugin-typescript';

const production = !process.env.ROLLUP_WATCH

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/bundle.js',
  },
  plugins: [
    // teach rollup how to handle typescript imports
    typescript({ sourceMap: !production }),
    svelte({
      preprocess: sveltePreprocess({
         sourceMap: !production,
         scss: {
                      // We can use a path relative to the root because
                      // svelte-preprocess automatically adds it to `includePaths`
                      // if none is defined.
                      prependData: `@import 'src/styles/app.scss';`
                    },
         postcss: {
           plugins: [require('autoprefixer')()]
         }
      }),
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file — better for performance
      css: css => {
        css.write('public/bundle.css')
      },
    }),
  ],
}