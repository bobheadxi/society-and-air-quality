import React from 'react';

import { YEARS } from '../vars';

import { fetchCSV, fetchJSON } from './lib';
import SingleLoader from './SingleLoader';

const Context = React.createContext({
  timeseriesFlat: null,
  timeseriesVert: null,
  stations: null,

  ...SingleLoader.defaultValue,
});

Context.displayName = 'context.epa';

Context.loadValue = async function() {
  const fetches = [
    '/_data/epa/timeseries_flat.csv',
    '/_data/epa/timeseries_vert.csv',
  ].map((f) => fetchCSV(f));
  const results = await Promise.all(fetches);

  const stationFetches = YEARS.map((f) => fetchJSON(`/_data/epa/stations/${f}_geojson.json`));
  const stationResults = await Promise.all(stationFetches);  

  return {
    timeseriesFlat: results[0],
    timeseriesVert: results[1],
    stations: stationResults,
  }
}

export default Context;
