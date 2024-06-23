"use server";

import { signIn, signOut } from "@/auth";
import axios from "axios";

export async function signInAction() {
    await signIn("google", { redirectTo: "/loggedin" });
}

export async function signOutAction() {
    await signOut({ redirectTo: "/" });
}

export const createOrUpdate = async(
    values: {email:string, access_token: string}
) => {
    try{
        await axios.post("http://localhost:4000/user", values)
    }catch(error){
        console.log(error)
    }
}