const checkPermission =()=>{
    if(!('serviceWorker' in navigator )){
        throw new Error ("No support for serviceWorker")
    }
}

const registerSW = async ()=>{
    const registration= await navigator.serviceWorker.register('sw.js')
    return registration
}

const requestNotificationPermission = async () =>{
    const permission = await Notification.requestPermission()
    if(permission !== "granted"){
        throw new Error("Notification permission is not granted")
    }
    else{
        new Notification("Hello worlds")
    }
}
checkPermission()
requestNotificationPermission()
export const mainsw = async()=>{
    checkPermission()
    await requestNotificationPermission()
    await registerSW
}