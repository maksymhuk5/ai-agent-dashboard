import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Call } from "@/app/this/constants/type";
import { Frown } from "lucide-react";

export default function TranscriptDialog({ transcriptCall, setTranscriptCall }: { transcriptCall: Call | null, setTranscriptCall: (call: Call | null) => void }) {
    return (
        <Dialog open={!!transcriptCall} onOpenChange={() => setTranscriptCall(null)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Call Audio & Transcript</DialogTitle>
                </DialogHeader>
                {transcriptCall && (
                    <div className="space-y-4">

                        <div className="relative max-h-[400px] overflow-y-auto space-y-4 border rounded-lg p-2">
                            {transcriptCall.transcript_object?.length > 0 ? (
                                transcriptCall.transcript_object.map((entry, index) => (
                                    <div key={index} className="flex flex-col gap-1">
                                        <div className="font-semibold text-sm text-gray-600">
                                            {entry.role === 'agent' ? 'Agent' : 'Customer'}
                                        </div>
                                        <div className="text-sm">
                                            {entry.content}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col text-muted-foreground items-center justify-center gap-2 h-full py-4">
                                    <Frown className="w-6 h-6" />
                                    <div className="text-sm">No transcript available.</div>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-row gap-2 items-center">
                            <audio
                                controls
                                className="w-full"
                                src={transcriptCall.recording_url}
                            >
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}