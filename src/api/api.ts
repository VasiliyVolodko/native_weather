import { baseCountryUrl, baseForecastUrl, baseGeoUrl } from "@/consts/apiRoutes"
import type { ICountryCodeMapperResponse, IForecastResponse, IGeoResponse } from "."

/**
 * Maps country code to country name
 *
 * @param countryCode in iso_2 format
 * @returns Full country name
 */
export const fetchCountryName = async (countryCode: string): Promise<ICountryCodeMapperResponse> => {
  return (await fetch(`${baseCountryUrl}?select=label_en&where=iso2_code='${countryCode}'`)).json()
}

export const fetchCoordinates = async (cityName: string): Promise<IGeoResponse[]> => {
  return (await fetch(`${baseGeoUrl}?q=${cityName}&limit=100&appid=${process.env.EXPO_PUBLIC_API_KEY}`)).json()
}

export const fetchForecast = async (lat: number, lon: number, units = 'metric'): Promise<IForecastResponse> => {
  return (await fetch(`${baseForecastUrl}?lat=${lat}&lon=${lon}&appid=${process.env.EXPO_PUBLIC_API_KEY}&units=${units}`)).json()
}