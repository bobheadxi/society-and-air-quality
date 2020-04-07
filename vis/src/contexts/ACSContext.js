import React from 'react';

import { YEARS } from '../vars';

import { fetchCSV, fetchJSON } from './lib';
import SingleLoader from './SingleLoader';

const Context = React.createContext({
  timeseriesFlat: null,
  timeseriesVert: null,
  regions: null,

  ...SingleLoader.defaultValue,
});

Context.displayName = 'context.acs';

Context.loadValue = async function() {
  const fetches = [
    '/_data/acs/timeseries_flat.csv',
    '/_data/acs/timeseries_vert.csv',
  ].map((f) => fetchCSV(f));

  const regionFetches = YEARS.map((f) => fetchJSON(`/_data/acs/regions/${f}_geojson.json`));
  const regionResults = await Promise.all(regionFetches);  

  const results = await Promise.all(fetches);
  return {
    timeseriesFlat: results[0],
    timeseriesVert: results[1],
    regions: regionResults,
  }
}

export default Context;
