import { getUser, isAuthenticated, setToken } from "@/lib/utils";

export const AUTH_CHANGE = "AUTH_CHANGE";

export const authChange = (token: string) => {
    setToken(token);
    return {
        type: AUTH_CHANGE,
        payload: {
            isAuthenticated: isAuthenticated(),
            isSuperAdmin: getUser()?.isSuperAdmin,
            user: getUser()
        }
    }
}


export const COMPANY_CHANGE = "COMPANY_CHANGE";

export const companyChange = (companyId: string) => {
    return {
        type: COMPANY_CHANGE,
        payload: companyId
    }
}
