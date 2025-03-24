import React, { ReactElement } from 'react';
import {Input,Button} from "antd"

const Login:React.FC = ():ReactElement => {
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
            <div>
                <Button type='primary' onClick={submit}>登录</Button>
            </div>
            
        </div>
    );
};

export default Login