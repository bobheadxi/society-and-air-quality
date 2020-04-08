import React from 'react';
import { Layout } from 'antd';

function SlideLayout({ children, footer }) {
  return (
    <Layout style={{height:"100%", background:'transparent'}}>
      <Layout.Content style={{height:"100%", padding:'48px'}}>
        {children}
      </Layout.Content>
      {footer ? <Layout.Footer style={{background:'transparent'}}>{footer}</Layout.Footer> : undefined}
    </Layout>
  );
}

export default SlideLayout;
