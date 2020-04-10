import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Space, Spin, Select, Slider } from 'antd';
import { ResponsiveLine } from '@nivo/line';

import { getYearsMarks, YEARS, REGIONS, EPA_FEATURES, VIEW_STATES } from '../../vars';
import { layerEPAStations } from '../../components/mapLayers';

import SlideLayout from '../../components/SlideLayout';

const { Text, Title } = Typography;

const yearMarks = getYearsMarks();

function Slide({ epa, updateMapState, isSlideSelected }) {
  const [visState, setVisState] = useState({
    year: 0,
    feature: EPA_FEATURES.PM.code,
    geoid: REGIONS.NY.geoid,
  });

  useEffect(() => {
    if (epa.loading || epa.err || !isSlideSelected) return;
    const viewState = { ...VIEW_STATES.US_RIGHT };
    viewState.zoom -= 0.25;
    viewState.latitude -= 10;
    viewState.longitude -= 20;
    viewState.pitch = 0;
    viewState.bearing = 0;

    updateMapState({
      viewState,
      layers: [
        layerEPAStations(epa.stations, {
          yearID: visState.year,
          highlightGeoID: visState.geoid,
        }),
      ],
    });
  }, [epa, isSlideSelected, updateMapState, visState])

  if (epa.loading || epa.err) return <Spin/>;
  const { timeseriesFlat, stations } = epa;
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
                defaultValue={{ key: EPA_FEATURES.PM.code }}
                style={{ width: 400 }}
                onChange={(v) => setVisState({ ...visState, feature: v.key})}
              >
                <Select.Option value={EPA_FEATURES.PM.code}>{EPA_FEATURES.PM.name}</Select.Option>
                <Select.Option value={EPA_FEATURES.TEMP.code}>{EPA_FEATURES.TEMP.name}</Select.Option>
              </Select>
              </div>

              <div style={{marginBottom: '16px'}}>
                <Title level={4}>Year</Title>
                <Slider min={0} max={YEARS.length-1}  defaultValue={YEARS.length-1} marks={yearMarks} step={1} included={false}
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
}

Slide.footerText = 'Relevant EPA measurement sites, colored by the CBSA they belong in'

export default Slide;
