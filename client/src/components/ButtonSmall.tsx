export function ButtonSmall({ label, onClick, type }: any) {
    return (
        <button
            onClick={onClick}
            type={type}
            className="bg-sky-900 hover:bg-sky-100  rounded-xl hover:rounded-lg
            text-xs text-gray-200 hover:text-black lg:p-1 text-center ease-in-out
            duration-300 hover:h-9 hover:shadow-xl hover:w-15 h-8 w-12 lg:h-8 lg:w-14"
        >
            {label}
        </button>
    );
}
