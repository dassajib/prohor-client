import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

import { useGetAllNotes } from "@/hooks/useNote"
import Loading from "@/components/shared/Loading"
import NoteEditorModal from "@/components/shared/NoteEditor/NoteEditorModal"

const Notes = () => {
  const { data: notes, isLoading, error } = useGetAllNotes()

  return (
    <div className="max-w-7xl mx-auto p-6">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-extrabold tracking-tight">Your Notes</h2>
        <NoteEditorModal />
      </header>

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
        <p className="text-center text-gray-400 italic">No notes found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes?.map((note) => (
          <Card
            key={note.ID}
            className="cursor-pointer hover:shadow-xl transition-shadow duration-300"
          >
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {note.Title || "Untitled"}
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                {note.Tag}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="prose max-w-full text-gray-700 line-clamp-4"
                dangerouslySetInnerHTML={{ __html: note.Content }}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Notes
