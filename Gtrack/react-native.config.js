module.exports = {
    project: {
        ios: {},
        android: {}
    },
    assets: ["./assets/fonts"],
    dependencies: {
        '@rnmapbox/maps': {
            platforms: {
                ios: null,
            },
        },
        // '@rnmapbox/maps': {
        //     platforms: {
        //         ios: null,
        //     },
        // },
        'react-native-maps': {
            platforms: {
                android: null,
            },
        },
    }
}