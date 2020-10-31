module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current',
                },
                debug: false,
                ignoreBrowserslistConfig: true,
            },
        ],
        '@babel/preset-typescript',
    ],
    ignore: ['**/*.spec.ts'],
};
