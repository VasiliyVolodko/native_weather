import { flow, types, cast } from "mobx-state-tree"
import type { ICountryCodeMapperResponse, IForecastResponse, IGeoResponse } from "@/api"
import { fetchCoordinates, fetchCountryName, fetchForecast } from "@/api"
import { convertCelsiusToFarenheit } from "@/utils"

export const ForecastData = types.model({
  list: types.array(types.model({
    dt: types.number,
    weather: types.array(types.model({
      id: types.number,
      main: types.string,
      description: types.string,
      icon: types.string
    })),
    main: types.model({
      temp: types.maybe(types.number),
      tempFar: types.maybe(types.number),
      feels_like: types.maybe(types.number),
      temp_min: types.maybe(types.number),
      temp_max: types.maybe(types.number),
      pressure: types.maybe(types.number),
      humidity: types.maybe(types.number),
      sea_level: types.maybe(types.number),
      grnd_level: types.maybe(types.number),
    }),
    visibility: types.number,
    wind: types.model({
      speed: types.number,
      deg: types.number
    })
  })),
  id: types.identifierNumber,
  city: types.model({
    id: types.number,
    country: types.string,
    name: types.string,
    sunrise: types.number,
    sunset: types.number,
    coord: types.model({
      lat: types.number,
      lon: types.number
    })
  })
})


export const CityList = types
  .model({
    forecast: types.array(ForecastData),
    isLoading: types.boolean,
    error: types.model({
      isError: types.boolean,
      errorMessage: types.optional(types.string, '')
    })
  })
  .views(self => ({
    getData: () => {
      return self.forecast
    }
  }))
  .actions((self) => ({
    setError: (isError: boolean, message: string) => {
      self.error.isError = isError
      self.error.errorMessage = message
    },
  }))
  .actions((self) => ({
    fetchData: flow(function* fetchData(cityName: string) {
      if(!cityName) {
        self.setError(true, 'Nothing to search')
        return
      }

      self.forecast = undefined
      try {
        self.isLoading = true
        self.setError(false, '')

        const cityList: IGeoResponse[] = yield fetchCoordinates(cityName)

        if (cityList.length === 0) {
          self.setError(true, 'No cities found')
          return
        }

        const cityListWithWeather: Array<[IGeoResponse, ICountryCodeMapperResponse, IForecastResponse]> = yield Promise.all(
          cityList.map(async city => {
            const countryName = fetchCountryName(city.country)
            const forecast = fetchForecast(city.lat, city.lon)
            Promise.resolve(city)
            return Promise.all([Promise.resolve(city), countryName, forecast])
          })
        )

        const result: IForecastResponse[] = cityListWithWeather.map(([city, countryName, forecast]) => {
          forecast.list = forecast.list.map(el => ({
            ...el,
            main: {
              ...el.main,
              tempFar: convertCelsiusToFarenheit(el.main.temp)
            }
          }))
          return {
            ...forecast,
            city: {
              ...forecast.city,
              name: city.name,
              country: countryName.results[0].label_en
            },
            id: forecast.city.id
          }
        })

        // api return dublicated cities values with the same id
        // by this we are removing these dublications
        self.forecast = cast(result.filter((city, index) => {
          return result.findIndex(el => el.id === city.id) === index
        }))

      } catch (e) {
        self.setError(true, e)
      } finally {
        self.isLoading = false
      }
    })
  }))
