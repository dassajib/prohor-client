import { FC, memo } from "react"
import { motion } from "framer-motion"
import { Pencil, Pin, PinOff, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { NoteProps } from "@/interface/noteInterface"

const Note: FC<NoteProps> = memo(({
    note,
    index,
    showTrashed,
    onOpen,
    onEdit,
    onDelete,
    onRestore,
    onPermanentlyDelete,
    onTogglePin,
    isDeleting,
    isRestoring,
    isPermanentlyDeleting,
    isTogglingPin
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
        >
            <Card className="flex flex-col justify-between h-[360px] w-full border rounded-xl shadow-sm hover:shadow-md transition duration-200">
                <div onClick={() => onOpen(note)} className="cursor-pointer">
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
                        <div className="flex gap-2">
                            {!showTrashed ? (
                                <>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-blue-600 border-blue-200 hover:bg-blue-50 cursor-pointer"
                                        onClick={() => onEdit(note)}
                                    >
                                        <Pencil className="w-4 h-4 mr-1" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-red-600 border-red-200 hover:bg-red-50 cursor-pointer"
                                        onClick={() => onDelete(note.ID)}
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
                                        onClick={() => onRestore(note.ID)}
                                        disabled={isRestoring}
                                    >
                                        Restore
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-green-600 border-green-200 hover:bg-green-50 cursor-pointer"
                                        onClick={() => onPermanentlyDelete(note.ID)}
                                        disabled={isPermanentlyDeleting}
                                    >
                                        Delete Permanently
                                    </Button>
                                </>
                            )}
                        </div>

                        {!showTrashed && (
                            <button
                                onClick={() => onTogglePin(note.ID, !note.Pinned)}
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
                        )}
                    </div>
                </CardFooter>
            </Card>
        </motion.div>
    )
})

export default Note