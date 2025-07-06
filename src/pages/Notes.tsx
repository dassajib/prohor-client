import { lazy, Suspense, useCallback, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Pencil, Pin, PinOff, Search, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

import { NoteInterface } from "@/interface/noteInterface"
import { useDeleteNote, useGetAllNotes, useNotePinToggle, usePermanentDelNote, useRestoreNote } from "@/hooks/useNote"
import { useDebounce } from "@/hooks/useDebounce"
import Loading from "@/components/shared/Loading"

const CreateAndEditNoteModal = lazy(() => import("@/components/shared/NoteEditor/CreateAndEditNoteModal"))
const NoteReaderModal = lazy(() => import("@/components/shared/NoteEditor/NoteReaderModal"))

const Notes = () => {
  const [showTrashed, setShowTrashed] = useState(false)
  const [noteToEdit, setNoteToEdit] = useState<NoteInterface | null>(null)
  const [selectedNote, setSelectedNote] = useState<NoteInterface | null>(null)

  const { register, watch } = useForm({
    defaultValues: { query: "" }
  })

  const query = watch("query")
  // debounce to reducing search api call
  const debounceQuery = useDebounce(query, 400)

  const { data: notes, isLoading, error } = useGetAllNotes(debounceQuery)
  const { mutate: deleteMutate, isPending: isDeleting } = useDeleteNote()
  const { mutate: restoreMutate, isPending: isRestoring } = useRestoreNote()
  const { mutate: permanentlyDelMutate, isPending: isPermanentlyDeleting } = usePermanentDelNote()
  const { mutate: togglePin, isPending: isTogglingPin } = useNotePinToggle()

  const openNote = (note: NoteInterface | null) => setSelectedNote(note)
  const closeNote = () => setSelectedNote(null)

  // useCallback to prevent unnecessary rerenders
  const handleDelete = useCallback((id: number) => {
    deleteMutate(id)
  }, [deleteMutate])

  const handleRestore = useCallback((id: number) => {
    restoreMutate(id)
  }, [restoreMutate])

  const handlePermanentlyDelete = useCallback((id: number) => {
    permanentlyDelMutate(id)
  }, [permanentlyDelMutate])

  // memoized filteredNotes to avoid unnecessary recalculations
  const filteredNotes = useMemo(() => {
    return notes?.filter((note) => showTrashed ? note.DeletedAt !== null : note.DeletedAt === null)
  }, [showTrashed, notes])

  const handleEdit = (note: NoteInterface) => {
    setNoteToEdit(note)
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* header */}
      <header className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-extrabold tracking-tight">
          {showTrashed ? "Trash" : "Your Notes"}
        </h2>
        <CreateAndEditNoteModal
          noteToEdit={noteToEdit}
          onClose={() => setNoteToEdit(null)}
        />
      </header>

      {/* tabs */}
      <div className="flex justify-center gap-4 mb-6">
        <Button
          className="cursor-pointer"
          variant={!showTrashed ? "default" : "outline"}
          onClick={() => setShowTrashed(false)}
        >
          Active Notes
        </Button>
        <Button
          className="cursor-pointer"
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
            {...register("query")}
            placeholder="Search notes..."
            className="pl-12 bg-muted/70 border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {isLoading && <Loading variant="notes" />}

      {error && (
        <p className="text-center text-red-500">
          Failed to load notes: {error.message}
        </p>
      )}

      {!isLoading && filteredNotes?.length === 0 && (
        <p className="text-center text-gray-400 italic">
          {showTrashed ? "Trash is empty." : "No notes found."}
        </p>
      )}

      {/* notes */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredNotes?.map((note, index) => (
          <motion.div
            key={note.ID}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="flex flex-col justify-between h-[360px] w-full border rounded-xl shadow-sm hover:shadow-md transition duration-200">
              <div onClick={() => openNote(note)} className="cursor-pointer">
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
              </div>

              <CardFooter>
                <div className="flex items-center justify-between pt-0 w-full">
                  {/* note buttons */}
                  <div className="flex gap-2">
                    {
                      !showTrashed ? (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-blue-600 border-blue-200 hover:bg-blue-50 cursor-pointer"
                            onClick={() => handleEdit(note)}
                          >
                            <Pencil className="w-4 h-4 mr-1" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-200 hover:bg-red-50 cursor-pointer"
                            onClick={() => handleDelete(note.ID)}
                            disabled={isDeleting}
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 border-green-200 hover:bg-green-50 cursor-pointer"
                            onClick={() => handleRestore(note.ID)}
                            disabled={isRestoring}
                          >
                            <span className="text-sm font-medium">Restore</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 border-green-200 hover:bg-green-50 cursor-pointer"
                            onClick={() => handlePermanentlyDelete(note.ID)}
                            disabled={isPermanentlyDeleting}
                          >
                            <span className="text-sm font-medium">Delete Permanently</span>
                          </Button>
                        </>
                      )}
                  </div>

                  {/* pin note */}
                  <button
                    onClick={() => togglePin({ id: note.ID, pinned: !note.Pinned })}
                    disabled={isTogglingPin}
                    className={`transition cursor-pointer ${note.Pinned
                        ? "text-yellow-600 hover:text-yellow-700"
                        : "text-gray-400 hover:text-yellow-600"
                      }`}
                  >
                    {note.Pinned ? (
                      <Pin className="h-5 w-5 fill-yellow-500" />
                    ) : (
                      <PinOff className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {selectedNote && (
        <Suspense fallback={<Loading variant="modal" />}>
          <NoteReaderModal
            note={selectedNote}
            open={!!selectedNote}
            onClose={closeNote}
          />
        </Suspense>
      )}
    </div>
  )
}

export default Notes
