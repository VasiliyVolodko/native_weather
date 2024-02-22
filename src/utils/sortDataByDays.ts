import { IForecastResponse } from "@/api"
import { IMinMax, findMinMaxTemp } from "./findMinMaxTemp"

export const sortDataByDays = (list: IForecastResponse['list']): Array<[string, IMinMax]> => {
  const sortedList: Record<string, IForecastResponse['list']> = {}
  list.forEach((timestamp) => {
    const date = new Date(timestamp.dt * 1000)
    if (sortedList[date.toLocaleDateString('en-us', { weekday: 'short' })]) {
      sortedList[date.toLocaleDateString('en-us', { weekday: 'short' })].push(timestamp)
    } else {
      sortedList[date.toLocaleDateString('en-us', { weekday: 'short' })] = [timestamp]
    }
  })

  const sortedResult = Object.entries(sortedList).map(([weekday, timestamps]) => {
    const sortedMinMax = findMinMaxTemp(timestamps)
    return [weekday, sortedMinMax]
  })

  return sortedResult as Array<[string, IMinMax]>
}
