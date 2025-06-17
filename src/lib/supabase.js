import { createClient } from "@supabase/supabase-js";


const supabase_url =import.meta.env.VITE_SUPABASE_URL
const supabase_Api_Key =import.meta.env.VITE_SUPABASE_KEY

export const SubaPaseAuth = createClient(supabase_url,supabase_Api_Key,{auth:{
    autoRefreshToken:true,
    persistSession:true,
    
}
})

