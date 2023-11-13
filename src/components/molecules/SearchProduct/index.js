import React, { useEffect, useState } from 'react'
import {StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native'
import { colors, fonts } from '../../../utils'
import { IconSearch } from '../../../assets'

const SearchProduct = ({onChangeText, secureTextEntry, disable, placeholder}) => {
    const [border, setBorder] = useState(colors.border)

    const [inputValue, setInputValue] = useState("")

    const onFocusForm = () => {
        setBorder(colors.tertiary)
    }
    const onBlurForm = () => {
        setBorder(colors.border)
    }

    return (
        <View style={styles.wrapper}>
            <TextInput 
                style={styles.input(border)}
                onFocus={onFocusForm} 
                onBlur={onBlurForm} 
                secureTextEntry={secureTextEntry} 
                value={inputValue} 
                placeholder={placeholder}
                placeholderTextColor={colors.grey02}
                onChangeText={(e) => setInputValue(e)} 
                editable={!disable} 
                selectTextOnFocus={!disable}
            />
            <IconSearch/>
        </View>
    )
}

export default SearchProduct

const styles = StyleSheet.create({
    wrapper: {
        borderWidth:1,
        borderRadius: 100,
        backgroundColor: colors.white,
        height:50,
        paddingHorizontal:10,
        paddingVertical:20,
        borderColor:colors.grey02,
        flexDirection:"row",
        justifyContent:"center",
        alignContent:"center",
        alignItems: "center"
    },
    input: border => ({
        width:260,
        padding:5,
        color:colors.text.primary,
        fontFamily: fonts.primary[400],
        backgroundColor: colors.white,
        height:35
    })
})