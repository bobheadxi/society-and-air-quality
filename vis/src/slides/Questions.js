import React from 'react';
import { Card, Row, Col, Typography, Avatar, Space } from 'antd';
import { QuestionOutlined } from '@ant-design/icons';

import SlideLayout from '../components/SlideLayout';

const { Title, Text } = Typography;

function Slide() {
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
  );
}

export default Slide;
