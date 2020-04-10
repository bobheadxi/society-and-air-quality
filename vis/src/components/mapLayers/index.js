import { GeoJsonLayer } from '@deck.gl/layers';
import { geoidToColor } from '../../vars';

export function layerEPAStations(stations, {
  yearID = -1,
  highlightGeoID = '',
} = {}) {
  const row = yearID < 0 ? stations.length - 1 : yearID;
  return new GeoJsonLayer({
    id: `epa-stations-${highlightGeoID || 'default'}`,
    data: stations[row],
    pointRadiusMinPixels: 5,
    getFillColor: (d) => {
      const { properties: { acs_geoid: geoid } } = d;
      if (`${geoid}` === highlightGeoID) return [255,255,0];
      return geoidToColor(geoid);
    },
  });
}

export function layerACSRegions(regions, {
  yearID = -1,
  highlightGeoID = '',
  elevate = (yearID) => (d) => 0,
}) {
  const row = yearID < 0 ? regions.length - 1 : yearID;
  return new GeoJsonLayer({
    id: `acs-regions-${highlightGeoID || 'default'}-${elevate.id || 'flat'}`,
    data: regions[row],
    getFillColor: (d) => {
      const { properties: { geoid } } = d;
      if (`${geoid}` === highlightGeoID) return [255,255,0];
      return geoidToColor(geoid);
    },
    getLineColor: [255, 255, 255],
    getElevation: elevate(row),
    opacity: 0.8,
    stroked: false,
    filled: true,
    extruded: true,
    wireframe: true,
  })
}

export function elevateByPopulation(timeseriesFlat) {
  return elevateByFeature(timeseriesFlat, 'acs.total_pop');
}

export function elevateByFeature(timeseriesFlat, feature, {
  scaleFunc = (v) => Math.sqrt(v) * 150,
} = {}) {
  const elevateFunc = (yearID) => (d) => {
    const { properties: { geoid, acs_geoid } = {} } = d;
    const id = geoid || acs_geoid;
    return scaleFunc(timeseriesFlat[yearID][`${id}.${feature}`] || 0);
  }
  elevateFunc.id = feature;
  console.log(elevateFunc.id);
  return elevateFunc;
}
