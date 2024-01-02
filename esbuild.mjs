import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['src/pocketCube.js'],
  bundle: true,
  minify: true,
  /*
  target: [
    'es2020',
    'chrome58',
    'edge16',
    'firefox57',
    'node12',
    'safari11',
  ],
  */
  outdir: 'dist',
})
