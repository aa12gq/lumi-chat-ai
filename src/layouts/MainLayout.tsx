import React, { useState } from 'react';
import { Layout, Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import ChatSidebar from '../components/ChatSidebar';
import ChatContent from '../components/ChatContent';

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ height: '100vh' }}>
      <ChatSidebar collapsed={collapsed} />
      <Layout>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            position: 'fixed',
            left: collapsed ? 0 : 280,
            top: 16,
            zIndex: 100,
            transition: 'all 0.2s',
          }}
        />
        <ChatContent />
      </Layout>
    </Layout>
  );
};

export default MainLayout; 