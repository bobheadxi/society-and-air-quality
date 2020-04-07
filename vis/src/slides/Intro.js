import React from 'react';
import { Row, Col, Typography, Avatar, Space, Alert } from 'antd';
import { ExperimentTwoTone } from '@ant-design/icons';
import { GeoJsonLayer } from '@deck.gl/layers';

import { geoidToColor, INITIAL_VIEW_STATE } from '../vars';
import EPAContext from '../contexts/EPAContext';
import ACSContext from '../contexts/ACSContext';

import SlideLayout from '../components/SlideLayout';

const { Text, Title } = Typography;

const main = (
  <Space direction="vertical" size="large" style={{ padding: '48px' }}>
    <Avatar size="large" icon={<ExperimentTwoTone />} /> 
    <Typography>
      <Title>Society and Air Quality</Title>
      <Text>EOSC 410 Final Project</Text> | <Text type="secondary">University of British Columbia, April 2020</Text>
    </Typography>
  </Space>
)

function IntroSlide({ updateMapState, isSlideSelected }) {
  return (
    <EPAContext.Consumer>
      {(epa) => {
        // wait for ACS data - since this is the intro slide, we want to make sure *all* data is
        // available
        return (
          <ACSContext.Consumer>
            {(acs) => {
              const isLoading = acs.loading || epa.loading
              const isDataLoaded = !isLoading && !acs.err && !epa.err;

              if (isDataLoaded && isSlideSelected) {
                updateMapState({
                  viewState: INITIAL_VIEW_STATE,
                  layers: [
                    new GeoJsonLayer({
                      id: 'intro-epa-layer',
                      data: epa.stations[epa.stations.length-1],
                      pointRadiusMinPixels: 3,
                      getFillColor: (d) => {
                        const { properties: { acs_geoid: geoid } } = d;
                        return geoidToColor(geoid);
                      },
                    }),
                  ],
                });
              }

              return (
                <SlideLayout>
                  <Row>
                    <Col span={4} offset={20}>
                      <Space direction="vertical">
                        {isLoading ? <Alert message="Loading data..." type="info" /> : undefined}
                        {isDataLoaded ? <Alert message={'Presentation data is ready!'} type="success" showIcon /> : undefined}

                        {(!isLoading && acs.err)
                          ? <Alert message="Error occured when loading ACS data" description={acs.err.message} type="error" showIcon /> 
                          : undefined}
                        {(!isLoading && epa.err)
                          ? <Alert message="Error occured when loading EPA data" description={epa.err.message} type="error" showIcon />
                          : undefined}
                      </Space>
                    </Col>
                  </Row>
                  {main}
                </SlideLayout>
              )
            }}
          </ACSContext.Consumer>
        )
      }}
    </EPAContext.Consumer>
  );
}

IntroSlide.footerText = 'by Robert Lin and Angelene Leow';

export default IntroSlide;
