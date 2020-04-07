import React from 'react';
import DeckGL from '@deck.gl/react';
import { FlyToInterpolator } from '@deck.gl/core';
import StaticMap from 'react-map-gl';

import { MAPBOX_API_TOKEN } from '../vars';

const initialViewState = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 5,
  pitch: 0,
  bearing: 0,
};

const mapStyles = {
  MAPBOX_DARK: 'mapbox://styles/mapbox/dark-v9',
  DARK: 'mapbox://styles/bobhead/ck8pf7npv0cda1iobxo3txanr',
};

function Map({
  children,

  layers = [],
  viewState = initialViewState,
}) {
  return (
    <DeckGL
      initialViewState={initialViewState}
      viewState={{
        ...viewState,
        transitionDuration: 3000,
        transitionInterpolator: new FlyToInterpolator(),
      }}
      layers={layers}
    >
      <StaticMap
        {...viewState}
        reuseMaps
        preventStyleDiffing={true}
        mapStyle={mapStyles.DARK}
        mapboxApiAccessToken={MAPBOX_API_TOKEN} />

      <div style={{ zIndex: 1 }} children={children} />
    </DeckGL>
  )
}

Map.initialViewState = initialViewState;

export default Map;
