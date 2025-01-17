import Retell from 'retell-sdk';

class RetellClient {
    private static instance: Retell | null = null;

    private constructor() {}

    public static getInstance(): Retell {
        if (!RetellClient.instance) {
            const apiKey = process.env.NEXT_PUBLIC_RETELL_API_KEY;
            if (!apiKey) {
                throw new Error('NEXT_PUBLIC_RETELL_API_KEY is not defined in environment variables');
            }
            RetellClient.instance = new Retell({
                apiKey,
            });
        }
        return RetellClient.instance;
    }
}

export const getRetellClient = () => RetellClient.getInstance();