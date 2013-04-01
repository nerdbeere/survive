var barriers = [
    {
        worldPos: {
            x: 500,
            y: 500,
            azimuth: 120
        },
        type: 'crate',
        width: 64,
        height: 64
    },
    {
        worldPos: {
            x: 200,
            y: 500,
            azimuth: 100
        },
        type: 'crate',
        width: 64,
        height: 64
    },
    {
        worldPos: {
            x: 500,
            y: 300,
            azimuth: 170
        },
        type: 'crate',
        width: 64,
        height: 64
    },
    {
        worldPos: {
            x: 523,
            y: 100,
            azimuth: 30
        },
        type: 'box3',
        width: 134,
        height: 78
    },
    {
        worldPos: {
            x: 200,
            y: 200,
            azimuth: 90
        },
        type: 'crate',
        width: 64,
        height: 64
    },
];

exports.get = function(pos) {
    return {
        worldPos: {
            x: pos.x + 100,
            y: pos.y + 100
        },
        type: 'crate',
        width: 64,
        height: 64
    };
};