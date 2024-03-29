export function InputBox({
    label,
    placeholder,
    onChange,
    type,
    id,
    name,
}: any) {
    return (
        <div>
            <div className="text-sm font-medium text-left py-2">{label}</div>
            <input
                name={name}
                type={type}
                onChange={onChange}
                placeholder={placeholder}
                id={id}
                className="w-full transform focus:scale-105 duration-300 ease-in-out 
                px-2 py-2 bg-neutral-900 rounded-md border-slate-200 focus:outline-none"
            />
        </div>
    );
}
