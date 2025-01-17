import { Response } from "@/app/this/constants/type";

export const regist_user_info = async (userInfo: any): Promise<Response> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo)
        });

        const data = await response.json();
        return data;
    } catch (error) {
        return {
            status: 500,
            message: 'An error occurred during registration',
            data: null
        };
    }
}

export const verify_code = async (code: string): Promise<Response> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/auth/verify/${code}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        return data;
    } catch (error) {
        return {
            status: 500,
            message: 'An error occurred during code verification',
            data: null
        };
    }
}
