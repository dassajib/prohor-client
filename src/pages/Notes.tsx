import { lazy, Suspense, useCallback, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

import Loading from "@/components/shared/Loading"
import { NoteInterface } from "@/interface/noteInterface"
import {
  useDeleteNote,
  useGetAllNotes,
  useNotePinToggle,
  usePermanentDelNote,
  useRestoreNote,
} from "@/hooks/useNote"
import { useDebounce } from "@/hooks/useDebounce"
import Note from "@/components/shared/Note"

const CreateAndEditNoteModal = lazy(() => import("@/components/shared/NoteEditor/CreateAndEditNoteModal"))
const NoteReaderModal = lazy(() => import("@/components/shared/NoteEditor/NoteReaderModal"))

const Notes = () => {
  const [showTrashed, setShowTrashed] = useState(false)
  const [noteToEdit, setNoteToEdit] = useState<NoteInterface | null>(null)
  const [selectedNote, setSelectedNote] = useState<NoteInterface | null>(null)

  const { register, watch } = useForm({ defaultValues: { query: "" } })
  const query = watch("query")
  const debounceQuery = useDebounce(query, 400)

  const { data: notes, isLoading, error } = useGetAllNotes(debounceQuery)
  const { mutate: deleteMutate, isPending: isDeleting } = useDeleteNote()
  const { mutate: restoreMutate, isPending: isRestoring } = useRestoreNote()
  const { mutate: permanentlyDelMutate, isPending: isPermanentlyDeleting } = usePermanentDelNote()
  const { mutate: togglePin, isPending: isTogglingPin } = useNotePinToggle()

  const openNote = (note: NoteInterface | null) => setSelectedNote(note)
  const closeNote = () => setSelectedNote(null)

  const handleDelete = useCallback((id: number) => {
    deleteMutate(id)
  }, [deleteMutate])

  const handleRestore = useCallback((id: number) => {
    restoreMutate(id)
  }, [restoreMutate])

  const handlePermanentlyDelete = useCallback((id: number) => {
    permanentlyDelMutate(id)
  }, [permanentlyDelMutate])

  const filteredNotes = useMemo(() => {
    return notes?.filter(note =>
      showTrashed ? note.DeletedAt !== null : note.DeletedAt === null
    )
  }, [showTrashed, notes])

  return (
    <div className="max-w-7xl mx-auto p-6">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-extrabold tracking-tight">
          {showTrashed ? "Trash" : "Your Notes"}
        </h2>
        <CreateAndEditNoteModal
          noteToEdit={noteToEdit}
          onClose={() => setNoteToEdit(null)}
        />
      </header>

      <div className="flex justify-center gap-4 mb-6">
        <Button variant={!showTrashed ? "default" : "outline"} onClick={() => setShowTrashed(false)} className="cursor-pointer">Active Notes</Button>
        <Button variant={showTrashed ? "default" : "outline"} onClick={() => setShowTrashed(true)} className="cursor-pointer">Trash</Button>
      </div>

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
      {error && <p className="text-center text-red-500">Failed to load notes: {error.message}</p>}
      {!isLoading && filteredNotes?.length === 0 && (
        <p className="text-center text-gray-400 italic">
          {showTrashed ? "Trash is empty." : "No notes found."}
        </p>
      )}

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes?.map((note, index) => (
          <Note
            key={note.ID}
            index={index}
            note={note}
            showTrashed={showTrashed}
            onOpen={openNote}
            onEdit={setNoteToEdit}
            onDelete={handleDelete}
            onRestore={handleRestore}
            onPermanentlyDelete={handlePermanentlyDelete}
            onTogglePin={(id, pinned) => togglePin({ id, pinned })}
            isDeleting={isDeleting}
            isRestoring={isRestoring}
            isPermanentlyDeleting={isPermanentlyDeleting}
            isTogglingPin={isTogglingPin}
          />
        ))}
      </motion.div>

      {selectedNote && (
        <Suspense fallback={<Loading variant="modal" />}>
          <NoteReaderModal note={selectedNote} open={!!selectedNote} onClose={closeNote} />
        </Suspense>
      )}
    </div>
  )
}

export default Notes