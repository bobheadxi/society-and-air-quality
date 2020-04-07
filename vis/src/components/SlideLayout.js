import React from 'react';
import { Layout } from 'antd';

function SlideLayout({ children }) {
  return (
    <Layout style={{minHeight:"100%", background:'transparent'}}>
      <Layout.Content style={{padding:'48px'}}>
        {children}
      </Layout.Content>
    </Layout>
  );
}

export default SlideLayout;
