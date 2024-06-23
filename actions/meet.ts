"use server";

import axios from "axios";

export const createMeet = async(values: any) => {
    try{
       const meet =  await axios.post("http://localhost:4000/google-calendar/create", values)
       return meet
    }catch(error){
        console.log(error)
    }
}