export function ButtonSmall({ label, onClick, type }: any) {
    return (
        <button
            onClick={onClick}
            type={type}
            className="bg-black rounded-md rounded-xl text-xs text-gray-200 lg:p-1 text-center h-6 w-10 lg:h-6 lg:w-12"
        >
            {label}
        </button>
    );
}
