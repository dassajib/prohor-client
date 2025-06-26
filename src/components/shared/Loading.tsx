import { Skeleton } from "../ui/skeleton"

interface LoadingProps {
    variant?: "notes" | "page" | "modal"
}

const Loading = ({ variant = "notes" }: LoadingProps) => {
    if (variant === "page") {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="space-y-3 text-center">
                    <Skeleton className="h-6 w-40 mx-auto" />
                    <Skeleton className="h-4 w-60 mx-auto" />
                </div>
            </div>
        )
    }

    if (variant === "modal") {
        return (
            <div className="p-6 space-y-4">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-11/12" />
                    <Skeleton className="h-4 w-10/12" />
                    <Skeleton className="h-4 w-9/12" />
                </div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
                <div
                    key={i}
                    className="flex flex-col justify-between h-[360px] w-full border rounded-xl p-4 shadow-sm bg-white"
                >
                    <div className="mb-2">
                        <Skeleton className="h-6 w-3/4 mb-2 rounded" />
                        <Skeleton className="h-4 w-1/4 mb-1 rounded" />
                        <Skeleton className="h-4 w-1/3 rounded" />
                    </div>

                    <div className="flex-1 space-y-2 mb-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-11/12" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-4 w-4/6" />
                    </div>

                    <div className="flex gap-2 mt-auto">
                        <Skeleton className="h-8 w-10 rounded-md" />
                        <Skeleton className="h-8 w-24 rounded-md" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Loading
