import { supabase } from "./supabaseClient";
import {UserData } from "../interfacees/UserData";
import { slotData } from "../interfacees/slotData";

type SlotStatus = "available" | "booked" | "reserved" | "past";


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
    .neq("status", "past")
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
     let client_id :string | null =null;
     client_id = (await getLoggedInUser()).id
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
  const slots = data?.filter(
    (slot) => slot.status === "available" || slot.client_id === client_id
  );
  return slots;
}

export async function updateSlotStatus(
  slotId: string,
  status: SlotStatus
) {
   let expires_at: Date | null = null;
   let client_id :string | null =null;
    // if (status === "reserved") {
    //   expires_at = new Date(Date.now() + 1 * 60 * 1000);
    //   client_id = (await getLoggedInUser()).id
    //   console.log(client_id)
    // }
  const { data, error } = await supabase
    .from("availability_slots")
    .update({ status ,expires_at,client_id})   
    .eq("id", slotId)
    .select();
 
  if (error) {
    console.log("Error updating slot:", error);
    throw new Error(error.message);
  }

  return data;
}
export async function reserveSlot(
  slotId: string,
  status: SlotStatus
) {
   let expires_at: Date | null = null;
   let client_id :string | null =null;

   expires_at = new Date(Date.now() + 1 * 60 * 1000);
   client_id = (await getLoggedInUser()).id
  const { data, error } = await supabase
    .from("availability_slots")
    .update({ status ,expires_at,client_id})   
    .eq("id", slotId)
    .select();
 
  if (error) {
    console.log("Error reserve slot:", error);
    throw new Error(error.message);
  }

  return data;
}
export async function bookSlot(
  slotId: string,
  status: SlotStatus
) {
   let client_id :string | null; 
   let client_name : string | null; 
   client_id = (await getLoggedInUser()).id;
   client_name = (await getLoggedInUser()).user_metadata["full_name"];
    
   const { data, error } = await supabase
    .from("availability_slots")
    .update({ status ,client_id ,expires_at:null, client_name})   
    .eq("id", slotId)
    .select();
 
  if (error) {
    console.log("Error book slot:", error);
    throw new Error(error.message);
  }

  return data;
}
export async function getSlot(id:string) {
    const { data, error } = await supabase 
        .from("availability_slots")
        .select()
        .eq("id", id)
        .single();
    
    if (error) {
        console.error("Error fetching slot data:", error);
        throw new Error(error.message);
    }

    return data;
}

export async function cancelSlotByClient(id:string){
  const { data, error } = await supabase
    .from("availability_slots")
    .update({ 
      status:"available" , 
      client_id:null
     })   
    .eq("id", id)
    .select();
 
  if (error) {
    console.log("Error cancel slot:", error);
    throw new Error(error.message);
  }
}

export async function cancelSlotByProvider(id:string){
  const { data, error } = await supabase
    .from("availability_slots")
    .update({ 
      status:"cancelled" , 
      client_id:null
     })   
    .eq("id", id)
    .select();
 
  if (error) {
    console.log("Error cancel slot:", error);
    throw new Error(error.message);
  }
  return data;
}