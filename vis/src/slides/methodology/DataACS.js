import React from 'react';
import { Card, Row, Col, Avatar, List } from 'antd';
import { TeamOutlined, RocketOutlined, PoundOutlined } from '@ant-design/icons';

import { VIEW_STATES } from '../../vars';
import SlideLayout from '../../components/SlideLayout';

const focusFeaturesContent = [
  {
    icon: <TeamOutlined />,
    title: 'Population Traits',
    description: 'This includes features like total population, median age, household types, and education.',
  },
  {
    icon: <RocketOutlined />,
    title: 'Commuting Habits',
    description: 'The ACS collects information on how people get to work, and how long they take to do so.',
  },
  {
    icon: <PoundOutlined />,
    title: 'Economic Situations',
    description: 'We want to explore if income inequality, poverty rates, and rent burden of the population has any significance in air quality changes.',
  }
];
const focusFeatures = (
  <List itemLayout="horizontal" dataSource={focusFeaturesContent} renderItem={(f) => (
    <List.Item>
      <List.Item.Meta
        avatar={f.icon ? <Avatar icon={f.icon}/> : undefined}
        title={f.title}
        description={f.description}/>
    </List.Item>
  )} />
)

function Slide({ updateMapState, isSlideSelected }) {
  if (isSlideSelected) {
    const viewState = { ...VIEW_STATES.US_RIGHT };
    viewState.zoom -= 0.25;
    viewState.latitude -= 16;
    viewState.longitude -= 20;
    updateMapState({ viewState });
  }

  return (
    <SlideLayout footer={(
      <Row>
        <Col offset={16} span={8} style={{ height: '100%' }}>
          <Card bordered={false} style={{ float: 'right', marginTop: 'auto' }}>
            <Card.Meta
              title="CBSA Regions"
              description={'CBSA stands for "core-based statistical area" and is defined as an area anchored '
              + 'around an urban center of at least 10,000 people. They are identified by distinct GeoIDs, '
              + 'which we\'ll be using throughout this project.'}
            />
          </Card>
        </Col>
      </Row>
    )}>
      <Row gutter={32} style={{ height: '100%' }}>
        <Col span={12}>
          <Card title="Data: The American Community Survey (ACS)" bordered={false}>
<p>
The <a href="https://www.census.gov/programs-surveys/acs" target="_blank" rel="noopener noreferrer">American Community Survey</a>,
provided by the United States Census Bureau, "provides vital information on a yearly basis about
the United States and its people by contacting over 3.5 million households across the country”.
This data is used for determining US federal and state funding and is openly available on Google BigQuery.
</p>
<p>
The dataset provides a huge variety of metrics, though we'll be focusing on the following areas for
this project:
</p>
{focusFeatures}
          </Card>
        </Col>
      </Row>
    </SlideLayout>
  )
}

Slide.footerText = 'Simplified ACS CBSA regional boundaries, with heights representing total population'

export default Slide;
