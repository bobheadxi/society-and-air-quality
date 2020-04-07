import React from 'react';
import { Spin, Typography, Avatar, Space } from 'antd';
import { ExperimentTwoTone } from '@ant-design/icons';

import EPAContext from '../contexts/EPAContext';

import SlideLayout from '../components/SlideLayout';

const { Text, Title } = Typography;

function Slide() {
  return (
    <EPAContext.Consumer>
      {(data) => (
        <SlideLayout>
          <Space direction="vertical" size="large" style={{ padding: '48px' }}>
            <Avatar size="large" icon={<ExperimentTwoTone />} /> 
            <Typography>
              <Title>Society and Air Quality</Title>
              <Text>EOSC 410 Final Project</Text> | <Text type="secondary">University of British Columbia, April 2020</Text>
            </Typography>

            {data.loading
              ? <Spin />
              : (data.err
                ? <Text>Error occured: {data.err.message}</Text>
                : <Text>Data loaded! Sample: {JSON.stringify(data.stations[0].features[0])}</Text>)}
          </Space>
        </SlideLayout>
      )}
    </EPAContext.Consumer>
  );
}

Slide.footerText = 'Robert Lin and Angelene Leow';

export default Slide;
