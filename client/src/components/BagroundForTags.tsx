function BagroundForTags({ label }: any) {
    return (
        <button
            className="w-full py-2.5 px-4 bg-stone-700 rounded-md hover:rounded-lg
            text-xs text-stone-300 font-md hover:text-black text-center duration-300 ease-in-out
            hover:shadow-xl transform hover:scale-105 overflow-hidden whitespace-nowrap overflow-ellipsis"
            style={{
                maxWidth: "100%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
            }}
            title={label}
        >
            {label}
        </button>
    );
}

export default BagroundForTags;
