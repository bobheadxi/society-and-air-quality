import React, { useEffect } from 'react';
import { Typography, Avatar, Space } from 'antd';
import { ExperimentTwoTone } from '@ant-design/icons';

import { VIEW_STATES } from '../vars';

import SlideLayout from '../components/SlideLayout';
import { layerEPAStations } from '../components/mapLayers';

const { Text, Title } = Typography;

const main = (
  <Space direction="vertical" size="large" style={{ padding: '48px', marginTop: '64px' }}>
    <Avatar size="large" icon={<ExperimentTwoTone />} /> 
    <Typography>
      <Title>Society and Air Quality</Title>
      <Text>EOSC 410 Final Project</Text> | <Text type="secondary">University of British Columbia, April 2020</Text>
    </Typography>
  </Space>
)

function IntroSlide({ epa, updateMapState, isSlideSelected }) {
  useEffect(() => {
    if (epa.loading || epa.err || !isSlideSelected) return;
    updateMapState({
      viewState: VIEW_STATES.INITAL,
      layers: [layerEPAStations(epa.stations)],
    });
  }, [isSlideSelected, epa, updateMapState]);

  return (
    <SlideLayout>
      {main}
    </SlideLayout>
  );
}

IntroSlide.footerText = 'by Robert Lin and Angelene Leow';

export default IntroSlide;
