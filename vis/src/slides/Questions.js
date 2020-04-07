import React from 'react';
import { Card, Row, Col, Typography, Avatar, Space } from 'antd';
import { QuestionOutlined } from '@ant-design/icons';
import { GeoJsonLayer, PolygonLayer } from '@deck.gl/layers';

import { geoidToColor } from '../vars';

import ACSContext from '../contexts/ACSContext';

import SlideLayout from '../components/SlideLayout';

const { Title, Text } = Typography;

function QuestionsSlide({ updateMapState, isSlideSelected }) {
  return (
    <ACSContext.Consumer>
      {(acs) => {
        if (!acs.loading && !acs.err && isSlideSelected) {
          const { timeseriesFlat, regions } = acs;
          updateMapState({
            viewState: {
              longitude: -98.5795,
              latitude: 41.8283,
              zoom: 3.5,
              pitch: 45,
              bearing: 15
            },
            layers: [
              new GeoJsonLayer({
                id: 'questions-acs-layer',
                data: regions[regions.length-1],
                pointRadiusMinPixels: 3,
                getFillColor: (d) => geoidToColor(d.properties.geoid),
                getLineColor: [255, 255, 255],
                getElevation: (d) => {
                  const { properties: { geoid } } = d;
                  const pop = timeseriesFlat[timeseriesFlat.length-1][`${geoid}.acs.total_pop`] || 0;
                  return Math.sqrt(pop) * 100;
                },
                opacity: 0.8,
                stroked: false,
                filled: true,
                extruded: true,
                wireframe: true,
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
    </ACSContext.Consumer>
  );
}

QuestionsSlide.footerText = 'Simplified ACS CBSA regional boundaries, with heights representing total population'

export default QuestionsSlide;
