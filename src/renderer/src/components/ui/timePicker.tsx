import { FormEvent, useEffect, useState } from 'react'
import { Button } from './button'
import { Input } from './input'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from './drawer'

function TimePicker(): JSX.Element {
  const currentTime = new Date().toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  })
  let currentTimeChecked: string = currentTime.split(' ')[0]
  if (currentTimeChecked.split(':')[0].length < 2) {
    console.log(currentTimeChecked.split(':')[0].length)
    currentTimeChecked = `0${currentTimeChecked.split(':')[0]}:${currentTimeChecked.split(':')[1]}`
  }
  const [time, setTime] = useState<string>(currentTimeChecked)
  const [open, setOpen] = useState<boolean>(false)

  function handleSubmit(e: FormEvent): void {
    e.preventDefault()
    const selectedDate = new Date()
    const [selectedHours, selectedMinutes] = time.split(':').map(Number)
    selectedDate.setHours(selectedHours, selectedMinutes, 0, 0)
    const durationInMilliseconds: number = Number(selectedDate) - Number(new Date())
    const durationInSeconds: number = Math.floor(durationInMilliseconds / 1000)
    window.electron.ipcRenderer.send('timePickerSubmit', durationInSeconds)
    console.log(durationInSeconds, time)
    setOpen(false)
  }

  function handleSubmitClick(): void {
    const selectedDate = new Date()
    const [selectedHours, selectedMinutes] = time.split(':').map(Number)
    selectedDate.setHours(selectedHours, selectedMinutes, 0, 0)
    const durationInMilliseconds: number = Number(selectedDate) - Number(new Date())
    const durationInSeconds: number = Math.floor(durationInMilliseconds / 1000)
    window.electron.ipcRenderer.send('timePickerSubmit', durationInSeconds)
    console.log(durationInSeconds, time)
    setOpen(false)
  }

  useEffect(() => {
    window.electron.ipcRenderer.on('form-submission-response', (event, message) => {
      console.log(message, event)
    })
    return (): void => {
      window.electron.ipcRenderer.removeAllListeners('form-submission-response')
    }
  }, [])

  return (
    <div className="py-7 px-5 border border-zinc-800 rounded-md space-y-3">
      <h1 className="text-center font-bold text-3xl">Schedule By Clock Time</h1>
      <p className="text-center text-zinc-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat laboriosam explicabo omnis
        nulla asperiores. Commodi iste, ipsum eius accusamus veniam ullam odit quas voluptates
        magnam quidem, quasi tempore in veritatis.
      </p>
      <div>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <label htmlFor="time">Set Shutdown Hours from now: </label>
          <label
            htmlFor="time"
            className="text-white flex justify-center focus:ring-blue-500 focus:border-blue-500 p-4 border rounded-lg border-zinc-800 cursor-pointer"
          >
            <Input
              onChange={(e) => setTime(e.target.value)}
              type="time"
              min="0.1"
              max="72"
              id="time"
              value={time}
              required
              className="focus:ring-transparent focus-visible:ring-transparent focus:outline-none focus:border-transparent block border-transparent dark:placeholder-gray-400 dark:text-white text-center text-4xl md:text-4xl placeholder:text-4xl w-auto font-bold"
            />
          </label>
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger className="w-full bg-zinc-800 p-3 font-bold text-lg h-fit uppercase">
              System Will Be Shutdown at {time}
            </DrawerTrigger>

            <DrawerContent className="bg-zinc-900 border-none">
              <DrawerHeader className="text-white text-center">
                <DrawerTitle className="text-center">Are you absolutely sure?</DrawerTitle>
                <DrawerDescription className="text-center">
                  This action cannot be undone.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter className="">
                <Button
                  onClick={handleSubmitClick}
                  className="w-full bg-zinc-800 p-3 font-bold text-lg h-fit uppercase"
                  type="submit"
                >
                  I Confirm The System Will Be Shutdown at {time}
                </Button>
                <DrawerClose>
                  <Button
                    className="w-full bg-red-800 p-3 font-bold text-lg h-fit uppercase text-white border-none"
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </form>
      </div>
    </div>
  )
}

export default TimePicker
