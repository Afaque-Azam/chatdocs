import { DataAPIClient } from "@datastax/astra-db-ts";

export const connectdb = async()=>{
    try {
        const client = new DataAPIClient();
        const database = client.db(process.env.NEXT_PUBLIC_DB_APIEndPoint, {
        token: process.env.NEXT_PUBLIC_DB_APITOKEN,
        });
        const dbcollection = database.collection('pdf_vector');
        return dbcollection;
    } catch (error) {
        console.log(error);
    }
}