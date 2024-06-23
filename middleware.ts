import { auth as middleware } from "@/auth"
import { apiAuthPrefix, authRoutes } from "./route";

export default middleware((req) => {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)

    if(isApiAuthRoute) return

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL("/loggedin", nextUrl))
        }
        return 
    }

})