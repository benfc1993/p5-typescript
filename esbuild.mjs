import esbuild from 'esbuild'

await esbuild.build({
    entryPoints: ['./src/index.ts'],
    outdir: './dist',
    bundle: true,
    minify: true,
    format: 'esm',
    external: ['p5-typescript'],
})
