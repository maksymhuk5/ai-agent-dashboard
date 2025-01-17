'use client'

import { useLayoutEffect } from 'react';
import { redirect } from 'next/navigation';

export default function Home() {
    
    useLayoutEffect(() => {
        redirect('/aicallyou/');
    }, []);
    
    return (
        <></>
    );
}
