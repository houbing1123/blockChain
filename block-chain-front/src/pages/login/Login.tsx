import React, { ReactElement } from 'react';
import { useNavigate } from "react-router-dom";
import {Input,Button,message} from "antd"
import {requestLogin} from "../../services/login"
import { setLocal } from '../../utils';

const Login:React.FC = ():ReactElement => {
    const [username, setUsername] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const submit = async() =>{
        console.log('submit')
        const login = await requestLogin(username, password);
        console.log(login);
        if(login.code === 200){
            messageApi.success('登录成功')
            setLocal('token', login.data.access_token)
            setLocal('user', login.data.user)
            navigate('/konwledge')
        }else{
            messageApi.error(`登录失败:${login.message}`)
        }
         
    }
    const toRegister = ():void =>{
        navigate('/register')
    }
    return (
        <div className='w100 h100 flex-c-c'>
            {contextHolder}
           <div>
           <h1>Login</h1>
            <div>
                <Input placeholder='请输入账户' value={username} onChange={(e)=>setUsername(e.target.value)}></Input>
            </div>
            <br />
            <div>
                <Input placeholder='请输入密码' type='password' value={password} onChange={(e)=>setPassword(e.target.value)}></Input>
            </div>
            <br />
            <div style={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <Button type='primary' onClick={submit}>登录</Button>
                <Button type='primary' onClick={toRegister}>注册</Button>
            </div>
            
           </div>
        </div>
    );
};

export default Login