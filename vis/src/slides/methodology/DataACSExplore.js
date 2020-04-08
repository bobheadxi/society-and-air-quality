import React, { useState } from 'react';
import { Card, Row, Col, Typography, Space, Spin, Select, Slider } from 'antd';
import { GeoJsonLayer } from '@deck.gl/layers';
import { ResponsiveLine } from '@nivo/line';

import { geoidToColor, getYearsMarks, YEARS, REGIONS, ACS_FEATURES } from '../../vars';
import ACSContext from '../../contexts/ACSContext';

import SlideLayout from '../../components/SlideLayout';

const { Text, Title } = Typography;

function Slide({ slideID, updateMapState, isSlideSelected }) {
  const [visState, setVisState] = useState({
    year: 0,
    feature: ACS_FEATURES.POV,
    geoid: REGIONS.NY.geoid,
  });

  return (
    <ACSContext.Consumer>
      {(acs) => {
        if (acs.loading || acs.err) return <Spin/>;
        const { timeseriesFlat, regions } = acs;

        if (isSlideSelected) {
          updateMapState({
            layers: [
              new GeoJsonLayer({
                id: `data-acs-layer-${visState.year}-${visState.feature}-${visState.region}`,
                data: regions[visState.year],
                pointRadiusMinPixels: 3,
                getFillColor: (d) => geoidToColor(d.properties.geoid),
                getLineColor: [255, 255, 255],
                getElevation: (d) => {
                  const { properties: { geoid } } = d;
                  const pop = timeseriesFlat[visState.year][`${geoid}.acs.${visState.feature}`] || 0;
                  return Math.sqrt(pop) * 100;
                },
                opacity: 0.8,
                stroked: false,
                filled: true,
                extruded: true,
                wireframe: true,
              }),
            ]
          },
          // updateID forces update but also causes infinite loop
          // `${slideID}-${visState.year}-${visState.feature}-${visState.geoid}`
          );
        }

        const region = acs.regions[visState.year].features.find((v) => v.properties.geoid === visState.geoid);
        const { properties: { name: regionName } } = region;

        const chartData = timeseriesFlat
          .map((v, i) => ({
            x: YEARS[i],
            y: v[`${visState.geoid}.acs.${visState.feature}`],
          }));

        return (
          <SlideLayout>
            <Row>
              <Col span={12}>
                <Space direction="vertical">
                  <Card title="Data: The American Community Survey (ACS)" bordered={false}>

                    <Title level={4}>Region</Title>
                    <Select
                      labelInValue
                      defaultValue={{ key: REGIONS.NY.geoid }}
                      style={{ width: 400 }}
                      onChange={(v) => setVisState({ ...visState, geoid: v.key })}
                    >
                      <Select.Option value={REGIONS.SF.geoid}>{REGIONS.SF.name}</Select.Option>
                      <Select.Option value={REGIONS.NY.geoid}>{REGIONS.NY.name}</Select.Option>
                      <Select.Option value={REGIONS.AU.geoid}>{REGIONS.AU.name}</Select.Option>
                    </Select>

                    <Title level={4}>Feature</Title>
                    <Select
                      labelInValue
                      defaultValue={{ key: REGIONS.SF.geoid }}
                      style={{ width: 400 }}
                      onChange={(v) => setVisState({ ...visState, feature: v.key})}
                    >
                      <Select.Option value={ACS_FEATURES.POP}>{ACS_FEATURES.POP}</Select.Option>
                      <Select.Option value={ACS_FEATURES.GINI}>{ACS_FEATURES.GINI}</Select.Option>
                      <Select.Option value={ACS_FEATURES.POV}>{ACS_FEATURES.POV}</Select.Option>
                      <Select.Option value={ACS_FEATURES.TRANSIT}>{ACS_FEATURES.TRANSIT}</Select.Option>
                    </Select>

                    {/* TODO Causes infinite state update loop with current architecture. Need to redesign.                   
                    <Title level={4}>Year</Title>
                    <Slider min={0} max={YEARS.length-1} marks={getYearsMarks()} defaultValue={0} step={1} included={false}
                      onChange={(v) => setVisState({ ...visState, year: v })} />
                    */}
                  </Card>

                  <Card  bordered={false}>
                    <Title level={3}>{regionName}</Title>
                    <Text strong>{`GeoID ${visState.geoid} | Feature ${visState.feature}`}</Text>
                    <br />
                    <div style={{ height: 300, width: 500 }}>
                      <ResponsiveLine
                        data={[{
                          id: `ts-${visState.geoid}`,
                          data: chartData,
                        }]}
                        xScale={{ type: 'point' }}
                        yScale={{ type: 'linear' }}

                        axisBottom={{ legend: 'year' }}
                        axisLeft={{ legend: `${visState.feature}` }}
                        enableGridY={false}

                        margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
                        colors={{ scheme: 'dark2' }}
                        enableCrosshair
                        isInteractive
                        />
                    </div>
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

Slide.footerText = 'Simplified ACS CBSA regional boundaries, with heights representing the selected metric'

export default Slide;
