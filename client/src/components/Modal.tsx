function Modal({ title, message, isOpen, onClose }: any) {
    return (
        <>
            {isOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center p-8 min-h-screen">
                        <div
                            className="fixed inset-0 animate-fade-in duration-300 ease-in-out"
                            onClick={onClose}
                        >
                            <div className="absolute inset-0 bg-black opacity-75"></div>
                        </div>
                        <div className="relative bg-stone-900 p-2 rounded-lg">
                            <div className="p-4">
                                {" "}
                                <div className="text-xl text-center text-gray-300 font-bold mb-4">
                                    {title}
                                </div>
                                <div className="text-center text-gray-300">
                                    {message}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Modal;
