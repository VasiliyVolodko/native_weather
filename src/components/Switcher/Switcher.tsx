import { 
  View, 
  Switch, 
  Text, 
  StyleSheet 
} from "react-native"
import { 
  secondaryBackgroundColor, 
  textColorGrey, 
  textColorWhite 
} from "@/consts/style"

interface ISwitcher {
  isEnabled: boolean
  textOn: string
  textOff: string
  toggleHandler: () => void
}

export const Switcher = ({
  isEnabled,
  textOn,
  textOff,
  toggleHandler
}: ISwitcher) => {
  return (
    <View style={styles.swithContainer}>
      <Switch
        trackColor={{ true: secondaryBackgroundColor }}
        thumbColor={textColorWhite}
        onValueChange={toggleHandler}
        value={isEnabled}
      />
      <Text style={styles.switchText}>{isEnabled ? textOn : textOff}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  switchText: {
    fontSize: 20,
    alignSelf: 'center',
    color: textColorGrey,
    marginLeft: 3
  },
  swithContainer: {
    flexDirection: 'row',
    margin: 10,
    alignSelf: 'center'
  }
})