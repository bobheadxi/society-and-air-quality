import React from 'react';
import { Typography } from 'antd';

import SlideLayout from '../../components/SlideLayout';

const { Title } = Typography;

function Slide() {
  return (
    <SlideLayout>
      <Title>TODO</Title>
    </SlideLayout>
  );
}

Slide.footerText = 'TODO link to github';

export default Slide;
