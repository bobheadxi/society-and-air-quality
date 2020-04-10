import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Space, Spin, Select, Slider } from 'antd';
import { ResponsiveLine } from '@nivo/line';

import SlideLayout from '../../components/SlideLayout';
import { layerACSRegions, elevateByFeature } from '../../components/mapLayers';
import { getYearsMarks, YEARS, REGIONS, ACS_FEATURES, VIEW_STATES } from '../../vars';

const { Text, Title } = Typography;

const yearMarks = getYearsMarks();

function Slide({ acs, updateMapState, isSlideSelected }) {
  const [visState, setVisState] = useState({
    year: 0,
    feature: ACS_FEATURES.POV,
    geoid: REGIONS.NY.geoid,
  });

  useEffect(() => {
    if (acs.loading || acs.err || !isSlideSelected) return;
    const viewState = { ...VIEW_STATES.US_RIGHT };
    viewState.zoom -= 0.25;
    viewState.latitude -= 16;
    viewState.longitude -= 20;
    updateMapState({
      viewState,
      layers: [
        layerACSRegions(acs.regions, {
          yearID: visState.year,
          highlightGeoID: visState.geoid,
          elevate: elevateByFeature(acs.timeseriesFlat, `acs.${visState.feature}`),
        }),
      ],
    },
    );
  }, [isSlideSelected, acs, visState, updateMapState]);

  if (acs.loading || acs.err) return <Spin/>;

  const region = acs.regions[visState.year].features.find((v) => v.properties.geoid === visState.geoid);
  const { properties: { name: regionName } } = region;
  const chartData = [{
    id: `ts-${visState.geoid}`,
    data:  acs.timeseriesFlat.map((v, i) => ({
        x: YEARS[i],
        y: parseFloat(v[`${visState.geoid}.acs.${visState.feature}`]),
      })),
  }];

  return (
    <SlideLayout>
      <Row>
        <Col span={12}>
          <Space direction="vertical">
            <Card title="Data: The American Community Survey (ACS)" bordered={false}>
              <div style={{marginBottom: '16px'}}>
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
              </div>

              <div style={{marginBottom: '16px'}}>
                <Title level={4}>Feature</Title>
                <Select
                  labelInValue
                  defaultValue={{ key: ACS_FEATURES.POV }}
                  style={{ width: 400 }}
                  onChange={(v) => setVisState({ ...visState, feature: v.key})}
                >
                  <Select.Option value={ACS_FEATURES.POP}>{ACS_FEATURES.POP}</Select.Option>
                  <Select.Option value={ACS_FEATURES.GINI}>{ACS_FEATURES.GINI}</Select.Option>
                  <Select.Option value={ACS_FEATURES.POV}>{ACS_FEATURES.POV}</Select.Option>
                  <Select.Option value={ACS_FEATURES.TRANSIT}>{ACS_FEATURES.TRANSIT}</Select.Option>
                </Select>
              </div>
                
              <div style={{marginBottom: '16px'}}>
                <Title level={4}>Year</Title>
                <Slider min={0} max={YEARS.length-1} marks={yearMarks} defaultValue={YEARS.length-1} step={1} included={false}
                  onChange={(v) => setVisState({ ...visState, year: v })} />
              </div>
            </Card>

            <Card  bordered={false}>
              <Title level={3}>{regionName}</Title>
              <Text strong>{`GeoID ${visState.geoid} | Feature ${visState.feature}`}</Text>
              <br />
              <div style={{ height: 300, width: 500 }}>
                <ResponsiveLine
                  data={chartData}
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
}

Slide.footerText = 'Simplified ACS CBSA regional boundaries, with heights representing the selected metric'

export default Slide;
