export const unAuth = (res:LocalReponse) =>{
    if(res.code == 401){
        window.location.href = `${window.location.origin}/login`
    }
}