import React from 'react';

import { fetchCSV } from './lib';
import SingleLoader from './SingleLoader';

const Context = React.createContext({
  timeseriesFlat: null,
  timeseriesVert: null,

  ...SingleLoader.defaultValue,
});

Context.displayName = 'context.acs';

Context.loadValue = async function() {
  const fetches = [
    '/_data/acs/timeseries_flat.csv',
    '/_data/acs/timeseries_vert.csv',
  ].map((f) => fetchCSV(f));
  const results = await Promise.all(fetches);
  return {
    timeseriesFlat: results[0],
    timeseriesVert: results[1],
  }
}

export default Context;
