import { dtsPlugin } from 'esbuild-plugin-d.ts'
import esbuild from 'esbuild'

await esbuild.build({
    entryPoints: ['./src/index.ts'],
    outdir: './dist',
    plugins: [
        dtsPlugin({
            // Optional options here
        }),
    ],
    bundle: true,
})
