export function Button({ label, onClick, type }: any) {
    return (
        <button
            onClick={onClick}
            type={type}
            className="w-full text-gray-600 hover:text-gray-200 bg-slate-100 hover:bg-black border-2 hover:border-2 font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2"
        >
            {label}
        </button>
    );
}
