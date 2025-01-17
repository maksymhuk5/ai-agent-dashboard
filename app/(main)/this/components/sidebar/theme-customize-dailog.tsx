"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { themeChange } from "@/app/this/store/actions/theme";
import { Sun, Moon, Laptop } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useTheme } from "next-themes";

export default function ThemeCustomizeDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
    const dispatch = useDispatch();
    const { mode, radius, color } = useSelector((state: any) => state.theme);
    const { setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const handleModeChange = (newMode: string) => {
        dispatch(themeChange({ mode: newMode }));
        setTheme(newMode);
    };

    const handleRadiusChange = (newRadius: string) => {
        dispatch(themeChange({ radius: newRadius }));
    };

    const handleColorChange = (newColor: string) => {
        dispatch(themeChange({ color: newColor }));
    };

    const colors = [
        { label: "default", var: "0 0% 100%"},
        { label: "green", var: "142.5 76.3% 36.3%"},
        { label: "blue", var: "220 70% 50%"},
        { label: "red", var: "357.9 70% 50%"},
        { label: "orange", var: "28.5 85% 52.3%"},
        { label: "yellow", var: "43.8 95% 56.1%"},
        { label: "violet", var: "263.4 70% 50.4%"},
        { label: "rose", var: "340 65% 70%"},
        { label: "zinc", var: "240 5.9% 10%" },
    ];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full md:max-w-lg p-2 md:p-4">
                <DialogHeader className="space-y-2">
                    <DialogTitle className="text-2xl font-bold">Customize Theme</DialogTitle>
                    <DialogDescription className="text-base">
                        Customize the theme of your application.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-2 md:space-y-4 p-2 md:p-4">
                    {/* Theme Mode */}
                    <div className="space-y-2 md:space-y-4">
                        <Label className="text-lg font-semibold">Theme Mode</Label>
                        <div className="flex flex-3 gap-2">
                            <Button 
                                variant={mode === "light" ? "default" : "outline"}
                                onClick={() => handleModeChange("light")}
                                className="text-base"
                            >
                                <Sun className="w-4 h-4 mr-2" />
                                Light
                            </Button>
                            <Button 
                                variant={mode === "dark" ? "default" : "outline"}
                                onClick={() => handleModeChange("dark")}
                                className="text-base"
                            >
                                <Moon className="w-4 h-4 mr-2" />
                                Dark
                            </Button>
                            <Button 
                                variant={mode === "system" ? "default" : "outline"}
                                onClick={() => handleModeChange("system")}
                                className="text-base"
                            >
                                <Laptop className="w-4 h-4 mr-2" />
                                System
                            </Button>
                        </div>
                    </div>

                    {/* Colors */}
                    <div className="space-y-2 md:space-y-4">
                        <Label className="text-lg font-semibold">Colors</Label>
                        <div className="flex flex-wrap gap-2">
                            {colors.slice(0, 9).map((_color) => (
                                <Button
                                    key={_color.var}
                                    variant={_color.label === color ? "default" : "outline"}
                                    className="flex items-center justify-start gap-2"
                                    onClick={() => handleColorChange(_color.label)}
                                >
                                    <div 
                                        className="w-4 h-4 rounded-full border"
                                        style={{ backgroundColor: `hsl(${_color.var})` }}
                                    />
                                    <span className="text-sm md:text-base capitalize">{_color.label}</span>
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Border Radius */}
                    <div className="space-y-2 md:space-y-4">
                        <div className="flex justify-between items-center">
                            <Label className="text-lg font-semibold">Border Radius</Label>
                            <span className="text-base text-muted-foreground">{radius}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button
                                variant="outline"
                                onClick={() => handleRadiusChange("0rem")}
                                className={cn(
                                    "text-base",
                                    radius === "0rem" && "bg-primary text-primary-foreground"
                                )}
                            >
                                0
                            </Button>
                            <Button
                                variant="outline" 
                                onClick={() => handleRadiusChange("0.3rem")}
                                className={cn(
                                    "text-base",
                                    radius === "0.3rem" && "bg-primary text-primary-foreground"
                                )}
                            >
                                0.3
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => handleRadiusChange("0.5rem")}
                                className={cn(
                                    "text-base",
                                    radius === "0.5rem" && "bg-primary text-primary-foreground"
                                )}
                            >
                                0.5
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => handleRadiusChange("0.75rem")}
                                className={cn(
                                    "text-base",
                                    radius === "0.75rem" && "bg-primary text-primary-foreground"
                                )}
                            >
                                0.75
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => handleRadiusChange("1rem")}
                                className={cn(
                                    "text-base",
                                    radius === "1rem" && "bg-primary text-primary-foreground"
                                )}
                            >
                                1.0
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}