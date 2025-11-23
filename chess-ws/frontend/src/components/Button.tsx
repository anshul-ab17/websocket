export const Button = ({onClick,children}:{onClick:()=> void, children:React.ReactNode }) => {
    return(
        <button onClick={onClick}
            className="rounded-3xl bg-green-900 px-4 py-2 text-amber-50 text-3xl font-bold hover:bg-amber-950">
                {children}
        </button>
    )
}