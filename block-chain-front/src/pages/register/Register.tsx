import React, { ReactElement } from 'react';
import { useNavigate } from "react-router-dom";
import {Input,Button} from "antd"

const Register:React.FC = ():ReactElement => {
    const [username, setUsername] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const navigate = useNavigate();
    const register = ():void =>{
        console.log('register')
        fetch('http://localhost:5170/auth/register',{
            method: 'POST',
            headers: {  'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then(res => res.json())
        .then(res => {
            if(res.code === 200){
                console.log('注册成功')
            }else{
                console.log('注册失败')
            }
        }).catch(err => {
            console.log(err)    
        })
    }
    const toLogin = ():void =>{
        navigate('/login')
    }
    return (
        <div>
            <h1>Register</h1>
            <div>
                <Input value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='请输入账户'></Input>
            </div>
            <br />
            <div>
                <Input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='请输入密码' type='password'></Input>
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