import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, Pencil } from "lucide-react"

import { NoteInterface } from "@/interface/noteInterface";

const NoteReaderModal = ({ note, open, onClose }: { note: NoteInterface; open: boolean; onClose: () => void }) => {
    if (!note) return null

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl w-full h-[90vh] overflow-y-auto p-6">
                <DialogHeader className="flex flex-col items-start space-y-2">
                    <DialogTitle className="text-2xl font-bold">{note.Title || "Untitled"}</DialogTitle>
                    <div className="text-sm text-muted-foreground">#{note.Tag} • {new Date(note.CreatedAt).toLocaleDateString()}</div>
                </DialogHeader>

                <div
                    className="prose max-w-full mt-4"
                    dangerouslySetInnerHTML={{ __html: note.Content }}
                />

                <div className="mt-6 flex justify-end gap-2">
                    <Button className="cursor-pointer" variant="outline" size="sm" onClick={onClose}><X className="w-4 h-4 mr-1" /> Close</Button>
                    <Button variant="outline" size="sm"><Pencil className="w-4 h-4 mr-1" /> Edit</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default NoteReaderModal
