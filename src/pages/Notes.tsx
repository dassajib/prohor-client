import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Pencil, Search, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

import { useDeleteNote, useGetAllNotes } from "@/hooks/useNote"
import { NoteInterface } from "@/interface/noteInterface"
import NoteEditorModal from "@/components/shared/NoteEditor/NoteEditorModal"
import NoteViewerModal from "@/components/shared/NoteEditor/NoteViewerModal"
import Loading from "@/components/shared/Loading"

const Notes = () => {
  const [showTrashed, setShowTrashed] = useState(false)
  const [selectedNote, setSelectedNote] = useState<NoteInterface | null>(null)

  const { data: notes, isLoading, error } = useGetAllNotes()
  const { mutate } = useDeleteNote()

  const openNote = (note: NoteInterface) => setSelectedNote(note)
  const closeNote = () => setSelectedNote(null)

  const handleDelete = (id: number) => {
    mutate(id)
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* header */}
      <header className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-extrabold tracking-tight">
          {showTrashed ? "Trash" : "Your Notes"}
        </h2>
        <NoteEditorModal />
      </header>

      {/* tabs */}
      <div className="flex justify-center gap-4 mb-6">
        <Button
          variant={!showTrashed ? "default" : "outline"}
          onClick={() => setShowTrashed(false)}
        >
          Active Notes
        </Button>
        <Button
          variant={showTrashed ? "default" : "outline"}
          onClick={() => setShowTrashed(true)}
        >
          Trash
        </Button>
      </div>

      {/* search */}
      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            placeholder="Search notes..."
            className="pl-12 bg-muted/70 border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {isLoading && <Loading />}

      {error && (
        <p className="text-center text-red-500">
          Failed to load notes: {error.message}
        </p>
      )}

      {!isLoading && notes?.length === 0 && (
        <p className="text-center text-gray-400 italic">
          {showTrashed ? "Trash is empty." : "No notes found."}
        </p>
      )}

      {/* notes */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {notes?.map((note, index) => (
          <motion.div
            key={note.ID}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card onClick={() => openNote(note)} className="flex flex-col justify-between h-[360px] w-full border rounded-xl cursor-pointer shadow-sm hover:shadow-md transition duration-200">
              <CardHeader className="flex flex-col gap-1">
                <CardTitle
                  className="text-xl font-semibold text-gray-800 truncate"
                  title={note.Title || "Untitled"}
                >
                  {(note.Title || "Untitled").length > 24
                    ? (note.Title || "Untitled").slice(0, 24) + "..."
                    : note.Title || "Untitled"}
                </CardTitle>

                <CardDescription className="text-sm text-muted-foreground">
                  #{note.Tag}
                </CardDescription>

                <CardDescription className="text-sm text-muted-foreground">
                  {new Date(note.CreatedAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </CardDescription>
              </CardHeader>

              <CardContent className="mb-4 overflow-hidden">
                <div
                  className="prose max-w-full text-gray-700 line-clamp-5"
                  dangerouslySetInnerHTML={{ __html: note.Content }}
                />
              </CardContent>

              <CardFooter>
                <div className="flex items-center justify-between pt-0 w-full">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 border-blue-200 hover:bg-blue-50 cursor-pointer"
                    >
                      <Pencil className="w-4 h-4 mr-1" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-200 hover:bg-red-50 cursor-pointer"
                      onClick={() => handleDelete(note.ID)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {selectedNote && (
        <NoteViewerModal
          note={selectedNote}
          open={!!selectedNote}
          onClose={closeNote}
        />
      )}
    </div>
  )
}

export default Notes
