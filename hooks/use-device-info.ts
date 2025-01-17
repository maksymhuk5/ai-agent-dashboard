"use client";

import { useState, useEffect } from "react";

export function useDeviceInfo() {
    const [device, setDevice] = useState('desktop');
    const [isPortrait, setIsPortrait] = useState(false);
    const [isMobileHeight, setIsMobileHeight] = useState(false);
    const [platform, setPlatform] = useState('');
    const [browser, setBrowser] = useState('');

    useEffect(() => {
        const updateDeviceInfo = () => {
            // Basic device detection based on window width
            const width = window.innerWidth;
            const newDevice = width < 480 ? 'mobile'
                : width < 768 ? 'tablet'
                : 'desktop';
            setDevice(newDevice);

            // Portrait/landscape detection
            setIsPortrait(window.innerHeight > window.innerWidth);

            // Mobile height detection
            setIsMobileHeight(window.innerHeight < 600);
        };

        // Initial check
        updateDeviceInfo();

        // Platform detection
        const detectedPlatform = window.navigator.appVersion;
        setPlatform(detectedPlatform);

        // Browser detection
        const detectedBrowser = window.navigator.userAgent;
        setBrowser(detectedBrowser);

        // Add resize listener
        window.addEventListener('resize', updateDeviceInfo);
        window.addEventListener('orientationchange', updateDeviceInfo);

        // Cleanup
        return () => {
            window.removeEventListener('resize', updateDeviceInfo);
            window.removeEventListener('orientationchange', updateDeviceInfo);
        };
    }, []);

    return { device, platform, browser, isPortrait, isMobileHeight };
}