import React, { useRef, useState } from 'react';
import { Carousel, Layout, Button, Row, Col, Typography } from 'antd';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';

import './App.css';

// contexts for data
import ACSContext from './contexts/ACSContext';
import EPAContext from './contexts/EPAContext';
import SingleLoader from './contexts/SingleLoader';

// slideshow components
import Intro from './slides/Intro';
import Questions from './slides/Questions';
import MethodologyDataACS from './slides/methodology/DataACS';
import MethodologyDataACSExplorer from './slides/methodology/DataACSExplorer';
import MethodologyDataEPA from './slides/methodology/DataEPA';
import MethodologyDataEPAExplorer from './slides/methodology/DataEPAExplorer';
import MethodologyAnalysis from './slides/methodology/Analysis';
import End from './slides/End';

// map
// import Map from './maps/Map';
import DeckGL from '@deck.gl/react';
import { LinearInterpolator } from '@deck.gl/core';
import { StaticMap } from 'react-map-gl';
import { MAPBOX_API_TOKEN, VIEW_STATES } from './vars';

const mapStyles = {
  MAPBOX_DARK: 'mapbox://styles/mapbox/dark-v9',
  DARK: 'mapbox://styles/bobhead/ck8pf7npv0cda1iobxo3txanr',
};

const mapMoveInterpolator = new LinearInterpolator(['bearing']);

const slides = [
  Intro,
  Questions,
  MethodologyDataACS,
  MethodologyDataACSExplorer,
  MethodologyDataEPA,
  MethodologyDataEPAExplorer,
  MethodologyAnalysis,
  End,
];

const { Text } = Typography; 

function App() {
  // map state
  const [mapState, setMapState] = useState({
    prevUpdateID: -1,

    viewState: {
      ...VIEW_STATES.INITAL,
      transitionDuration: 1000,
      transitionInterpolator: mapMoveInterpolator,
    },
    layers: [],

    mapStyle: 'DARK',
  });

  // slides
  const [slideID, setSlide] = useState(0);
  const slider = useRef();
  const carouselNodes = slides.map((S, id) => <S
    slideID={id}
    isSlideSelected={id === slideID}
    updateMapState={(s, updateID) => {
      const stateUpdateID = updateID || id;
      // TODO making mapState a dependency of carousel causes infinite loops.
      if (stateUpdateID !== mapState.prevUpdateID) {
        setMapState({
          prevUpdateID: stateUpdateID,
          // recycle prev config if possible
          layers: s.layers || mapState.layers, 
          viewState: s.viewState ? {
            ...mapState.viewState,
            ...s.viewState,
            // why won't this work :(
            transitionDuration: 1000,
            transitionInterpolator: mapMoveInterpolator,
          } : mapState.viewState,
        });
      } else {
        console.log(`discarding map update ${stateUpdateID}`);
      }
    }}
  />)

  return (
    <Layout style={{ height:"100vh"}}>
      <Layout.Content style={{ height:"100%" }}>
        <DeckGL
          viewState={mapState.viewState}
          layers={mapState.layers}>
          <StaticMap
              viewState={mapState.viewState}
              mapStyle={mapStyles.DARK}
              reuseMaps
              preventStyleDiffing
              mapboxApiAccessToken={MAPBOX_API_TOKEN} />
        </DeckGL>

        <SingleLoader context={ACSContext}>
          <SingleLoader context={EPAContext}>
            <Carousel
              ref={ref => { slider.current = ref; }}
              style={{ height: "100%" }}
              dotPosition="top"
              beforeChange={(_, to) => { setSlide(to); }}
              children={carouselNodes} />
          </SingleLoader>
        </SingleLoader>
      </Layout.Content>

      <Layout.Footer>
        <Row justify="space-between" type="flex" align="middle">
          <Col span={4}>
            {slideID > 0
              ? <Button type="primary" shape="round" icon={<ArrowLeftOutlined />} size="large"
                  onClick={() => { slider.current.prev() }}/>
              : undefined}
          </Col>
          <Col span={8} style={{
            display: "flex",
            alignItems: "center",
            verticalAlign: "middle",
            textAlign: "center"
          }} offset={slideID > 0 ? 0 : 4}>
            <Text type="secondary" style={{ verticalAlign: "middle", alignItems: "center", textAlign: "center" }}>
              {slides[slideID].footerText}
            </Text>
          </Col>
          <Col span={4} >
            <Button type="primary" shape="round" icon={<ArrowRightOutlined />} size="large" style={{ float: 'right' }}
              onClick={() => { slider.current.next() }}/>
          </Col>
        </Row>
      </Layout.Footer>
    </Layout>
  );
}

export default App;
