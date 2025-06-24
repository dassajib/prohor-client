const Loading = () => {
    return (
        <div className="flex justify-center py-12">
            <div className="flex space-x-2">
                <span className="inline-block w-4 h-4 bg-primary rounded-full animate-pulse"></span>
                <span className="inline-block w-4 h-4 bg-primary rounded-full animate-pulse animation-delay-200"></span>
                <span className="inline-block w-4 h-4 bg-primary rounded-full animate-pulse animation-delay-400"></span>
            </div>
        </div>
    )
}

export default Loading