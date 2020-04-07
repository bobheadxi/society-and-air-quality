import React, { useRef, useState } from 'react';
import { Carousel, Layout, Button, Row, Col, Typography } from 'antd';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';

import './App.css';

// contexts for data
import ACSContext from './contexts/ACSContext';
import EPAContext from './contexts/EPAContext';
import SingleLoader from './contexts/SingleLoader';

// map
import Map from './maps/Map';

// slideshow components
import Intro from './slides/Intro';
import Questions from './slides/Questions';
import MethodologyData from './slides/methodology/Data';
import MethodologyProcessing from './slides/methodology/Processing';
import MethodologyAnalysis from './slides/methodology/Analysis';
import End from './slides/End';

const { Text } = Typography; 

function App() {
  // map state
  const [mapState, setMapState] = useState({
    prevUpdateID: -1,

    viewState: Map.initialViewState,
    layers: [],

    mapStyle: 'DARK',
    hideMapLayer: false,
  });

  // slides
  const [slideID, setSlide] = useState(0);
  const slider = useRef();
  const slides = [
    Intro,
    Questions,
    MethodologyData,
    MethodologyProcessing,
    MethodologyAnalysis,
    End,
  ];
  const carouselNodes = slides.map((S, id) => <S
    slideID={id}
    isSlideSelected={id === slideID}
    updateMapState={(s, updateID) => {
      const stateUpdateID = (updateID | id);
      if (stateUpdateID !== mapState.prevUpdateID) {
        setMapState({ prevUpdateID: stateUpdateID, ...s });
      }
    }}
  />)

  // the entire app pretty much
  const main = (
    <Layout style={{minHeight:"100vh"}}>
      <Layout.Content>
        <Map {...mapState}>
          <Carousel
            ref={ref => { slider.current = ref; }}
            style={{minHeight:"100vh"}}
            dotPosition="top"
            beforeChange={(_, to) => { setSlide(to); }}
            children={carouselNodes} />
        </Map>
      </Layout.Content>

      <Layout.Footer>      
        <Row justify="space-between">
          <Col span={8}>
            {slideID > 0
              ? <Button type="primary" shape="round" icon={<ArrowLeftOutlined />} size="large"
                  onClick={() => { slider.current.prev() }}/>
              : undefined}
          </Col>
          <Col>
            <Text type="secondary">
              {slides[slideID].footerText}
            </Text>
          </Col>
          <Col span={8} >
            {slideID < slides.length
              ? <Button type="primary" shape="round" icon={<ArrowRightOutlined />} size="large" style={{ float: 'right' }}
                  onClick={() => { slider.current.next() }}/>
              : undefined}
          </Col>
        </Row>
      </Layout.Footer>
    </Layout>
  )

  return (
    <SingleLoader context={ACSContext}>
      <SingleLoader context={EPAContext}>
          {main}
      </SingleLoader>
    </SingleLoader>
  );
}

export default App;
