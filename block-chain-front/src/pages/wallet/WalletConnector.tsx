import { useState } from "react";
import { ethers } from "ethers";
import { EthereumWallet } from "../../core/createWallet";
import { Button, Card, message, Space, Tag, Input, Modal, Form, } from "antd";

export default function WalletConnector() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const [wallet] = useState(new EthereumWallet());
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendAmount, setSendAmount] = useState("0.01");
  const [recipient, setRecipient] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [transactionActive, setTransactionActive] = useState(false);
  const [balanceActive, setBalanceActive] = useState(false);
  const [newWallet, setNewWallet] = useState<Wallet>({
    address: "",
    privateKey: "",
    mnemonic: "",
  });
  const [localBalance, setLocalBalance] = useState("");

  //弹窗开关
  const showModal = (key: string, value: boolean) => {
    switch (key) {
      case "transaction":
        setTransactionActive(value);
        break;
      case "wallet":
        setIsModalOpen(value);
        break;
      case "balance":
        setBalanceActive(value);
        break;
      default:
    }
  };

  function downloadFile(
    data: { [key: string]: any },
    filename = "wallet.json"
  ) {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
  }

  const connectWallet = async () => {
    try {
      setLoading(true);
      const addr = await wallet.connectBrowserWallet();
      setAddress(addr);
      setActive(true);
      // 连接成功后获取余额
      await updateBalance();
      messageApi.success("钱包连接成功");
    } catch (err: any) {
      messageApi.error(`连接失败: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const updateBalance = async () => {
    if (!address) return;
    const bal = await wallet.getBalance();
    setBalance(ethers.formatEther(bal));
  };

  const createNewWallet = async () => {
    const newWallet: any = await EthereumWallet.createRandomWallet();
    setNewWallet({ ...newWallet });
    showModal("wallet", true);
  };

  const sendTransaction = async () => {
    try {
      setLoading(true);
      const txHash = await wallet.sendETH(recipient, sendAmount);
      messageApi.success(
        <a
          href={`https://etherscan.io/tx/${txHash}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          交易已发送，点击查看
        </a>
      );
      await updateBalance();
    } catch (err: any) {
      messageApi.error(`发送失败: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  const handleSend = async () => {
    try {
      const values = await form.validateFields();
      const { toAddress, amount,privateKey } = values;

      if (!ethers.isAddress(toAddress)) {
        messageApi.error("请输入合法的钱包地址");
        return;
      }

      setLoading(true);

      const provider = new ethers.JsonRpcProvider("https://goerli.infura.io/v3/7963eb5ee08f4387a9d5ecabd222c0db");
      const wallet = new ethers.Wallet(privateKey, provider);

      const tx = await wallet.sendTransaction({
        to: toAddress,
        value: ethers.parseEther(amount),
      });

      messageApi.info("交易发送中: " + tx.hash);
      await tx.wait();
      messageApi.success("✅ 交易成功!");

      form.resetFields();
      showModal("transaction", false);
    } catch (err: any) {
      console.error(err);
      messageApi.error("❌ 转账失败: " + (err.message || "未知错误"));
    } finally {
      setLoading(false);
    }
  };
  const localWalletBalance =  async() => {
    if(!newWallet.address) {
      messageApi.error("请先创建钱包");
      return;
    }
     // 连接到以太坊节点（可以连接到本地节点或Infura等服务）
     const provider = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/7963eb5ee08f4387a9d5ecabd222c0db'); // 你可以使用 Infura 或 Alchemy 等提供商
     const balance = await provider.getBalance(newWallet.address);
     // 获取余额  
     const formattedBalance = ethers.formatEther(balance);
     setLocalBalance(formattedBalance);
     showModal("balance", true);
   
  }

  return (
    <div className="w100 h100 flex-c-c">
      {contextHolder}
      <Card title="以太坊钱包" style={{ width: 500 }}>
        <Space direction="vertical" style={{ width: "100%" }}>
          {active ? (
            <>
              <div>
                <Tag color="green">已连接</Tag>
                <span>{address}</span>
              </div>
              <div>
                <Tag color="blue">余额</Tag>
                <span>{balance} ETH</span>
                <Button size="small" onClick={updateBalance}>
                  刷新
                </Button>
              </div>

              <Input
                placeholder="接收地址"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
              <Input
                placeholder="金额 (ETH)"
                value={sendAmount}
                onChange={(e) => setSendAmount(e.target.value)}
              />
              <Button
                type="primary"
                onClick={sendTransaction}
                loading={loading}
                disabled={!recipient || !sendAmount}
              >
                发送ETH
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  setActive(false);
                  setAddress("");
                  setBalance("");
                }}
              >
                返回
              </Button>
            </>
          ) : (
            <>
              <Button type="primary" onClick={connectWallet} loading={loading}>
                连接MetaMask钱包
              </Button>
              <Button danger onClick={createNewWallet}>
                创建新钱包(演示)
              </Button>
              <Button type="primary" onClick={() => showModal("transaction", true)}>
                发起交易
              </Button>
              <Button type="primary" onClick={localWalletBalance}>
                查看余额
              </Button>
            </>
          )}
        </Space>
      </Card>
      {/* 钱包信息 */}
      <Modal
        title="Wallet Info"
        width={1000}
        open={isModalOpen}
        onOk={() => showModal("wallet", false)}
        onCancel={() => showModal("wallet", false)}
      >
        <div>
          <p>新钱包已创建(仅作演示，实际项目不应在前端生成私钥)</p>
          <br />
          <p>地址: {newWallet.address}</p>
          <br />
          <p>助记词: {newWallet.mnemonic}</p>
          <br />
          <div>注：web不会保存钱包信息，请保存到本地之后，在关闭窗口</div>
          <div className="flex-c-c">
            <Button type="primary" onClick={() => downloadFile(newWallet)}>
              保存至本地
            </Button>
          </div>
        </div>
      </Modal>
      {/* 交易信息 */}
      <Modal
        title="transaction"
        width={1000}
        open={transactionActive}
        onOk={handleSend}
        onCancel={() => showModal("transaction", false)}
        loading={loading}
      >
         <Form form={form} layout="vertical">
        <Form.Item
          label="Address"
          name="toAddress"
          rules={[{ required: true, message: "please input address" }]}
        >
          <Input placeholder="0x..." />
        </Form.Item>
        <Form.Item
          label="ETH"
          name="amount"
          rules={[{ required: true, message: "please input ETH" }]}
        >
          <Input placeholder="0.01" />
        </Form.Item>
        <Form.Item
          label="privateKey"
          name="privateKey"
          rules={[{ required: true, message: "please input privateKey" }]}
        >
          <Input placeholder="0x" />
        </Form.Item>
      </Form>
      </Modal>
        {/* 查看余额 */}
        <Modal
        title="balance"
        width={800}
        open={balanceActive}
        onOk={() => showModal("balance", false)}
        onCancel={() => showModal("balance", false)}
        loading={loading}
      >
        <div>余额:{localBalance}</div>
      </Modal>
    </div>
  );
}
