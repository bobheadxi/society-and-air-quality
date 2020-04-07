export const DEVELOPMENT = (process.env.NODE_ENV !== 'production');
export const YEARS = ['2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'];
export const MAPBOX_API_TOKEN = process.env.REACT_APP_MAPBOX_API_TOKEN;
export const VIEW_STATES = {
    INITAL: {
        longitude: -128.41669,
        latitude: 37.7853,
        zoom: 5,
        pitch: 0,
        bearing: 0,
    },
    US_LEFT: {
        longitude: -83.5795,
        latitude: 41.8283,
        zoom: 3,
        pitch: 45,
        bearing: 15
    },
}

export function geoidToColor(geoid) {
    const str = `${geoid}`; // 5-char string
    return [
        parseInt(`${str.substring(0, 1)}${str.substring(4, 5)}`),
        parseInt(str.substring(2, 4)),
        parseInt(`${str.substring(1, 2)}${str.substring(4, 5)}`),
        255,
    ];
}
