function SideBarRow({ Icon, title, onClick }: any) {
    return (
        <div
            className="flex items-center text-stone-100 px-4 py-3 cursor-pointer hover:bg-stone-900 ease-in-out duration-300 rounded-lg transition-all max-w-fit"
            onClick={onClick}
        >
            <Icon className="fill-white h-6 w-6" />
            <p className="text-center ml-2 md:inline text-sm">{title}</p>
        </div>
    );
}

export default SideBarRow;
