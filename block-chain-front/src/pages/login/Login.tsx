import React, { ReactElement } from 'react';
import { useNavigate } from "react-router-dom";
import {Input,Button} from "antd"

const Login:React.FC = ():ReactElement => {
    const navigate = useNavigate();
    const submit = ():void =>{
        console.log('submit')
        fetch('http://localhost:3000/api/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: 'admin',
                password: '123456'
            })
        }).then(res => res.json()).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);   
        })
    }
    const toRegister = ():void =>{
        navigate('/register')
    }
    return (
        <div>
            <h1>Login</h1>
            <div>
                <Input placeholder='请输入账户'></Input>
            </div>
            <br />
            <div>
                <Input placeholder='请输入密码' type='password'></Input>
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
    );
};

export default Login