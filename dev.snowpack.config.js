module.exports = {
    plugins: [['@snowpack/plugin-typescript']],
    root: 'src',
    optimize: {
        sourceMap: true,
    },
    buildOptions: {
        out: 'dist',
    },
    mount: {
        dist: '/',
        ['example']: '/',
        ['src/lib']: '/lib',
    },
    alias: {
        '@components': './src/lib/components',
        '@utils': './src/lib/utils',
        '@libTypes': './src/lib/types',
    },
}
