import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx'
import { ProgressBar } from './ProgressBar';

interface HabitDayProps {
    completed: number
    amount: number
}

export function HabitDay({ completed, amount }: HabitDayProps) {
    const percentCompleted = Math.round((completed / amount) * 100)

    return (
        <Popover.Root>
            <Popover.Trigger
                className={clsx('w-10 h-10 border-2 rounded-lg', {
                    'bg-zinc-900 border-zinc-800 ': percentCompleted == 0,
                    'bg-violet-900 border-violet-800': percentCompleted > 0 && percentCompleted < 20,
                    'bg-violet-800 border-violet-700': percentCompleted >= 20 && percentCompleted < 40,
                    'bg-violet-700 border-violet-600': percentCompleted >= 40 && percentCompleted < 60,
                    'bg-violet-600 border-violet-500': percentCompleted >= 60 && percentCompleted < 80,
                    'bg-violet-500 border-violet-400': percentCompleted >= 80,
                })}
            />

            <Popover.Portal>
                <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col'>
                    <span className='font-semibold text-zinc-400'>zeca-feira</span>
                    <span className='mt-1 font-extrabold leading-tight text-3xl'>30/01</span>

                    <ProgressBar progress={percentCompleted} />

                    <Popover.Arrow height={8} width={16} className='fill-zinc-900' />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}