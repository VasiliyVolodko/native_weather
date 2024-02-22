import { 
  Image, 
  StyleSheet, 
  Text, 
  View 
} from "react-native"
import { getImageUrl } from "@/utils/getImageUrl"
import { textColorGrey } from "@/consts/style"

interface IForecastDay {
  text: string,
  weatherIconUrl: string
  weatherDescription: string
  minTemp: string
  maxTemp: string
}

export const ForecastDay = ({
  text,
  weatherIconUrl,
  weatherDescription,
  minTemp,
  maxTemp
}: IForecastDay) => {
  return (
    <View>
      <View style={styles.divider}></View>
      <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
        <Image style={styles.icon} source={getImageUrl(weatherIconUrl)} />
        <View style={styles.tempGroup}>
          <Text style={styles.text}>from: {minTemp}</Text>
          <Text style={styles.text}>to: {maxTemp}</Text>
        </View>
        <Text style={styles.descriptionText}>{weatherDescription}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  divider: {
    width: '95%',
    alignSelf: 'center',
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)'
  },
  container: {
    margin: 7,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 40
  },
  tempGroup: {
    flex: 2,
    alignItems: 'center'
  },
  icon: {
    width: 40,
    height: 30
  },
  text: {
    color: textColorGrey,
    fontSize: 15,
    flex: 1
  },
  descriptionText: {
    color: textColorGrey,
    fontSize: 15,
    flex: 2
  }
})