export function ButtonSmall({ label, onClick, type }: any) {
    return (
        <button
            onClick={onClick}
            type={type}
            className="bg-red-600 hover:bg-stone-100  rounded-xl hover:rounded-lg
            text-xs text-gray-100 hover:text-black lg:p-1 text-center ease-in-out
            duration-300 hover:h-9 hover:shadow-xl hover:w-15 h-8 w-12 lg:h-8 lg:w-14"
        >
            {label}
        </button>
    );
}
