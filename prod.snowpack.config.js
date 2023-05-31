module.exports = {
    plugins: [['@snowpack/plugin-typescript']],
    root: 'src',
    optimize: {
        manifest: true,
        minify: true,
        sourceMap: true,
        splitting: true,
        treeshake: true,
    },
    buildOptions: {
        out: 'dist',
    },
    mount: {
        dist: '/',
        src: '/',
    },
    alias: {
        '@components': './src/lib/components',
        '@utils': './src/lib/utils',
        '@libTypes': './src/lib/types',
    },
}
