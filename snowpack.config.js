module.exports = {
    plugins: [['@snowpack/plugin-typescript']],
    root: 'src',
    optimize: {
        minify: true,
    },
    buildOptions: {
        out: 'dist',
    },
    mount: {
        dist: '/',
        src: '/',
    },
}
