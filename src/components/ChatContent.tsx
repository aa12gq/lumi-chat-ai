import React, { useState, useRef } from "react";
import { Layout, Avatar, Flex, Space } from "antd";
import {
  UserOutlined,
  RobotOutlined,
  CodeOutlined,
  FileSearchOutlined,
  EditOutlined,
  CheckCircleOutlined,
  LoadingOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Sender, Welcome, Prompts, ThoughtChain } from "@ant-design/x";
import type { PromptsProps, ThoughtChainItem } from "@ant-design/x";

const { Content } = Layout;

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: number;
}

const suggestionItems: PromptsProps["items"] = [
  {
    key: "coding",
    label: (
      <Space align="start">
        <CodeOutlined style={{ color: "#1677ff" }} />
        <span>代码开发</span>
      </Space>
    ),
    description: "编写、优化和调试代码",
    children: [
      {
        key: "coding-react",
        description: "帮我编写一个 React 组件",
      },
      {
        key: "coding-debug",
        description: "帮我找出代码中的 bug",
      },
      {
        key: "coding-optimize",
        description: "如何优化代码性能",
      },
    ],
  },
  {
    key: "analysis",
    label: (
      <Space align="start">
        <FileSearchOutlined style={{ color: "#52c41a" }} />
        <span>数据分析</span>
      </Space>
    ),
    description: "数据处理与可视化",
    children: [
      {
        key: "analysis-data",
        description: "分析这组数据的趋势",
      },
      {
        key: "analysis-chart",
        description: "生成数据可视化图表",
      },
      {
        key: "analysis-insight",
        description: "提供数据洞察建议",
      },
    ],
  },
  {
    key: "writing",
    label: (
      <Space align="start">
        <EditOutlined style={{ color: "#722ed1" }} />
        <span>文案创作</span>
      </Space>
    ),
    description: "创作各类文字内容",
    children: [
      {
        key: "writing-article",
        description: "写一篇技术博客",
      },
      {
        key: "writing-doc",
        description: "生成项目文档",
      },
      {
        key: "writing-readme",
        description: "编写 README 文件",
      },
    ],
  },
];

function getStatusIcon(status: ThoughtChainItem["status"]) {
  switch (status) {
    case "success":
      return <CheckCircleOutlined style={{ color: "#52c41a" }} />;
    case "error":
      return <InfoCircleOutlined style={{ color: "#ff4d4f" }} />;
    case "pending":
      return <LoadingOutlined style={{ color: "#1677ff" }} />;
    default:
      return undefined;
  }
}

const ChatContent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [thoughts, setThoughts] = useState<ThoughtChainItem[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (content: string) => {
    if (!content.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: Date.now(),
    };

    setMessages([...messages, newMessage]);
    setInputValue("");
    setLoading(true);

    // 模拟 AI 思考过程
    const thoughtProcess: ThoughtChainItem[] = [
      {
        title: "理解用户意图",
        description: "分析用户输入，确定问题类型",
        status: "pending",
        icon: getStatusIcon("pending"),
      },
      {
        title: "检索相关信息",
        description: "从知识库中搜索相关内容",
        status: "pending",
        icon: getStatusIcon("pending"),
      },
      {
        title: "生成回答",
        description: "组织语言，生成合适的回复",
        status: "pending",
        icon: getStatusIcon("pending"),
      },
    ];

    setThoughts(thoughtProcess);

    // 模拟思考过程
    for (let i = 0; i < thoughtProcess.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      thoughtProcess[i].status = "success" as ThoughtChainItem["status"];
      thoughtProcess[i].icon = getStatusIcon("success");
      setThoughts([...thoughtProcess]);
    }

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `这是对 "${content}" 的回复`,
        role: "assistant",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setLoading(false);
      setThoughts([]);
    }, 1000);
  };

  const handlePromptClick = (info: {
    data: NonNullable<PromptsProps["items"]>[number];
  }) => {
    const promptMap: Record<string, string> = {
      "coding-react": "请帮我编写一个简单的 React 组件，实现一个计数器功能",
      "coding-debug": "我的代码出现了问题，请帮我找出 bug",
      "coding-optimize": "请帮我优化这段代码的性能",
      "analysis-data": "请帮我分析这组数据的趋势和特点",
      "analysis-chart": "请根据这些数据生成一个图表",
      "analysis-insight": "请对这些数据提供一些洞察和建议",
      "writing-article": "请帮我写一篇关于 React 性能优化的技术博客",
      "writing-doc": "请帮我生成项目文档",
      "writing-readme": "请帮我编写一个项目的 README 文件",
    };

    if (promptMap[info.data.key as string]) {
      handleSubmit(promptMap[info.data.key as string]);
    }
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Layout style={{ height: "100%", background: "#fff" }}>
      <Content
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            flex: 1,
            padding: "24px",
            paddingLeft: "max(24px, 5%)",
            paddingRight: "max(24px, 5%)",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {messages.length === 0 ? (
            <Flex
              vertical
              gap="large"
              style={{
                maxWidth: "800px",
                width: "100%",
                margin: "0 auto",
                padding: "0 16px",
              }}
            >
              <Welcome
                style={{
                  backgroundImage:
                    "linear-gradient(97deg, #f2f9fe 0%, #f7f3ff 100%)",
                  borderRadius: "8px",
                  width: "100%",
                }}
                icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
                title="欢迎使用 AI 助手"
                description="我是你的智能助手，可以帮你回答问题、编写代码、分析数据等。让我们开始对话吧！"
              />
              <Flex vertical gap="middle" style={{ width: "100%" }}>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "16px",
                    color: "rgba(0, 0, 0, 0.88)",
                  }}
                >
                  我可以帮您：
                </h2>
                <Prompts
                  items={suggestionItems}
                  onItemClick={handlePromptClick}
                  wrap
                  styles={{
                    item: {
                      flex: "none",
                      width: "calc(33.33% - 8px)",
                      backgroundImage:
                        "linear-gradient(137deg, #e5f4ff 0%, #efe7ff 100%)",
                      border: 0,
                    },
                    subItem: {
                      background: "rgba(255,255,255,0.45)",
                      border: "1px solid #FFF",
                    },
                  }}
                />
              </Flex>
            </Flex>
          ) : (
            <Flex
              vertical
              gap="16px"
              style={{
                maxWidth: "800px",
                width: "100%",
                margin: "0 auto",
                padding: "0 16px",
              }}
            >
              {messages.map((message) => (
                <Flex
                  key={message.id}
                  justify={message.role === "user" ? "flex-end" : "flex-start"}
                  align="start"
                  gap="middle"
                  style={{ width: "100%" }}
                >
                  {message.role === "assistant" && (
                    <Avatar
                      icon={<RobotOutlined />}
                      style={{ backgroundColor: "#87d068", flexShrink: 0 }}
                    />
                  )}
                  <div
                    style={{
                      padding: "12px 16px",
                      background:
                        message.role === "user" ? "#1677ff" : "#f0f0f0",
                      borderRadius: "12px",
                      maxWidth: "80%",
                      color: message.role === "user" ? "#fff" : "#000",
                      wordBreak: "break-word",
                    }}
                  >
                    {message.content}
                  </div>
                  {message.role === "user" && (
                    <Avatar
                      icon={<UserOutlined />}
                      style={{ backgroundColor: "#1677ff", flexShrink: 0 }}
                    />
                  )}
                </Flex>
              ))}
            </Flex>
          )}
          <div ref={messagesEndRef} />

          {thoughts.length > 0 && (
            <div style={{ maxWidth: "800px", width: "100%", margin: "0 auto" }}>
              <ThoughtChain
                items={thoughts}
                size="small"
                styles={{
                  item: {
                    background: "rgba(0, 0, 0, 0.02)",
                    border: "1px solid #f0f0f0",
                    borderRadius: "8px",
                  },
                }}
              />
            </div>
          )}
        </div>

        <div
          style={{
            borderTop: "1px solid #f0f0f0",
            padding: "16px",
            paddingLeft: "max(16px, 5%)",
            paddingRight: "max(16px, 5%)",
            background: "#fff",
          }}
        >
          <div
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              width: "100%",
              padding: "0 16px",
            }}
          >
            <Sender
              value={inputValue}
              onChange={setInputValue}
              loading={loading}
              onSubmit={handleSubmit}
              onCancel={() => setLoading(false)}
              allowSpeech
              submitType="enter"
              placeholder="输入消息..."
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default ChatContent;
