import axios from 'axios';
axios.defaults.withCredentials=true;
export function getList(service,successCb,errorCb){
    axios.get(service).then((res)=>{
        successCb(res.data);
    }).catch((err)=>{
        errorCb(err);
    })
}

export function Edit(service,body,successCb,errorCb){
    axios.put(service,body||{}).then((res)=>{
        successCb(res.data);
    }).catch((err)=>{
        errorCb(err);
    })
}
export function Add(service,body,successCb,errorCb){
    axios.post(service,body||{}).then((res)=>{
        successCb(res.data);
    }).catch((err)=>{
        errorCb(err);
    })
}
export function Delete(service,successCb,errorCb){
    axios.delete(service).then((res)=>{
        successCb(res.data);
    }).catch((err)=>{
        errorCb(err);
    })
}
export function LoginFun(service,body,successCb,errorCb){

    axios.post(service+'/login',body||{}).then((res)=>{
        successCb(res.data);
    }).catch((err)=>{
        errorCb(err);
    })
}
export function CheckLogin(service,successCb,errorCb){
    axios.get(service+'/checkLogin').then((res)=>{
        successCb(res.data);
    }).catch(err=>{
        errorCb(err);
    })
}
export function LogOut(service,successCb,errorCb){
    axios.get(service+'/logout').then((res)=>{
        successCb(res.data);
    }).catch(err=>{
        errorCb(err);
    })
}