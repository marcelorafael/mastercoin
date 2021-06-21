import React from 'react'
import { View, Text } from 'react-native'

const New = () => {
  return (
    <View>
      <Text>New</Text>
    </View>
  )
}

const NewMemo = React.memo(New)
export { NewMemo as New }