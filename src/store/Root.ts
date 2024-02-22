import { Instance, types } from "mobx-state-tree";
import { createContext, useContext } from "react";
import { CityList, ForecastData } from "./Weather";

const RootStore = types
  .model({
    cityList: CityList,
    selectedCity: types.maybeNull(types.reference(ForecastData)),
    isCelsius: types.boolean
  })
  .views(self => ({
    get getSelectedCity() {
      return self.selectedCity
    }
  }))
  .actions((self) => ({
    setSelectedCity: (id: any) => {
      self.selectedCity = id
    },
    clearData: () => {
      self.cityList.forecast = undefined
      self.cityList.setError(false, '')
      self.selectedCity = null
    },
    toggleDegrees: () => {
      self.isCelsius = !self.isCelsius
    }
  }))

export const store = RootStore.create({
  cityList: {
    forecast: undefined,
    isLoading: false,
    error: {
      isError: false,
      errorMessage: ''
    }
  },
  isCelsius: true,
  selectedCity: null
})

export type RootInstance = Instance<typeof RootStore>;
const RootStoreContext = createContext<null | RootInstance>(null);

export const Provider = RootStoreContext.Provider;
export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}