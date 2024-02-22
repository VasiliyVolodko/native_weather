import { 
  View, 
  Text, 
  StyleSheet, 
  Image 
} from "react-native"
import { getImageUrl } from '@/utils'
import { secondaryBackgroundColor, textColorWhite } from "@/consts/style";

interface ICity {
  name: string,
  country: string,
  weatherIconUrl: string,
  temp: string
  onTouchHandler: () => void
}

export const City = ({
  country,
  name,
  onTouchHandler,
  temp,
  weatherIconUrl
}: ICity) => {

  return (
    <View style={styles.card} onTouchEnd={onTouchHandler}>
      <View style={styles.weatherIconContainer}>
        <Image style={styles.weatherIcon} source={getImageUrl(weatherIconUrl)}/>
      </View>
      <View style={styles.countryContainer}>
        <Text style={styles.cityText}>{name}</Text>
        <Text style={styles.countryText}>{country}</Text>
      </View>
      <View style={styles.temperatureContainer}>
        <Text style={styles.temperatureText}>{temp}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '90%',
    height: 90,
    backgroundColor: secondaryBackgroundColor,
    padding: 7,
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  weatherIcon: {
    width: 50,
    height: 50
  },
  weatherIconContainer: {
    flexGrow: 1
  },
  cityText: {
    fontSize: 20,
    color: textColorWhite
  },
  countryText: {
    color: textColorWhite,
    opacity: 0.5
  },
  countryContainer: {
    flexGrow: 8
  },
  temperatureContainer: {
    flexGrow: 1
  },
  temperatureText: {
    fontSize: 20,
    color: textColorWhite
  }
})