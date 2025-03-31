import { useState } from 'react'
import { ethers } from 'ethers'
import { EthereumWallet } from '../../core/createWallet'
import { Button, Card, message, Space, Tag, Input,Modal } from 'antd'



export default function WalletConnector() {
  const [wallet] = useState(new EthereumWallet())
  const [address, setAddress] = useState('')
  const [balance, setBalance] = useState('')
  const [loading, setLoading] = useState(false)
  const [sendAmount, setSendAmount] = useState('0.01')
  const [recipient, setRecipient] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWallet,setNewWallet] = useState<Wallet>({address:'',privateKey:'',mnemonic:''})
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const connectWallet = async () => {
    try {
      setLoading(true)
      const addr = await wallet.connectBrowserWallet()
      setAddress(addr)
      await updateBalance()
      message.success('钱包连接成功')
    } catch (err: any) {
      message.error(`连接失败: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const updateBalance = async () => {
    if (!address) return
    const bal = await wallet.getBalance()
    setBalance(ethers.formatEther(bal))
  }

  const createNewWallet = async() => {
    const newWallet:WalletResponse = await EthereumWallet.createRandomWallet()
    
    setNewWallet({...newWallet.data})
    showModal();

  }

  const sendTransaction = async () => {
    try {
      setLoading(true)
      const txHash = await wallet.sendETH(recipient, sendAmount)
      message.success(
        <a 
          href={`https://etherscan.io/tx/${txHash}`} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          交易已发送，点击查看
        </a>
      )
      await updateBalance()
    } catch (err: any) {
      message.error(`发送失败: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    <Card title="以太坊钱包" style={{ width: 500 }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        {address ? (
          <>
            <div>
              <Tag color="green">已连接</Tag>
              <span>{address}</span>
            </div>
            <div>
              <Tag color="blue">余额</Tag>
              <span>{balance} ETH</span>
              <Button size="small" onClick={updateBalance}>刷新</Button>
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
          </>
        ) : (
          <>
            <Button 
              type="primary" 
              onClick={connectWallet}
              loading={loading}
            >
              连接MetaMask钱包
            </Button>
            <Button 
              danger 
              onClick={createNewWallet}
            >
              创建新钱包(演示)
            </Button>
          </>
        )}
      </Space>
    </Card>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <div>
        <p>新钱包已创建(仅作演示，实际项目不应在前端生成私钥)</p>
        <p>地址: {newWallet.address}</p>
        <p>助记词: {newWallet.mnemonic}</p>
      </div>,
      </Modal>
    </>
    
  )
}