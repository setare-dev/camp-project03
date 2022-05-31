const SuspenseLoading = () => (
    <div className="flex justify-center items-center mt-4">
        <span className="relative flex h-6 w-6">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-6 w-6 bg-indigo-500"></span>
        </span>
    </div>
)

export default SuspenseLoading