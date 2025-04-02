export const unAuth = (res:Reponse) =>{
    if(res.code == 401){
        window.location.href = `${window.location.origin}/login`
    }
}