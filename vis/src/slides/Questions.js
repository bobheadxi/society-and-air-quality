import React, { useEffect } from 'react';
import { Card, Row, Col, Typography, Timeline, Space } from 'antd';
import { FilterTwoTone, FundTwoTone, QuestionCircleFilled } from '@ant-design/icons';

import { VIEW_STATES } from '../vars';

import SlideLayout from '../components/SlideLayout';
import { layerACSRegions, elevateByPopulation } from '../components/mapLayers';

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

function QuestionsSlide({ acs, updateMapState, isSlideSelected }) {
  useEffect(() => {
    if (acs.loading || acs.err || !isSlideSelected) return;
    updateMapState({
      viewState: VIEW_STATES.US_LEFT,
      layers: [
        layerACSRegions(acs.regions, {
          elevate: elevateByPopulation(acs.timeseriesFlat),
        }),
      ],
    });
  }, [acs, isSlideSelected, updateMapState]);

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
}

QuestionsSlide.footerText = 'Simplified ACS CBSA regional boundaries, with heights representing total population'

export default QuestionsSlide;
