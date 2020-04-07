import React from 'react';
import { Card, Row, Col, Typography, Avatar, Space } from 'antd';
import { ExperimentTwoTone } from '@ant-design/icons';

import SlideLayout from '../components/SlideLayout';

const { Text, Title } = Typography;

function Slide() {
  return (
    <SlideLayout>
      <Space direction="vertical" size="large" style={{ padding: '48px' }}>
        <Avatar size="large" icon={<ExperimentTwoTone />} /> 
        <Typography align="center">
          <Title>Society and Air Quality</Title>
          <Text>EOSC 410 Final Project</Text> | <Text type="secondary">University of British Columbia, April 2020</Text>
        </Typography>
      </Space>
    </SlideLayout>
  );
}

Slide.footerText = 'Robert Lin and Angelene Leow';

export default Slide;
