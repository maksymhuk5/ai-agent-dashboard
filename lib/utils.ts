import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { jwtDecode } from "jwt-decode";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getToken() {
    return localStorage.getItem("token");
}

export function setToken(token: string) {
    localStorage.setItem("token", token);
}

export function removeToken() {
    localStorage.removeItem("token");
}

export function isAuthenticated() {
    return !!getToken();
}

export function getUser() {
    const token = getToken();
    if (token) {
        return jwtDecode(token);
    }
    return null;
}