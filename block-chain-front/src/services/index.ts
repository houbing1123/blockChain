import { useNavigate } from "react-router"; 
import { message } from "antd"
export const unAuth = (res:Reponse) =>{
    if(res.code == 401){
        message.error("请登录");
        const navigate = useNavigate();
        navigate('/login')
    }

}