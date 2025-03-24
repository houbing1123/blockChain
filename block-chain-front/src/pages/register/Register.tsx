import React, { ReactElement } from 'react';
import {Input,Button} from "antd"

const Register:React.FC = ():ReactElement => {
    const register = ():void =>{
        console.log('register')
        fetch('http://localhost:3000/api/register')
    }
    return (
        <div>
            <h1>Register</h1>
            <div>
                <Input placeholder='请输入账户'></Input>
            </div>
            <br />
            <div>
                <Input placeholder='请输入密码' type='password'></Input>
            </div>
            <br />
            <div>
                <Button type='primary' onClick={register}>注册</Button>
            </div>
            
        </div>
    );
};

export default Register;