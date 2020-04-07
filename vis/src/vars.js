export const DEVELOPMENT = (process.env.NODE_ENV !== 'production');
export const YEARS = ['2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'];
export const MAPBOX_API_TOKEN = process.env.REACT_APP_MAPBOX_API_TOKEN;

export function stationGeoToColor(d) {
    const { properties: { acs_geoid: gid } } = d;
    const geoid = `${gid}`;
    return [
        parseInt(geoid.substring(0, 1) + geoid.substring(4, 5)),
        parseInt(geoid.substring(2, 4)),
        parseInt(geoid.substring(4, 5) + geoid.substring(0, 1)),
        255,
    ];
}
