import { useEffect, useState } from "react"
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

import { CreateAndEditNoteModalProps, NoteFormInterface } from "@/interface/noteInterface"
import { useCreateNote, useEditNote } from "@/hooks/useNote";
import { toast } from "sonner";
import MenuBar from "./MenuBar"

const CreateAndEditNoteModal = ({ noteToEdit, onClose }: CreateAndEditNoteModalProps) => {
    const [open, setOpen] = useState(false)
    const { mutate: createMutate, isPending: isCreating } = useCreateNote()
    const { mutate: editMutate, isPending: isEditing } = useEditNote()

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
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

    // Set initial values when noteToEdit changes
    useEffect(() => {
        if (noteToEdit) {
            setOpen(true)
            setValue("title", noteToEdit.Title)
            setValue("tag", noteToEdit.Tag)
            editor?.commands.setContent(noteToEdit.Content)
        }
    }, [noteToEdit, editor, setValue])

    const onSubmit = (data: NoteFormInterface) => {
        const content = editor?.getHTML() || ""

        if (noteToEdit) {
            editMutate(
                {
                    id: noteToEdit.ID,
                    data: {
                        title: data.title,
                        tag: data.tag,
                        content: content
                    },
                },
                {
                    onSuccess: () => {
                        handleClose()
                    },
                    onError: (err) => {
                        toast.error(`Failed to update note: ${err.message}`)
                    },
                }
            )
        } else {
            createMutate(
                { ...data, content },
                {
                    onSuccess: () => {
                        handleClose()
                    },
                    onError: (err) => {
                        toast.error(`Failed to create note: ${err.message}`)
                    },
                }
            )
        }
    }

    const handleClose = () => {
        setOpen(false)
        reset()
        editor?.commands.clearContent()
        onClose()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer" size="lg">
                    + New Note
                </Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-2xl overflow-hidden">
                <DialogHeader>
                    <DialogTitle>
                        {noteToEdit ? "Edit Note" : "Create a New Note"}
                    </DialogTitle>
                    <DialogDescription>
                        {noteToEdit ? "Update your note below." : "Write and organize your note below."}
                    </DialogDescription>
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

                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            className="cursor-pointer"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="cursor-pointer"
                            disabled={
                                !watch("title")?.trim() ||
                                !editor?.getText().trim() ||
                                !watch("tag")?.trim()
                            }
                        >
                            {isCreating || isEditing
                                ? noteToEdit
                                    ? "Editing Note..."
                                    : "Saving Note..."
                                : noteToEdit
                                    ? "Edit Note"
                                    : "Save Note"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateAndEditNoteModal
