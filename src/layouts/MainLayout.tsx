import React from 'react';
import { Layout, Select, Switch, Space, Typography, ConfigProvider, theme } from 'antd';
import { TranslationOutlined, SunOutlined, MoonOutlined } from '@ant-design/icons';
import ChatSidebar from '../components/ChatSidebar';
import ChatContent from '../components/ChatContent';

const { Header, Content } = Layout;
const { Title } = Typography;
const { defaultAlgorithm, darkAlgorithm } = theme;

interface ModelOption {
  value: string;
  label: string;
}

const modelOptions: ModelOption[] = [
  { value: 'gpt-4', label: 'GPT-4' },
  { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
  { value: 'claude-3-opus', label: 'Claude 3 Opus' },
  { value: 'claude-3-sonnet', label: 'Claude 3 Sonnet' },
];

export function MainLayout() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isEnglish, setIsEnglish] = React.useState(false);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        token: {
          // 可以在这里自定义主题色等
          colorBgContainer: isDarkMode ? '#141414' : '#ffffff',
        },
      }}
    >
      <Layout style={{ 
        background: isDarkMode ? '#141414' : '#ffffff'
      }}>
        <ChatSidebar isDarkMode={isDarkMode} />
        <Layout>
          <Header style={{ 
            background: isDarkMode ? '#141414' : '#ffffff', 
            height: '64px',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: `1px solid ${isDarkMode ? '#303030' : '#f0f0f0'}`,
            position: 'fixed',
            right: 0,
            left: 280,
            zIndex: 1000
          }}>
            <Title level={4} style={{ 
              margin: 0,
              color: isDarkMode ? '#ffffff' : 'rgba(0, 0, 0, 0.88)'
            }}>
              AI 助手
            </Title>
            
            <Space size="large">
              <Select
                defaultValue="gpt-3.5-turbo"
                style={{ width: 200 }}
                options={modelOptions}
                onChange={(value) => {
                  console.log('Selected model:', value);
                }}
              />
              
              <Switch
                checkedChildren={<MoonOutlined />}
                unCheckedChildren={<SunOutlined />}
                checked={isDarkMode}
                onChange={(checked) => {
                  setIsDarkMode(checked);
                  // 可以将主题状态保存到 localStorage
                  localStorage.setItem('theme', checked ? 'dark' : 'light');
                }}
              />
              
              <Switch
                checkedChildren="EN"
                unCheckedChildren="中"
                checked={isEnglish}
                onChange={setIsEnglish}
              />
            </Space>
          </Header>
          <Content style={{ 
            marginTop: 64,
            height: 'calc(100vh - 64px)',
            overflow: 'auto',
            background: isDarkMode ? '#141414' : '#ffffff'
          }}>
            <ChatContent isDarkMode={isDarkMode} />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default MainLayout; 