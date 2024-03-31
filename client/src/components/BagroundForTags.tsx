function BagroundForTags({ label }: any) {
    return (
        <button
            className="w-full px-5 py-2.5 bg-stone-700  rounded-md hover:rounded-lg
            text-xs text-stone-300 font-md hover:text-black text-center duration-300 ease-in-out
            hover:shadow-xl transform hover:scale-105 overflow-hidden"
        >
            {label}
        </button>
    );
}

export default BagroundForTags;
