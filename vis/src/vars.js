export const DEVELOPMENT = (process.env.NODE_ENV !== 'production');
export const MAPBOX_API_TOKEN = process.env.REACT_APP_MAPBOX_API_TOKEN;
export const YEARS = ['2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'];
export function getYearsMarks() {
    const marks = {};
    YEARS.forEach((y, i) => {
        marks[i] = y;
    });
    return marks;
}

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
    US_RIGHT: {
        longitude: -110.5795,
        latitude: 41.8283,
        zoom: 3,
        pitch: 45,
        bearing: -15
    },
};
export const REGIONS = {
    SF: { geoid: '41860', name: 'San Francisco, CA (metropolitan area)' },
    NY: { geoid: '35620', name: 'New York, NY (metropolitan area)' },
    AU: { geoid: '12420', name: 'Austin, TX (metropolitan area)'},
};
export const ACS_FEATURES = {
    POP: 'total_pop',
    GINI: 'gini',
    POV: 'poverty',
    TRANSIT: 'commuters_by_public_transportation',
};
export const EPA_FEATURES = {
    PM: { code: '88502', name: 'Acceptable PM2.5 AQI & Speciation Mass' },
    TEMP: { code: '68105', name: 'Average Ambient Temperature' },
};

export function geoidToColor(geoid) {
    const str = `${geoid}`; // 5-char string
    return [
        parseInt(`${str.substring(0, 1)}${str.substring(4, 5)}`),
        parseInt(str.substring(2, 4)),
        parseInt(`${str.substring(1, 2)}${str.substring(4, 5)}`),
        255,
    ];
}
