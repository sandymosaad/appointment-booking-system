import { supabase } from "./supabaseClient";
import {UserData } from "../interfacees/UserData";
import { slotData } from "../interfacees/slotData";

export async function addUser(user: UserData) {
    const { data, error } = await supabase 
        .from("profiles")
        .insert([user])
        .select()
        .single();
    
    if (error) {
        console.error("Error inserting new user:", error);
        throw new Error(error.message);
    }

    return data;
}

export async function getLoggedInUser() {
    const { data: { user } } = await supabase.auth.getUser()
    return user
}

export async function addSlot(slotData: slotData) {
    const { data, error } = await supabase 
        .from("availability_slots")
        .insert([slotData])
        .select()
        .single();
    
    if (error) {
        console.error("Error inserting new slot:", error);
        throw new Error(error.message);
    }

    return data;
}