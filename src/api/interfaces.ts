export interface IGeoResponse {
  name: string
  lat: number
  lon: number
  country: string
  isError?: string
}

export interface IForecastResponse {
  list: Array<{
    dt: number,
    weather: Array<{
      main: string
      description: string
      icon: string
    }>,
    main: {
      temp: number
      tempFar?: number
      feels_like: number
      temp_min: number
      temp_max: number
      pressure: number
      humidity: number
      sea_level: number
      grnd_level: number
    },
    visibility: number,
    wind: {
      speed: number,
      deg: number
    }
  }>,
  id: number,
  city: {
    id: number,
    name: string,
    country: string,
    coord: {
      lat: number,
      lon: number
    }
  }
}

export interface ICountryCodeMapperResponse {
  results: Array<{ label_en: string }>
}