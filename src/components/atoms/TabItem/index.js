import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { IconHomePrimary, IconHomeSecondary, IconInvPrimary, IconInvSecondary, IconTransactionPrimary, IconTransactionSecondary, IconUserPrimary, IconUserSecondary } from '../../../assets'
import { colors, fonts } from '../../../utils'

const TabItem = ({title, active, onPress, onLongPress}) => {
    const Icon = () => {
        if(title === "Home")
        {
            return active ? <IconHomePrimary/> : <IconHomeSecondary/>
        }
        if(title === "Master")
        {
            return active ? <IconInvPrimary/> : <IconInvSecondary/>
        }
        if(title === "Order")
        {
            return active ? <IconTransactionPrimary/> : <IconTransactionSecondary/>
        }
        if(title === "User")
        {
            return active ? <IconUserPrimary/> : <IconUserSecondary/>
        }
    }
    return (
        <TouchableOpacity style={styles.container} onPress={onPress} onLongPress={onLongPress}>
            <Icon/>
            {/* <Text style={styles.text(active)}>{title}</Text> */}
        </TouchableOpacity>
    )
}

export default TabItem

const styles = StyleSheet.create({
    container: {
        alignItems:'center',
    },
    text : (active) => ({
        fontSize:10, 
        color: active ? colors.text.menuActive : colors.text.menuInactive, 
        fontFamily: fonts.primary[600], 
        marginTop:4
    })
})