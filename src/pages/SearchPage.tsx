import React, { useEffect, useState } from 'react'
import { 
  FlatList, 
  NativeSyntheticEvent, 
  Pressable, 
  StyleSheet, 
  Text, 
  TextInput, 
  TextInputChangeEventData,
  TextInputEndEditingEventData, 
  View 
} from 'react-native'
import { observer } from 'mobx-react-lite'
import { useMst } from '@/store/Root'
import { 
  ErrorMessage, 
  LoadingSpinner, 
  City, 
  Switcher 
} from '@/components'
import { 
  mainBackgroundColor, 
  secondaryBackgroundColor, 
  textColorGrey, 
  textColorWhite 
} from '@/consts/style'
import { useNetInfo } from "@react-native-community/netinfo";

function SearchPage({ navigation }) {
  const { 
    cityList: { isLoading, fetchData, getData, error: { isError, errorMessage }, setError },
    clearData, 
    isCelsius, 
    toggleDegrees, 
    setSelectedCity
  } = useMst();
  const [value, setValue] = useState<string>('')
  const netInfo = useNetInfo()

  const handleEndEditing = async (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
    const cityName = e.nativeEvent.text
    await fetchData(cityName)
  }

  const handleClearInput = () => {
    setValue('')
    clearData()
  }

  const handleChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setValue(e.nativeEvent.text)
  }

  useEffect(() => {
    if(!netInfo.isConnected) {
      setError(true, "You are offline")
    } else {
      setError(false, '')
    }
  },[netInfo])
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput value={value} onChange={handleChange} onEndEditing={handleEndEditing} style={styles.input} placeholder='Enter city name' placeholderTextColor={textColorGrey} />
        <Pressable style={styles.cancelButton} onPress={handleClearInput}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </Pressable>
      </View>
      {
        isError &&
        <ErrorMessage message={errorMessage} />
      }
      {
        getData().length !==0 &&
        <Switcher
          textOn='Celsius'
          textOff='Farenheit'
          toggleHandler={toggleDegrees}
          isEnabled={isCelsius}
        />
      }
      {
        !isError && isLoading
          ? <LoadingSpinner color="#1D2837" />
          : <FlatList
                contentContainerStyle={styles.weatherList}
                data={getData()}
                keyExtractor={item => `lat: ${item.city.coord.lat}; lon: ${item.city.coord.lon}`}
                renderItem={({ item }) => <City
                  country={item.city.country}
                  name={item.city.name}
                  id={item.id}
                  onTouchHandler={setSelectedCity}
                  navigation={navigation}
                  temp={isCelsius ? `${item.list[0].main.temp.toFixed(0)}\u00B0C` : `${item.list[0].main.tempFar.toFixed(0)}\u00B0F`}
                  weatherIconUrl={item.list[0].weather[0].icon}
                />}
              />
      }
    </View>
  )
}

export default observer(SearchPage)

const styles = StyleSheet.create({
  container: {
    paddingTop: '15%',
    flex: 1,
    backgroundColor: mainBackgroundColor,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  header: {
    width: '95%',
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center'
  },
  cancelButton: {
    width: 'auto',
    fontSize: 18,
    color: textColorGrey,
    alignSelf: 'center'
  },
  highlight: { fontWeight: 'bold' },
  textContainer: { textAlign: 'center', margin: 10 },
  input: {
    backgroundColor: secondaryBackgroundColor,
    height: 40,
    margin: 12,
    marginBottom: 0,
    borderRadius: 10,
    padding: 10,
    color: textColorWhite,
    flex: 1
  },
  weatherList: {
    display: 'flex',
    gap: 10,
    alignItems: 'center'
  }
})
