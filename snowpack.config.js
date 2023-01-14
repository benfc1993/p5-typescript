module.exports = {
    plugins: [['@snowpack/plugin-typescript']],
    root: 'src',
    optimize: {
        manifest: true,
        minify: true,
        sourceMap: true,
        // bundle: true,
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
}
