import React from 'react';
import { Card, Row, Col, Typography, Avatar, Space } from 'antd';
import { QuestionOutlined } from '@ant-design/icons';
import { GeoJsonLayer } from '@deck.gl/layers';

import { stationGeoToColor } from '../vars';
import EPAContext from '../contexts/EPAContext';
import SlideLayout from '../components/SlideLayout';

const { Title, Text } = Typography;

function QuestionsSlide({ updateMapState, isSlideSelected }) {
  return (
    <EPAContext.Consumer>
      {(epa) => {
        if (isSlideSelected) {
          updateMapState({
            viewState: {
              longitude: -98.5795,
              latitude: 41.8283,
              zoom: 3,
              pitch: 0,
              bearing: 0
            },
            layers: [
              new GeoJsonLayer({
                id: 'intro-epa-layer',
                data: epa.stations[epa.stations.length-1],
                pointRadiusMinPixels: 3,
                getFillColor: stationGeoToColor,
              }),
            ]
          });
        }
        return (
          <SlideLayout>
          <Row gutter={16}>
            <Col span={8} offset={16}>
              <Space direction="vertical">
                  <Card title="Questions" bordered={false}>
                    <Text>
                      research questions, few sentences on the relevance of this study
                    </Text>
                  </Card>
              </Space>
            </Col>
          </Row>
        </SlideLayout>
        )
      }}
    </EPAContext.Consumer>
  );
}

export default QuestionsSlide;
