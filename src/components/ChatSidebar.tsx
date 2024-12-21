import React, { useState, useEffect } from 'react';
import { Menu, Layout, message } from 'antd';
import { DeleteOutlined, EditOutlined, MessageOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

const { Sider } = Layout;

interface ChatItem {
  id: string;
  title: string;
  timestamp: number;
}

const ChatSidebar: React.FC<{ collapsed?: boolean }> = ({ collapsed }) => {
  const [conversations, setConversations] = useState<ChatItem[]>([]);

  useEffect(() => {
    const mockData = Array.from({ length: 5 }).map((_, index) => ({
      id: `chat-${index}`,
      title: `对话 ${index + 1}`,
      timestamp: Date.now() - index * 3600000,
    }));
    setConversations(mockData);
  }, []);

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    const [chatId, action] = e.key.split('-');
    if (action === 'edit') {
      message.info(`编辑对话: ${chatId}`);
    } else if (action === 'delete') {
      message.info(`删除对话: ${chatId}`);
    } else {
      console.log('选中的对话:', chatId);
    }
  };

  return (
    <Sider 
      width={280} 
      theme="light" 
      style={{ borderRight: '1px solid #f0f0f0' }}
      breakpoint="lg"
      collapsedWidth="0"
      collapsed={collapsed}
    >
      <div style={{ 
        padding: '16px',
        borderBottom: '1px solid #f0f0f0',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <img 
          src="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp" 
          alt="Logo"
          style={{ width: '32px', height: '32px' }}
        />
        <h1 style={{ 
          margin: 0,
          fontSize: '18px',
          fontWeight: 600,
          color: 'rgba(0, 0, 0, 0.88)'
        }}>
          AI 助手
        </h1>
      </div>

      <Menu
        mode="inline"
        items={conversations.map((chat) => ({
          key: chat.id,
          label: chat.title,
          icon: <MessageOutlined />,
          children: [
            {
              key: `${chat.id}-edit`,
              label: '编辑',
              icon: <EditOutlined />,
            },
            {
              key: `${chat.id}-delete`,
              label: '删除',
              icon: <DeleteOutlined />,
              danger: true,
            },
          ],
        }))}
        onClick={handleMenuClick}
        style={{ height: 'calc(100vh - 65px)', borderRight: 0 }}
      />
    </Sider>
  );
};

export default ChatSidebar; 