import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Delete, Phone, UserPlus } from "lucide-react";
import { contacts } from "@/app/this/constants/garbage";


export default function DialerDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [filteredContacts, setFilteredContacts] = useState(contacts);


    useEffect(() => {
        const filtered = contacts.filter(contact => {
            const formattedPhone = contact.phone.replace(/\D/g, '');
            const formattedInput = phoneNumber.replace(/\D/g, '');
            return formattedPhone.includes(formattedInput) ||
                contact.name.toLowerCase().includes(phoneNumber.toLowerCase());
        });
        setFilteredContacts(filtered);
    }, [phoneNumber]);

    const handleNumberClick = (num: string) => {
        setPhoneNumber(prev => prev + num);
    };

    const handleBackspace = () => {
        setPhoneNumber(prev => prev.slice(0, -1));
    };

    const handleContactSelect = (phone: string) => {
        setPhoneNumber(phone);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Phone className="h-5 w-5" />
                        Phone Dialer
                    </DialogTitle>
                    <DialogDescription>
                        Enter a phone number or search contacts to make a call.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4">
                    <Input
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Enter phone number"
                        className="text-lg"
                    />

                    {phoneNumber && filteredContacts && (
                        <div className="rounded-lg border shadow-md p-2 max-h-[120px] overflow-y-auto">
                            {filteredContacts.map((contact) => (
                                <div
                                    key={contact.phone}
                                    className="p-2 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                                    onClick={() => handleContactSelect(contact.phone)}
                                >
                                    <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">{contact.phone}</span><span className="text-md text-muted-foreground">{contact.name}</span></div>
                                </div>
                            ))}
                            {filteredContacts.length === 0 && (
                                <div className="p-2">
                                    <div className="text-muted-foreground mb-2">No contacts found.</div>
                                    <Button variant="outline" className="w-full">
                                        <UserPlus className="h-4 w-4 mr-2" />
                                        Add New Contact
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="hidden md:grid grid-cols-3 gap-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "+", 0].map((num) => (
                            <Button
                                key={num}
                                variant="outline"
                                onClick={() => handleNumberClick(num?.toString() || '')}
                                className="h-12 text-lg"
                                disabled={num === null}
                            >
                                {num}
                            </Button>
                        ))}
                        <Button
                            variant="outline"
                            onClick={handleBackspace}
                            className="h-12"
                        >
                            <Delete />
                        </Button>
                    </div>

                    <Button variant="default" className="h-12 text-lg">
                        <Phone className="h-4 w-4 mr-2" />
                        Make a Call
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}