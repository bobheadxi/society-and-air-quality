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

const { Text } = Typography; 

function App() {
  const [slideID, setSlide] = useState(0);
  const slider = useRef();

  const slides = [
    Intro,
    Questions,
    MethodologyData,
    MethodologyProcessing,
    MethodologyAnalysis,
  ]

  const main = (
    <Layout style={{minHeight:"100vh"}}>
      <Layout.Content>
        <Carousel
          dotPosition="top"
          draggable
          beforeChange={(from, to) => { setSlide(to); }}
          ref={ref => { slider.current = ref; }}
          children={slides.map(S => <S />)} />
      </Layout.Content>
      <Layout.Footer>      
        <Row justify="space-between">
          <Col span={8}>
            {slideID > 0
              ? <Button type="ghost" shape="round" icon={<ArrowLeftOutlined />} size="small"
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
              ? <Button type="ghost" shape="round" icon={<ArrowRightOutlined />} size="small" style={{ float: 'right' }}
                  onClick={() => { slider.current.next() }}/>
              : undefined}
          </Col>
        </Row>
      </Layout.Footer>
    </Layout>
  )

  return (
    <SingleLoader name="context.acs" context={ACSContext}>
      <SingleLoader name="context.epa" context={EPAContext}>
        {main}
      </SingleLoader>
    </SingleLoader>
  );
}

export default App;
