import React, { ReactElement } from 'react';
import { useNavigate } from "react-router-dom";
import {Input,Button, message} from "antd"
import {requestRegister} from "../../services/login"

const Register:React.FC = ():ReactElement => {
    const [username, setUsername] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    
    const register = ():void =>{
        requestRegister(username, password,email).then(res=>{
            if(res.code === 200){
                messageApi.success('注册成功')
            }else{
                messageApi.error('注册失败')
            }
        })
    }
    const toLogin = ():void =>{
        navigate('/login')
    }
    return (
        <div>
            {contextHolder}
            <h1>Register</h1>
            <div>
                <Input value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='请输入账户'></Input>
            </div>
            <br />
            <div>
                <Input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='请输入密码' type='password'></Input>
            </div>
            <br />
            <div>
                <Input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='请输入邮箱' type='email'></Input>
            </div>
            <br />
            <div style={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <Button type='primary' onClick={register}>注册</Button>
                <Button type='primary' onClick={toLogin}>登录</Button>
            </div>
            
        </div>
    );
};

export default Register;