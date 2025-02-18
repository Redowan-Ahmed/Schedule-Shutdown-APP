import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import ScheduleTimeRange from './components/ui/schedule-time-range'
import TimePicker from './components/ui/timePicker'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './components/ui/tooltip'
function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  return (
    <>
      <div>
        <div className="flex justify-center align-middle items-center w-full h-screen overflow-hidden">
          <div className="max-w-4xl w-full min-w-[600px] bg- py-12 px-10 rounded-md">
            <Tabs defaultValue="timePicker" className="w-full text-white">
              <TabsList className="grid w-full grid-cols-2 bg-zinc-900 p-2 h-fit">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <TabsTrigger
                        className="w-full text-xl font-bold data-[state=active]:text-white data-[state=active]:bg-zinc-950 p-3 text-zinc-500"
                        value="timePicker"
                      >
                        Pick Time
                      </TabsTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Schedule By the Clock Time and your pc will be shutdown on that time.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <TabsTrigger
                        className="w-full text-xl font-bold data-[state=active]:text-white data-[state=active]:bg-zinc-950 p-3 text-zinc-500"
                        value="scheduleTimeRange"
                      >
                        Time-Range
                      </TabsTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Schedule by specific time range by Hours</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TabsList>

              <TabsContent value="timePicker">
                <TimePicker></TimePicker>
              </TabsContent>
              <TabsContent value="scheduleTimeRange">
                <ScheduleTimeRange></ScheduleTimeRange>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
