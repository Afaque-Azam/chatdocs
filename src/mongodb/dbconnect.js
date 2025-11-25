import mongoose from "mongoose";
export const Mongconnectdb = ()=>{
    mongoose.connect(String(process.env.NEXT_PUBLIC_API_MongodB_Url),{dbName:"ChatDoc"}).then(()=>{
        console.log("Db connected successfully ")
    }).catch((e)=>{
        console.log(e);
    })
}
