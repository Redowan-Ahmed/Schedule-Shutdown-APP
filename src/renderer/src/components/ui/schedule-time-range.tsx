/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Input } from './input'
import { FormEvent, useState } from 'react'
import { Button } from './button'

function ScheduleTimeRange(): JSX.Element {
  const [current, setCurrent] = useState<number>(1)
  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    console.log(current)
    console.log(e)
  }
  return (
    <div className="py-7 px-5 border border-zinc-800 rounded-md space-y-3 ">
      <h1 className="text-center font-bold text-3xl">Schedule By Time Range ( Hours )</h1>
      <p className="text-center text-zinc-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat laboriosam explicabo omnis
        nulla asperiores. Commodi iste, ipsum eius accusamus veniam ullam odit quas voluptates
        magnam quidem, quasi tempore in veritatis.
      </p>
      <div>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <label>Set Shutdown Hours from now: </label>
          <div className="flex align-middle items-center gap-4">
            <Input
              type="range"
              min={0.1}
              max={72}
              step={0.1}
              className="bg-slate-700"
              onChange={(e) => {
                setCurrent(Number(e.target.value))
              }}
              value={current.toString()}
            />
            <span className="font-bold transition-all bg-zinc-900 px-3 py-1 rounded-lg">
              {current.toString()}
            </span>
          </div>
          <Button className="w-full bg-zinc-800 p-3 font-bold text-lg h-fit" type="submit">
            Shutdown After {current.toString()} Hours{' '}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ScheduleTimeRange
