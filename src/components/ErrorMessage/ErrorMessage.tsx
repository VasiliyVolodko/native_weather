import { 
  StyleSheet, 
  Text, 
  View 
} from "react-native"
import { textColorGrey } from "@/consts/style"

export const ErrorMessage = ({ message }: { message?: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.messageText}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignContent: 'center',
    flex: 3
  },
  messageText: {
    marginTop: 10,
    fontSize: 25,
    color: textColorGrey
  }
})