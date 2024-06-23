import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { createOrUpdate } from "./actions/auth-action"

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
      GoogleProvider({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET,
        authorization: {
          params: {
            prompt: "consent",
            scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events'
          },
        },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }){
      if (account && account.provider === "google") {

          try{
            await createOrUpdate({
              email: profile?.email || "",
              access_token: account.access_token || ""
            })
          }catch(error){
            console.log(error)
          }

            return true
      }

      return true
    }
  },
})