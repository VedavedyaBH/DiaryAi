function InputBar({ value, onChange, onClick, palceholder, type }: any) {
    onClick = { onClick };

    return (
        <>
            <div className="absolute flex justify-between item-center">
                <input
                    type={type}
                    placeholder={palceholder}
                    className="rounded-xl focus:rounded-lg mr-4 text-sm p-1 border focus:outline-0
                    focus:w-64 focus:shadow-xl ease-in-out duration-300 h-8 w-48 lg:h-8 lg:w-48"
                    value={value}
                    onChange={onChange}
                />
            </div>
        </>
    );
}

export default InputBar;
