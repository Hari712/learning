module.exports = {
    project: {
        ios: {},
        android: {}
    },
    assets: ["./assets/fonts"],
    dependencies: {
        '@react-native-mapbox-gl/maps': {
            platforms: {
                ios: null,
            },
        },
        'react-native-maps': {
            platforms: {
                android: null,
            },
        },
    }
}