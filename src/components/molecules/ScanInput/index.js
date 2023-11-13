import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useState} from 'react'
import { colors, fonts } from '../../../utils'
import { dataHelper } from '../../../_helper/data'
import { Button, Input } from '../../atoms'

const ScanInput = () => {
  const [code, setCode] = useState("")

  return (
    <View style={styles.scanComponent}> 
        <View width="80%">
            <Input label='Code' value={code} onChangeText={value => setCode(value)}/>
        </View>
        <View width="20%">
            <Button type="primary" title="SCAN" onPress={() => setIsScanning(true)}/>
        </View>
    </View>
  )
}

export default ScanInput

const styles = StyleSheet.create({
    scanComponent : {
        flexDirection: "row",
        flex: 1
    },
})