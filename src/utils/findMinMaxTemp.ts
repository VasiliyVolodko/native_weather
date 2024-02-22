import { IForecastResponse } from "@/api"

export interface IMinMax {
  min: IForecastResponse['list'][0]
  max: IForecastResponse['list'][0]
}

export const findMinMaxTemp = (list: IForecastResponse['list']): IMinMax => {
  let min = list[0]
  let max = list[0]

  list.forEach(timestamp => {
    if (timestamp.main.temp > max.main.temp) {
      max = timestamp
    }
    if (timestamp.main.temp < min.main.temp) {
      min = timestamp
    }
  })
  return {
    min,
    max
  }
}