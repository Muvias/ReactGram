export function Message({ msg, type }) {
    return (
        <div className={`flex justify-center items-center py-[5px] px-[10px] border rounded-md ${type === 'error' ? 'border-[#f5c6cb] text-[#721c24] bg-[#f8d7da]' : ''} ${type === 'success' ? 'border-[#c3e6cb] text-[#155724] bg-[#d4edda]' : ''}`}>
            <p>{msg}</p>
        </div>
    );
};