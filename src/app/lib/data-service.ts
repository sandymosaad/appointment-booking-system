import { supabase } from "./supabaseClient";
import {UserData } from "../interfacees/UserData";
import { slotData } from "../interfacees/slotData";
import { toast } from "sonner";

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
export async function getUser(id:string) {
    const { data, error } = await supabase 
        .from("profiles")
        .select()
        .eq("id", id)
        .single();
    
    if (error) {
        console.error("Error fetching user data:", error);
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

export async function getProviderSlots(
  providerId: string,
  status?: string
) {
  let query = supabase
    .from("availability_slots")
    .select("*")
    .eq("provider_id", providerId)
    .order("date", { ascending: true })
    .order("start_time", { ascending: true });

  if (status && status !== "all") {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching provider slots:", error);
    throw new Error(error.message);
  }

  return data;
}

export async function deleteSlot(slotId: string ) {
  let query = supabase
    .from("availability_slots")
    .delete()
    .eq("id", slotId)
  const { data, error } = await query;
  if (error) {
    console.error("Error deleting slot:", error);
    throw new Error(error.message);
  }

  return data;
}

export async function getSlots(
  status?: string
) {
  let query = supabase
    .from("availability_slots")
    .select("*")
    .order("date", { ascending: true })
    .order("start_time", { ascending: true });

  if (status && status !== "all") {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching provider slots:", error);
    throw new Error(error.message);
  }

  return data;
}