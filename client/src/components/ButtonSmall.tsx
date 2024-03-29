export function ButtonSmall({ label, onClick, type }: any) {
    return (
        <button
            onClick={onClick}
            type={type}
            className="w-full px-5 py-2.5 bg-red-600 hover:bg-stone-100 rounded-md hover:rounded-lg
            text-xs text-gray-100 hover:text-black text-center duration-300 ease-in-out
            hover:shadow-xl transform hover:scale-105"
        >
            {label}
        </button>
    );
}
