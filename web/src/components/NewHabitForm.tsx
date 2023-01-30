import { Check } from "phosphor-react";

export function NewHabitForm() {
    return (
        <form className="w-full flex flex-col mt-6">
            <label htmlFor="title" className="font-semibold leading-tight">What habit do you want to create?</label>

            <input
                type='text'
                id='title'
                placeholder="ex.: Exercise, drink 3L of water, etc..."
                autoFocus
                className="p-4 rounded-lg mt-3 bg-zinc-800 placeholder:text-zinc-400"
            />

            <label htmlFor="frequency" className="font-semibold leading-tight mt-4">What's the frequency?</label>

            <button type="submit" className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500">
                <Check size={20} weight="bold" />
                Create
            </button>
        </form>
    )
}