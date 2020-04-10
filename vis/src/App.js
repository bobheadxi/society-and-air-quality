import React, { useRef, useState, useCallback } from 'react';
import { Carousel, Layout, Button, Row, Col, Typography, notification } from 'antd';
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

const viewStateInterpolate = {
  transitionDuration: 3000,
  transitionInterpolator: new LinearInterpolator(),
}

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
    viewState: { ...VIEW_STATES.INITAL },
    layers: [],
  });
  const updateMapState = useCallback(
    (s) => {
      setMapState({
        layers: s.layers,
        viewState: { ...viewStateInterpolate, ...s.viewState }
      });
    },
    [],
  );
  console.log(mapState.viewState)

  // slides
  const [slideID, setSlide] = useState(0);
  const slider = useRef();

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
            <ACSContext.Consumer>
              {(acs) => (
                <EPAContext.Consumer>
                  {(epa) => {
                    if (acs.loading || epa.loading) {
                      notification.info({ key: 'loading-message', message: 'Loading data...' });
                    } else {
                      if (acs.err) {
                        notification.error({
                          key: 'acs-err',
                          message: 'An error occured when loading ACS data :(',
                          description: acs.err.message,
                        });
                      }
                      if (epa.err) {
                        notification.error({
                          key: 'epa-err',
                          message: 'An error occured when loading EPA data :(',
                          description: epa.err.message,
                        });
                      }
                      if (!acs.err && !epa.err) {
                        notification.close('loading-message');
                      }
                    }

                    return (
                      <Carousel
                        ref={ref => { slider.current = ref; }}
                        dotPosition="bottom"
                        beforeChange={(_, to) => { setSlide(to); }}
                        children={slides.map((Slide, id) => <Slide
                          acs={acs}
                          epa={epa}
                          slideID={id}
                          isSlideSelected={id === slideID}
                          updateMapState={updateMapState}
                        />)} />
                    )
                  }}
                </EPAContext.Consumer>
              )}
            </ACSContext.Consumer>
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
