import { useState } from "react"
import { useForm } from "react-hook-form"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Link from "@tiptap/extension-link"
import Heading from "@tiptap/extension-heading"
import BulletList from "@tiptap/extension-bullet-list"
import OrderedList from "@tiptap/extension-ordered-list"
import ListItem from "@tiptap/extension-list-item"
import CodeBlock from "@tiptap/extension-code-block"
import Blockquote from "@tiptap/extension-blockquote"
import HorizontalRule from "@tiptap/extension-horizontal-rule"

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
import "../../styles/editor.css"

const NoteEditorModal = () => {
    const [open, setOpen] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<NoteFormInterface>()

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Heading.configure({ levels: [1, 2, 3] }),
            BulletList,
            OrderedList,
            ListItem,
            CodeBlock,
            Blockquote,
            HorizontalRule,
        ],
        content: "",
    })

    const onSubmit = (data: NoteFormInterface) => {
        const content = editor?.getHTML()
        console.log("Saving:", { ...data, content })
        setOpen(false)
        reset()
        editor?.commands.clearContent()
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
                        {editor && (
                            <div className="flex flex-wrap gap-2 mb-2">
                                <Button variant="outline" type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'bg-muted' : ''}>
                                    Bold
                                </Button>
                                <Button variant="outline" type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'bg-muted' : ''}>
                                    Italic
                                </Button>
                                <Button variant="outline" type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? 'bg-muted' : ''}>
                                    Underline
                                </Button>
                                <Button variant="outline" type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'bg-muted' : ''}>
                                    • List
                                </Button>
                                <Button variant="outline" type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'bg-muted' : ''}>
                                    1. List
                                </Button>
                                <Button variant="outline" type="button" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive('codeBlock') ? 'bg-muted' : ''}>
                                    Code
                                </Button>
                                <Button variant="outline" type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive('blockquote') ? 'bg-muted' : ''}>
                                    "
                                </Button>
                                <Button variant="outline" type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                                    HR
                                </Button>
                            </div>
                        )}
                        <div className="prose w-full break-words max-w-full">
                            <EditorContent editor={editor} />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" disabled={!watch("title")?.trim() ||
                            !editor?.getText().trim() ||
                            !watch("tag")?.trim()} className="cursor-pointer">
                            Save Note
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default NoteEditorModal
