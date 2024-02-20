import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.textContainer}>
        Refer to the task details in <Text style={styles.highlight}>ASSIGNMENT.md</Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  highlight: { fontWeight: 'bold' },
  textContainer: { textAlign: 'center', margin: 10 },
})
