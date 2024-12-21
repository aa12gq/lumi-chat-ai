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
import { useLanguage } from "../contexts/LanguageContext";

const { Content } = Layout;

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: number;
}

interface ChatContentProps {
  isDarkMode?: boolean;
}

const ChatContent: React.FC<ChatContentProps> = ({ isDarkMode }) => {
  const { messages: i18n } = useLanguage();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
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

    setChatMessages([...chatMessages, newMessage]);
    setInputValue("");
    setLoading(true);

    // 模拟 AI 思考过程
    const thoughtProcess: ThoughtChainItem[] = [
      {
        title: i18n.thoughts.understanding,
        description: i18n.thoughts.understandingDesc,
        status: "pending",
        icon: getStatusIcon("pending"),
      },
      {
        title: i18n.thoughts.searching,
        description: i18n.thoughts.searchingDesc,
        status: "pending",
        icon: getStatusIcon("pending"),
      },
      {
        title: i18n.thoughts.generating,
        description: i18n.thoughts.generatingDesc,
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
      setChatMessages((prev) => [...prev, aiResponse]);
      setLoading(false);
      setThoughts([]);
    }, 1000);
  };

  const handlePromptClick = (info: {
    data: NonNullable<PromptsProps["items"]>[number];
  }) => {
    const promptMap: Record<string, string> = {
      "coding-react": i18n.suggestions.coding.react,
      "coding-debug": i18n.suggestions.coding.debug,
      "coding-optimize": i18n.suggestions.coding.optimize,
      "analysis-data": i18n.suggestions.analysis.data,
      "analysis-chart": i18n.suggestions.analysis.chart,
      "analysis-insight": i18n.suggestions.analysis.insight,
      "writing-article": i18n.suggestions.writing.article,
      "writing-doc": i18n.suggestions.writing.doc,
      "writing-readme": i18n.suggestions.writing.readme,
    };

    if (promptMap[info.data.key as string]) {
      handleSubmit(promptMap[info.data.key as string]);
    }
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const suggestionItems: PromptsProps["items"] = [
    {
      key: "coding",
      label: (
        <Space align="start">
          <CodeOutlined style={{ color: "#1677ff" }} />
          <span>{i18n.suggestions.coding.title}</span>
        </Space>
      ),
      description: i18n.suggestions.coding.description,
      children: [
        {
          key: "coding-react",
          description: i18n.suggestions.coding.react,
        },
        {
          key: "coding-debug",
          description: i18n.suggestions.coding.debug,
        },
        {
          key: "coding-optimize",
          description: i18n.suggestions.coding.optimize,
        },
      ],
    },
    {
      key: "analysis",
      label: (
        <Space align="start">
          <FileSearchOutlined style={{ color: "#52c41a" }} />
          <span>{i18n.suggestions.analysis.title}</span>
        </Space>
      ),
      description: i18n.suggestions.analysis.description,
      children: [
        {
          key: "analysis-data",
          description: i18n.suggestions.analysis.data,
        },
        {
          key: "analysis-chart",
          description: i18n.suggestions.analysis.chart,
        },
        {
          key: "analysis-insight",
          description: i18n.suggestions.analysis.insight,
        },
      ],
    },
    {
      key: "writing",
      label: (
        <Space align="start">
          <EditOutlined style={{ color: "#722ed1" }} />
          <span>{i18n.suggestions.writing.title}</span>
        </Space>
      ),
      description: i18n.suggestions.writing.description,
      children: [
        {
          key: "writing-article",
          description: i18n.suggestions.writing.article,
        },
        {
          key: "writing-doc",
          description: i18n.suggestions.writing.doc,
        },
        {
          key: "writing-readme",
          description: i18n.suggestions.writing.readme,
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

  return (
    <Layout
      style={{
        height: "100%",
        background: isDarkMode ? "#141414" : "#fff",
      }}
    >
      <Content
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: isDarkMode ? "#141414" : "#fff",
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
            background: isDarkMode ? "#141414" : "#fff",
          }}
        >
          {chatMessages.length === 0 ? (
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
                  backgroundImage: isDarkMode
                    ? "linear-gradient(97deg, #141414 0%, #1f1f1f 100%)"
                    : "linear-gradient(97deg, #f2f9fe 0%, #f7f3ff 100%)",
                  borderRadius: "8px",
                  width: "100%",
                }}
                icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
                title={i18n.welcome.title}
                description={i18n.welcome.description}
              />
              <Flex vertical gap="middle" style={{ width: "100%" }}>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "16px",
                    color: isDarkMode ? "#ffffff" : "rgba(0, 0, 0, 0.88)",
                  }}
                >
                  {i18n.welcome.help}
                </h2>
                <Prompts
                  items={suggestionItems}
                  onItemClick={handlePromptClick}
                  wrap
                  styles={{
                    item: {
                      flex: "none",
                      width: "calc(33.33% - 8px)",
                      backgroundImage: isDarkMode
                        ? "linear-gradient(137deg, #1f1f1f 0%, #141414 100%)"
                        : "linear-gradient(137deg, #e5f4ff 0%, #efe7ff 100%)",
                      border: 0,
                      color: isDarkMode ? "#ffffff" : "inherit",
                    },
                    subItem: {
                      background: isDarkMode
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(255,255,255,0.45)",
                      border: isDarkMode
                        ? "1px solid #303030"
                        : "1px solid #FFF",
                      color: isDarkMode ? "#ffffff" : "inherit",
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
              {chatMessages.map((message) => (
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
                    background: isDarkMode
                      ? "rgba(255, 255, 255, 0.04)"
                      : "rgba(0, 0, 0, 0.02)",
                    border: `1px solid ${isDarkMode ? "#303030" : "#f0f0f0"}`,
                    borderRadius: "8px",
                    color: isDarkMode ? "#ffffff" : "inherit",
                  },
                }}
              />
            </div>
          )}
        </div>

        <div
          style={{
            borderTop: `1px solid ${isDarkMode ? "#303030" : "#f0f0f0"}`,
            padding: "16px",
            paddingLeft: "max(16px, 5%)",
            paddingRight: "max(16px, 5%)",
            background: isDarkMode ? "#141414" : "#fff",
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
              placeholder={i18n.input.placeholder}
              style={{
                width: "100%",
                background: isDarkMode ? "#1f1f1f" : "#fff",
                color: isDarkMode ? "#ffffff" : "inherit",
              }}
            />
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default ChatContent;
