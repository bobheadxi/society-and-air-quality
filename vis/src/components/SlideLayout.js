import React from 'react';
import { Layout } from 'antd';

function SlideLayout({ children, contentStyle={} }) {
  return (
    <Layout style={{minHeight:"100%"}}>
      <Layout.Content style={{padding:'48px', ...contentStyle}}>
        {children}
      </Layout.Content>
    </Layout>
  );
}

export default SlideLayout;
