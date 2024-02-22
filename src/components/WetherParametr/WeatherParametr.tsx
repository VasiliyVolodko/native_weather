import { 
  StyleSheet, 
  Text, 
  View 
} from "react-native"
import { 
  secondaryBackgroundColor, 
  textColorGrey, 
  textColorWhite 
} from "@/consts/style"

interface IParametr {
  propertyName: string,
  value: string | number
}

export const WeatherParametr = ({
  propertyName,
  value
}: IParametr) => {
  return (
    <View style={styles.container}>
      <Text style={styles.parametrText}>{propertyName}</Text>
      <Text style={styles.valueText}>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    maxWidth: '50%',
    flex: 1,
    alignItems: 'center',
    height: 100,
    backgroundColor: secondaryBackgroundColor,
    borderRadius: 20,
    padding: 10,
    margin: 5,
    justifyContent: 'space-evenly'
  },
  parametrText: {
    color: textColorGrey,
    textTransform: 'uppercase',
    fontSize: 20
  },
  valueText: {
    color: textColorWhite,
    fontSize: 30
  }
})