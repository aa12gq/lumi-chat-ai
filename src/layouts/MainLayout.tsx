import React from 'react';
import { Layout, Select, Space, Typography, ConfigProvider, theme } from 'antd';
import { TranslationOutlined, SunOutlined, MoonOutlined } from '@ant-design/icons';
import ChatSidebar from '../components/ChatSidebar';
import ChatContent from '../components/ChatContent';
import { LanguageProvider } from '../contexts/LanguageContext';
import { useLanguage } from '../contexts/LanguageContext';

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

const languageOptions = [
  { value: 'zh', label: '中文' },
  { value: 'en', label: 'English' }
];

export function MainLayout() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isEnglish, setIsEnglish] = React.useState(false);
  const { messages: i18n } = useLanguage();

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorBgContainer: isDarkMode ? '#141414' : '#ffffff',
        },
      }}
    >
      <LanguageProvider isEnglish={isEnglish}>
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
                {i18n.title}
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
                
                <div
                  style={{ 
                    cursor: 'pointer',
                    fontSize: '20px',
                    color: isDarkMode ? '#ffffff' : 'rgba(0, 0, 0, 0.85)'
                  }}
                  onClick={() => {
                    const checked = !isDarkMode;
                    setIsDarkMode(checked);
                    localStorage.setItem('theme', checked ? 'dark' : 'light');
                  }}
                >
                  {isDarkMode ? <MoonOutlined /> : <SunOutlined />}
                </div>
                
                <Select
                  value={isEnglish ? 'en' : 'zh'}
                  style={{ width: 100 }}
                  options={languageOptions}
                  onChange={(value) => setIsEnglish(value === 'en')}
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
      </LanguageProvider>
    </ConfigProvider>
  );
}

export default MainLayout; 