import React from 'react';
import { Card, Row, Col, Avatar, List, Spin } from 'antd';
import { HeartOutlined, AreaChartOutlined } from '@ant-design/icons';
import { GeoJsonLayer } from '@deck.gl/layers';

import { VIEW_STATES, geoidToColor } from '../../vars';
import SlideLayout from '../../components/SlideLayout';
import EPAContext from '../../contexts/EPAContext';

const focusFeaturesContent = [
  {
    icon: <HeartOutlined />,
    title: 'Acceptable PM2.5 AQI & Speciation Mass',
    description: 'The Air Quality Index (AQI) is used to provide pollution estimates - needless to say, a very representative metric for this project.',
  },
  {
    icon: <AreaChartOutlined />,
    title: 'Average Ambient Temperature',
    description: 'Although the time span of 12 years is very short, we want to explore what trends might exist in this metric.',
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
    <EPAContext.Consumer>
      {(epa) => {
        if (epa.loading || epa.err) return <Spin/>;
        const { stations } = epa;

        if (isSlideSelected) {
          const viewState = { ...VIEW_STATES.US_RIGHT };
          viewState.zoom -= 0.25;
          viewState.latitude -= 10;
          viewState.longitude -= 20;
          viewState.pitch = 0;
          viewState.bearing = 0;
          updateMapState({
            viewState,
            layers: [
              new GeoJsonLayer({
                id: 'data-epa-layer',
                data: stations[stations.length-1],
                pointRadiusMinPixels: 4,
                getFillColor: (d) => {
                  const { properties: { acs_geoid: geoid } } = d;
                  return geoidToColor(geoid);
                },
              }),
            ],
          });
        }

        return (
          <SlideLayout footer={(
            <Row>
              <Col offset={16} span={8} style={{ height: '100%' }}>
                <Card bordered={false} style={{ float: 'right', marginTop: 'auto' }}>
                  <Card.Meta
                    title="CBSA Regions"
                    description={'To align the ACS and EPA datasets, we categorized each station by the CBSA they belong in, demonstrated in this visualization.'}
                  />
                </Card>
              </Col>
            </Row>
          )}>
            <Row gutter={32} style={{ height: '100%' }}>
              <Col span={12}>
                <Card title="Data: Historical Air Quality (EPA)" bordered={false}>
<p>
The <a href="https://console.cloud.google.com/marketplace/details/epa/historical-air-quality?filter=solution-type%3Adataset&filter=category%3Ascience-research&id=198c2178-3986-4182-a7c7-4c9ae81dfc5d" target="_blank" rel="noopener noreferrer">Historical Air Quality dataset</a>,
provided by the Environmental Protection Agency (EPA), which contains "annual summary data as well as
hourly and daily data in the categories of criteria gases, particulates, meteorological, and toxics".
It is openly available on Google BigQuery.
</p>
<p>
The dataset also provides a huge variety of measurements, though unfortunately, due to adjustments
in collection methods over time, very few metrics have been consistently measured over the years.
Becasue of this, we've decided to focus on the following features of the EPA dataset this project:
</p>
{focusFeatures}
                </Card>
              </Col>
            </Row>
          </SlideLayout>
        )
      }}
    </EPAContext.Consumer>
  )
}

Slide.footerText = 'Relevant EPA measurement sites, colored by the CBSA they belong in'

export default Slide;
