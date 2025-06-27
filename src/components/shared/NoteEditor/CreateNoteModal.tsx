import { useState } from "react"
import { useForm } from "react-hook-form"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { NoteFormInterface } from "@/interface/noteInterface"
import { useCreateNote } from "@/hooks/useNote";
import { toast } from "sonner";
import MenuBar from "./MenuBar"

const CreateNoteModal = () => {
    const [open, setOpen] = useState(false)
    const { mutate, isPending } = useCreateNote()

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<NoteFormInterface>()

    const editor = useEditor({
        extensions: [StarterKit.configure({
            bulletList: {
                HTMLAttributes: {
                    class: "list-disc ml-3",
                },
            },
            orderedList: {
                HTMLAttributes: {
                    class: "list-decimal ml-3",
                },
            },
        }),
        TextAlign.configure({
            types: ["heading", "paragraph"],
        }),
            Highlight,
        ],
        content: "",
    })

    const onSubmit = (data: NoteFormInterface) => {
        const content = editor?.getHTML() || ""
        // const plainText = editor?.getText()
        mutate(
            { ...data, content },
            {
                onSuccess: () => {
                    setOpen(false)
                    reset()
                    editor?.commands.clearContent()
                },
                onError: (err) => {
                    toast.error(`Failed to create note:", ${err.message}`)
                },
            }
        )
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer" size="lg">+ New Note</Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-2xl overflow-hidden">
                <DialogHeader>
                    <DialogTitle>Create a New Note</DialogTitle>
                    <DialogDescription>Write and organize your note below.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
                    <div>
                        <Input
                            placeholder="Title"
                            {...register("title", { required: "Title is required" })}
                        />
                        {errors.title && (
                            <p className="text-sm text-red-500">{errors.title.message}</p>
                        )}
                    </div>

                    <div>
                        <Input
                            placeholder="Tag"
                            {...register("tag", { required: "Tag is required" })}
                        />
                        {errors.tag && (
                            <p className="text-sm text-red-500">{errors.tag.message}</p>
                        )}
                    </div>

                    <div className="w-full border rounded-md p-3 bg-white min-h-[200px] max-h-[300px] overflow-auto">
                        <MenuBar editor={editor} />

                        <div className="prose w-full break-words max-w-full">
                            <EditorContent editor={editor} />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" disabled={!watch("title")?.trim() ||
                            !editor?.getText().trim() ||
                            !watch("tag")?.trim()} className="cursor-pointer">
                            {isPending ? "Saving Note" : "Save Note"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateNoteModal
