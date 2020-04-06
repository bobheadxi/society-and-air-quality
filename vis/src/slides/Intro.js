import React from 'react';
import { Card, Row, Col, Typography, Avatar } from 'antd';
import { ExperimentTwoTone } from '@ant-design/icons';

import SlideLayout from '../components/SlideLayout';

const { Text } = Typography;

function Slide() {
  return (
    <SlideLayout>
      <Row gutter={16}>
        <Col span={8} offset={16}>
          <Card>
            <Card.Meta title="Society and Air" description="EOSC410 Final Project" avatar={<Avatar size={64} icon={<ExperimentTwoTone />}/>} />
            <Text>
              Hello world!
            </Text>
          </Card>
        </Col>
      </Row>
    </SlideLayout>
  );
}

Slide.footerText = 'Robert Lin and Angelene Leow';

export default Slide;
