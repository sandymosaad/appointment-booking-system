// "use client"
// import { supabase } from "./supabaseClient";

// export async function addUser(user){
//     const {data , error} =await supabase 
//     .from ("users")
//     .insert([user])
//     .select()
//     .single()
    
//     if(error){
//         console.log("Error insert new user:", error);
//         throw new Error (error.messag    e)
//     }

//     return data
// }

import { supabase } from "./supabaseClient";

// Define what a User looks like
interface UserData {
    name: string;
    email: string;
    password: string;
    role: string;
    id: string;
}

export async function addUser(user: UserData) {
    const { data, error } = await supabase 
        .from("profiles")
        .insert([user]) // If 'user' has an 'id' that is a string, it will crash here if DB is bigint
        .select()
        .single();
    
    if (error) {
        console.error("Error inserting new user:", error);
        throw new Error(error.message);
    }

    return data;
}