import React, { useState } from 'react';
import { Card, Row, Col, Typography, Space, Spin, Select, Slider } from 'antd';
import { GeoJsonLayer } from '@deck.gl/layers';
import { ResponsiveLine } from '@nivo/line';

import { geoidToColor, YEARS, REGIONS, EPA_FEATURES } from '../../vars';
import EPAContext from '../../contexts/EPAContext';

import SlideLayout from '../../components/SlideLayout';

const { Text, Title } = Typography;

function Slide({ slideID, updateMapState, isSlideSelected }) {
  const [visState, setVisState] = useState({
    year: 0,
    feature: EPA_FEATURES.PM.code,
    geoid: REGIONS.NY.geoid,
  });

  return (
    <EPAContext.Consumer>
      {(epa) => {
        if (epa.loading || epa.err) return <Spin/>;
        const { timeseriesFlat, stations } = epa;

        if (isSlideSelected) {
          updateMapState({
            layers: [
              new GeoJsonLayer({
                id: `data-epa-layer-${visState.year}-${visState.feature}-${visState.region}`,
                data: stations[visState.year],
                pointRadiusMinPixels: 4,
                getFillColor: (d) => {
                  const { properties: { acs_geoid: geoid } } = d;
                  if (`${geoid}` === visState.geoid) return [255,255,0];
                  return geoidToColor(geoid)
                },
                getLineColor: [255, 255, 255],
                opacity: 0.8,
                stroked: false,
                filled: true,
                wireframe: true,
              }),
            ]
          },
          // updateID forces update but also causes infinite loop
          // `${slideID}-${visState.year}-${visState.feature}-${visState.geoid}`
          );
        }

        const station = stations[visState.year].features.find((v) => `${v.properties.acs_geoid}` === visState.geoid);
        const { properties: { acs_cbsa_name: regionName } } = station;

        const stationsTimeseries = {};
        timeseriesFlat.forEach((row, i) => {
          Object.keys(row).forEach((col) => {
            if (col.startsWith(visState.geoid) && col.endsWith(`${visState.feature}.mean`)) {
              const parts = col.split('.');
              const stationID = `${parts[2]}.${parts[3]}.${parts[4]}`;
              if (!stationsTimeseries[stationID]) stationsTimeseries[stationID] = [];
              const v = parseFloat(row[col]);
              if (!isNaN(v)) {
                stationsTimeseries[stationID].push({
                  x: YEARS[i],
                  y: v,
                });
              }
            }
          })
        })
        const chartData = Object.keys(stationsTimeseries).map((ts) => ({
          id: `ts-${visState.geoid}-${ts}`,
          data: stationsTimeseries[ts],
        }));

        return (
          <SlideLayout>
            <Row>
              <Col span={12}>
                <Space direction="vertical">
                  <Card title="Data: Historical Air Quality (EPA)" bordered={false}>

                    <p>
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
                    </p>

                    <p>
                    <Title level={4}>Feature</Title>
                    <Select
                      labelInValue
                      defaultValue={{ key: EPA_FEATURES.PM.code }}
                      style={{ width: 400 }}
                      onChange={(v) => setVisState({ ...visState, feature: v.key})}
                    >
                      <Select.Option value={EPA_FEATURES.PM.code}>{EPA_FEATURES.PM.name}</Select.Option>
                      <Select.Option value={EPA_FEATURES.TEMP.code}>{EPA_FEATURES.TEMP.name}</Select.Option>
                    </Select>
                    </p>

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
                        data={chartData}
                        xScale={{ type: 'point' }}
                        yScale={{ type: 'linear', min: 0 }}

                        axisBottom={{ legend: 'year' }}
                        axisLeft={{ legend: `${visState.feature} means` }}
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
    </EPAContext.Consumer>
  );
}

Slide.footerText = 'Relevant EPA measurement sites, colored by the CBSA they belong in'

export default Slide;
