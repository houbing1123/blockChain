import {
    Bubble,
    Conversations,
    Prompts,
    Sender,
    Welcome,
    useXAgent,
    useXChat,
  } from '@ant-design/x';
  import { createStyles } from 'antd-style';
  import React, { useEffect } from 'react';
  import {
    CommentOutlined,
    FireOutlined,
    HeartOutlined,
    PlusOutlined,
    ReadOutlined,
    SmileOutlined,
  } from '@ant-design/icons';
  import { Button, type GetProp, Space } from 'antd';
  
  const renderTitle = (icon: React.ReactElement, title: string) => (
    <Space align="start">
      {icon}
      <span>{title}</span>
    </Space>
  );
  
  const defaultConversationsItems:any[] = [
    {
      key: '0',
      label: '什么是区块链?',
    },
  ];
  
  const useStyle = createStyles(({ token, css }) => {
    return {
      layout: css`
        width: 100%;
        min-width: 1000px;
        height: 722px;
        border-radius: ${token.borderRadius}px;
        display: flex;
        background: ${token.colorBgContainer};
        font-family: AlibabaPuHuiTi, ${token.fontFamily}, sans-serif;
  
        .ant-prompts {
          color: ${token.colorText};
        }
      `,
      menu: css`
        background: ${token.colorBgLayout}80;
        width: 280px;
        height: 100%;
        display: flex;
        flex-direction: column;
      `,
      conversations: css`
        padding: 0 12px;
        flex: 1;
        overflow-y: auto;
      `,
      chat: css`
        height: 100%;
        width: 100%;
        max-width: 700px;
        margin: 0 auto;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        padding: ${token.paddingLG}px;
        gap: 16px;
      `,
      messages: css`
        flex: 1;
      `,
      placeholder: css`
        padding-top: 32px;
      `,
      sender: css`
        box-shadow: ${token.boxShadow};
      `,
      logo: css`
        display: flex;
        height: 72px;
        align-items: center;
        justify-content: start;
        padding: 0 24px;
        box-sizing: border-box;
  
        img {
          width: 24px;
          height: 24px;
          display: inline-block;
        }
  
        span {
          display: inline-block;
          margin: 0 8px;
          font-weight: bold;
          color: ${token.colorText};
          font-size: 16px;
        }
      `,
      addBtn: css`
        background: #1677ff0f;
        border: 1px solid #1677ff34;
        width: calc(100% - 24px);
        margin: 0 12px 24px 12px;
      `,
    };
  });
  
  const placeholderPromptsItems: GetProp<typeof Prompts, 'items'> = [
    {
      key: '1',
      label: renderTitle(<FireOutlined style={{ color: '#FF4D4F' }} />, '什么是区块链？'),
      description: '从哪里开始?',
      children: [
        {
          key: '1-1',
          description: `钱包是什么?`,
        },
        {
          key: '1-2',
          description: `私钥是什么?`,
        },
        {
          key: '1-3',
          description: `有什么作用?`,
        },
      ],
    },
    {
      key: '2',
      label: renderTitle(<ReadOutlined style={{ color: '#1890FF' }} />, '以太坊是什么？'),
      description: '开始学习?',
      children: [
        {
          key: '2-1',
          icon: <HeartOutlined />,
          description: `比特币？`,
        },
        {
          key: '2-2',
          icon: <SmileOutlined />,
          description: `虚拟货币？`,
        },
        {
          key: '2-3',
          icon: <CommentOutlined />,
          description: `如何交易`,
        },
      ],
    },
  ];
  
  const senderPromptsItems: GetProp<typeof Prompts, 'items'> = [
    {
      key: '1',
      description: '从区块链开始?',
      icon: <FireOutlined style={{ color: '#FF4D4F' }} />,
    },
    {
      key: '2',
      description: '了解ether以太坊?',
      icon: <ReadOutlined style={{ color: '#1890FF' }} />,
    },
  ];
  
  const roles: GetProp<typeof Bubble.List, 'roles'> = {
    ai: {
      placement: 'start',
      typing: { step: 5, interval: 20 },
      styles: {
        content: {
          borderRadius: 16,
        },
      },
    },
    local: {
      placement: 'end',
      variant: 'shadow',
    },
  };
  
  const Konwledge: React.FC = () => {
    const { styles } = useStyle();
  
    const [content, setContent] = React.useState('');
    const [conversationsItems, setConversationsItems] = React.useState(defaultConversationsItems);
    const [activeKey, setActiveKey] = React.useState(defaultConversationsItems[0]?.key);

  
    // ==================== Runtime ====================
    const [agent] = useXAgent({
      request: async ({ message }, { onSuccess }) => {
        const response = await fetch("/ai/api/generate", {
          method: 'POST',
          
          body: JSON.stringify({
            model: "deepseek-R1",
            prompt: message,
          }),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const Text = new TextDecoder()
        let text = ''
        
        const reader = response.body?.getReader();
        if (!reader) return;

        while (true) {
          const {done, value} = await reader.read();
          if(done) break;
          const red = Text.decode(value);

          try{
            const data = JSON.parse(red);
            text = text + data.response
            console.log(text);
          }catch(e){
            console.log('error', e);
            console.log('red', red);  
          }   
        }
        text = text.replace('<think>', '<div class="think">思考中...<div class="think-content">');
        text = text.replace('</think>', '</div></div>');
        onSuccess(text);
       
      
        
      },
    });
  
    const { onRequest, messages, setMessages } = useXChat({
      agent,
    });
  
    useEffect(() => {
      if (activeKey !== undefined) {
        setMessages([]);
      }
    }, [activeKey]);
  
    // ==================== Event ====================
    const onSubmit = (nextContent: string) => {
      if (!nextContent) return;
      onRequest(nextContent);
      setContent('');
    };
  
    const onPromptsItemClick: GetProp<typeof Prompts, 'onItemClick'> = (info) => {
      onRequest(info.data.description as string);
    };
  
    const onAddConversation = () => {
      setConversationsItems([
        ...conversationsItems,
        {
          key: `${conversationsItems.length}`,
          label: `new conversation ${conversationsItems.length}`,
        },
      ]);
      setActiveKey(`${conversationsItems.length}`);
    };
  
    const onConversationClick: GetProp<typeof Conversations, 'onActiveChange'> = (key) => {
      setActiveKey(key);
    };
  
    // ==================== Node ====================
    const placeholderNode = (
      <Space direction="vertical" size={16} className={styles.placeholder}>
        <Welcome
          variant="borderless"
          icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
          title="Hello, 我是SeeMountain"
          description="从这里来开始学习web3的相关知识吧"
        />
        <Prompts
          title="你想了解什么?"
          items={placeholderPromptsItems}
          styles={{
            list: {
              width: '100%',
            },
            item: {
              flex: 1,
            },
          }}
          onItemClick={onPromptsItemClick}
        />
      </Space>
    );
  
    const items: GetProp<typeof Bubble.List, 'items'> = messages.map(({ id, message, status }) => ({
      key: id,
      loading: status === 'loading',
      role: status === 'local' ? 'local' : 'ai',
      content: message,
      messageRender: (message) => { 
        return (
          <div
            dangerouslySetInnerHTML={{ __html: message }}
          />
        );
      }
    }));
  
    
  
    
  
    const logoNode = (
      <div className={styles.logo}>
        <span>SeeMountain的web3学习网站</span>
      </div>
    );
  
    // ==================== Render =================
    return (
      <div className={styles.layout}>
        <div className={styles.menu}>
          {/* 🌟 Logo */}
          {logoNode}
          {/* 🌟 添加会话 */}
          <Button
            onClick={onAddConversation}
            type="link"
            className={styles.addBtn}
            icon={<PlusOutlined />}
          >
            创建新会话
          </Button>
          {/* 🌟 会话管理 */}
          <Conversations
            items={conversationsItems}
            className={styles.conversations}
            activeKey={activeKey}
            onActiveChange={onConversationClick}
          />
        </div>
        <div className={styles.chat}>
          {/* 🌟 消息列表 */}
          <Bubble.List
            items={items.length > 0 ? items : [{ content: placeholderNode, variant: 'borderless' }]}
            roles={roles}
            className={styles.messages}
          />
          {/* 🌟 提示词 */}
          <Prompts items={senderPromptsItems} onItemClick={onPromptsItemClick} />
          {/* 🌟 输入框 */}
          <Sender
            value={content}
            onSubmit={onSubmit}
            onChange={setContent}
            loading={agent.isRequesting()}
            className={styles.sender}
          />
        </div>
      </div>
    );
  };
  
  export default Konwledge;