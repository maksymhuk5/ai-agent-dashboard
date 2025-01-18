import { Dialog, DialogTitle, DialogHeader, DialogContent } from "@/components/ui/dialog";
import { Call } from "@/app/this/constants/type";
import { useState, useEffect } from "react";
import OpenAI from "openai";
import { Frown, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SummaryResult {
  summary: string;
  painPoint: string;
  buyingSignals: string;
  emotionalStatus: string;
}

export function SummaryDialog({ summaryCall, setSummaryCall }: { summaryCall: Call | null, setSummaryCall: (call: Call | null) => void }) {
    const [loading, setLoading] = useState(false);
    const [summary, setSummary] = useState<SummaryResult | null>(null);
    const { toast } = useToast();
    useEffect(() => {
        const analyzeSummary = async () => {
            if (!summaryCall?.transcript) return setSummary(null);
            
            setLoading(true);
            console.log(summaryCall.transcript);
            try {
                const openai = new OpenAI({
                    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
                    dangerouslyAllowBrowser: true,
                });

                const prompt = `Please analyze this conversation transcript and provide a JSON response with the following structure:
                {
                    "summary": "overall summary of the conversation",
                    "painPoint": "main pain points discussed", 
                    "buyingSignals": "identified buying signals",
                    "emotionalStatus": "emotional state of the participants"
                }
                
                Transcript: ${summaryCall.transcript}`;

                const response = await openai.chat.completions.create({
                    messages: [{ role: "user", content: prompt }],
                    model: "gpt-4o", // Changed from gpt-4 since it's not accessible
                    response_format: { type: "json_object" }
                });

                console.log(response.choices[0].message.content);

                const result = JSON.parse(response.choices[0].message.content || '{}');
                setSummary(result);
                toast({
                    title: "Summary generated",
                    description: "The summary has been generated successfully",
                });
            } catch (error) {
                console.error('Error analyzing transcript:', error);
                toast({
                    title: "Error",
                    description: "An error occurred while generating the summary",
                });
            } finally {
                setLoading(false);
            }
        };

        if (summaryCall) {
            analyzeSummary();
        }
    }, [summaryCall]);

    return (
        <Dialog open={summaryCall !== null} onOpenChange={() => setSummaryCall(null)}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Call Summary</DialogTitle>
                </DialogHeader>
                {loading ? (
                    <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                ) : summary ? (
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold mb-2 underline">Overall Summary</h3>
                            <p>{summary.summary}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2 underline">Pain Points</h3>
                            <p>{summary.painPoint}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2 underline">Buying Signals</h3>
                            <p>{summary.buyingSignals}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2 underline">Emotional Status</h3>
                            <p>{summary.emotionalStatus}</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col text-muted-foreground items-center justify-center gap-2 h-full py-4">
                        <Frown className="w-6 h-6" />
                        <div className="text-sm">No summary available.</div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}   