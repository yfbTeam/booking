import axios from 'axios';
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