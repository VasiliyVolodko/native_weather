import { 
  FlatList, 
  Image, 
  Pressable, 
  ScrollView, 
  StyleSheet, 
  Text, 
  View 
} from "react-native";
import { observer } from 'mobx-react-lite'
import { useMst } from "@/store/Root";
import { useMemo } from "react";
import { 
  ForecastDay,
  WeatherParametr, 
  Switcher 
} from "@/components";
import { sortDataByDays, getImageUrl } from "@/utils";
import { 
  mainBackgroundColor, 
  textColorWhite, 
  textColorGrey, 
  secondaryBackgroundColor 
} from "@/consts/style";

function CityWeatherPage({ navigation }) {
  const { 
    getSelectedCity: { city: { name }, list }, 
    isCelsius, 
    toggleDegrees, 
    cityList: { getData } 
  } = useMst();

  const sortedList = useMemo(() => {
    return sortDataByDays(list)
  },[list])

  const weatherParameters = useMemo(() => {
    const [{ main, visibility, wind }] = list
    return {
      humidity: `${main.humidity} %`,
      pressure: `${main.pressure} hPa`,
      visibility: `${visibility / 1000} km`,
      ['wind speed']: `${wind.speed.toPrecision(2)} m/s`
    }
  }, [list])
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.backSymbol}>{"\u003C"}</Text>
        </Pressable>
        <Text style={styles.headerText}>Air Conditions</Text>
      </View>
      <View>
        <View>
          {
            getData().length !== 0 &&
            <Switcher
              textOn='Celsius'
              textOff='Farenheit'
              toggleHandler={toggleDegrees}
              isEnabled={isCelsius}
            />
          }
          <Text style={styles.cityText}>{name}</Text>
          <Text style={styles.weatherDescriptionText}>{list[0].weather[0].description}</Text>
          <Image style={styles.image} source={getImageUrl(list[0].weather[0].icon)} />
          <Text style={styles.degreeText}>{`${list[0].main.temp.toFixed(0)}\u2103`}</Text>
        </View>
        <View style={styles.hourlyForecast}>
          <ScrollView horizontal={true}>
            {
              list.slice(0, 9).map((timestamp, index) => {
                return (
                  <View key={index} style={styles.hourlyForecastContainer}>
                    <Text style={styles.timestampsText}>{index === 0 ? 'Now' : (new Date(timestamp.dt* 1000).getHours())}</Text>
                    <Image style={styles.icon} source={getImageUrl(timestamp.weather[0].icon)} />
                    <Text style={styles.timestampsText}>{isCelsius ? `${timestamp.main.temp.toFixed(0)}\u00B0C` : `${timestamp.main.tempFar.toFixed(0)}\u00B0F`}</Text>
                  </View>
                )
              })
            }
          </ScrollView>
        </View>
        <View style={styles.daylyForcast}>
          <View>
            <Text style={styles.forcastHeaderText}>Forecst for 5 days</Text>
          </View>
          {
            sortedList.map(([weekday, {min, max}], index) => {
              return (
                <ForecastDay
                  key={index}
                  text={index === 0 ? 'Today' : weekday}
                  minTemp={isCelsius ? `${min.main.temp.toFixed(0)}\u00B0C` : `${min.main.tempFar.toFixed(0)}\u00B0F`}
                  maxTemp={isCelsius ? `${max.main.temp.toFixed(0)}\u00B0C` : `${max.main.tempFar.toFixed(0)}\u00B0F`}
                  weatherDescription={min.weather[0].description}
                  weatherIconUrl={min.weather[0].icon}
                />
              )
            })
          }
        </View>
        <View>
          <FlatList
            scrollEnabled={false}
            style={styles.additionalInfo}
            data={Object.entries(weatherParameters)}
            numColumns={2}
            renderItem={({ item: [key, value] }) => <WeatherParametr value={value} propertyName={key} />}
            keyExtractor={([key]) => key}
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default observer(CityWeatherPage)

const styles = StyleSheet.create({
  container: {
    paddingTop: '15%',
    flex: 1,
    backgroundColor: mainBackgroundColor,
    color:textColorWhite
  },
  hourlyForecastContainer: {
    alignItems: 'center'
  },
  weatherHeader: {
    height: 300
  },
  daylyForcastContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 40
  },
  forcastHeaderText: {
    color: textColorGrey,
    fontSize: 15,
    height: 25,
    marginLeft: 10
  },
  tempGroup: {
    flex: 3,
    alignItems: 'center'
  },
  daylyForcast: {
    marginTop: 20,
    width: '90%',
    backgroundColor: secondaryBackgroundColor,
    alignSelf: 'center',
    borderRadius: 20,
    padding: 10
  },
  additionalInfo: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    height: 300
  },
  image: {
    width: 250,
    height: 150,
    alignSelf: 'center'
  },
  icon: {
    width: 50,
    height: 30
  },
  timestampsText: {
    color: textColorGrey,
    fontSize: 15,
    flex: 1
  },
  hourlyForecast: {
    height: 100,
    width: '90%',
    backgroundColor: secondaryBackgroundColor,
    alignSelf: 'center',
    borderRadius: 20,
    padding: 10
  },
  backSymbol: {
    alignSelf: 'center',
    margin: 10,
    color: textColorGrey,
    fontSize: 30,
    flexGrow: 1
  },
  cityText: {
    alignSelf: 'center',
    marginTop: 10,
    color: textColorWhite,
    fontSize: 40
  },
  headerText: {
    alignSelf: 'center',
    fontSize: 20,
    color: textColorGrey
  },
  degreeText: {
    alignSelf: 'center',
    marginTop: 10,
    color: textColorWhite,
    fontSize: 40,
    marginBottom: 15
  },
  weatherDescriptionText: {
    alignSelf: 'center',
    color: textColorGrey,
    fontSize: 20,
    flexGrow: 2
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
})
