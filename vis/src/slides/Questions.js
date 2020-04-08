import React from 'react';
import { Card, Row, Col, Typography, Timeline, Space } from 'antd';
import { FilterTwoTone, FundTwoTone, QuestionCircleFilled } from '@ant-design/icons';
import { GeoJsonLayer } from '@deck.gl/layers';

import { geoidToColor, VIEW_STATES } from '../vars';

import ACSContext from '../contexts/ACSContext';

import SlideLayout from '../components/SlideLayout';

const { Text } = Typography;

const questionsContent = [
  {
    text: (<Text strong>
      As cities grow, we undoubtedly make a significant impact on the environment. We want to explore
      the relationship between society and the world around us.
    </Text>),
    icon: <QuestionCircleFilled style={{ fontSize: '24px' }} />,
    color: 'green',
  },
  {
    text: 'Are there any correlations between societal metrics and air quality indicators?',
    icon: <FilterTwoTone />,
  },
  {
    text: 'Can we leverage metrics that measure changes in society to predict changes in air quality?',
    icon: <FundTwoTone />,
  },
];

const questions = (
  <Timeline>
    {questionsContent.map((q) => (
      <Timeline.Item dot={q.icon} color={q.color}>{q.text}</Timeline.Item>
    ))}
  </Timeline>
)

function QuestionsSlide({ updateMapState, isSlideSelected }) {
  return (
    <ACSContext.Consumer>
      {(acs) => {
        if (!acs.loading && !acs.err && isSlideSelected) {
          const { timeseriesFlat, regions } = acs;
          updateMapState({
            viewState: VIEW_STATES.US_LEFT,
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
            <Row>
              <Col span={8} offset={16}>
                <Space direction="vertical">
                    <Card title="Research Questions" bordered={false}>
                    {questions}
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
