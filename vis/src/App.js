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
import MethodologyData from './slides/methodology/Data';
import MethodologyProcessing from './slides/methodology/Processing';
import MethodologyAnalysis from './slides/methodology/Analysis';
import End from './slides/End';

// map
// import Map from './maps/Map';
import DeckGL from '@deck.gl/react';
import { FlyToInterpolator } from '@deck.gl/core';
import { StaticMap } from 'react-map-gl';
import { MAPBOX_API_TOKEN, INITIAL_VIEW_STATE } from './vars';

const mapStyles = {
  MAPBOX_DARK: 'mapbox://styles/mapbox/dark-v9',
  DARK: 'mapbox://styles/bobhead/ck8pf7npv0cda1iobxo3txanr',
};

const slides = [
  Intro,
  Questions,
  MethodologyData,
  MethodologyProcessing,
  MethodologyAnalysis,
  End,
];

const { Text } = Typography; 

function App() {
  // map state
  const [mapState, setMapState] = useState({
    prevUpdateID: -1,

    viewState: INITIAL_VIEW_STATE,
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
      const stateUpdateID = (updateID | id);
      if (stateUpdateID !== mapState.prevUpdateID) {
        setMapState({
          prevUpdateID: stateUpdateID,
          layers: s.layers,
          viewState: {
            ...mapState.viewState,
            ...s.viewState,
            // why won't this work :(
            transitionDuration: 3000,
            transitionInterpolator: new FlyToInterpolator(),
          },
        });
      }
    }}
  />)

  return (
    <Layout style={{minHeight:"100vh"}}>
      <Layout.Content>
        <DeckGL
          initialViewState={INITIAL_VIEW_STATE}
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
                style={{minHeight:"100%"}}
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
