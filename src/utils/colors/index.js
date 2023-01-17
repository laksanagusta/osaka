import { color } from "react-native-reanimated";

const { Colors } = require("react-native/Libraries/NewAppScreen");

const mainColors = {
    green1:'#04583C',
    dark1: '#5B6274',
    dark2: '#C1C2CC',
    dark3: '#8092AF',
    grey1: '#C4C4C4',
    grey2: '#E9E9E9',
    grey3: '#EDEEF0',
    grey4: '#B1B7C2',
    darkGreen: '#031115',
    orange: 'white',
    orange2: '#F3382D',
    blue1: '#0066CB',
    black1:'#000000',
    black2: '#1F1F1F',
    red1: '#E06379',
    lightGreen: '#52E0B5',
    violet: '#FFD58C', 
    fonts:'#F1F1F1',
    orangeMuda:'#FCF9F5',
    defaultBg:'#F5F3EA',
    unguTua:'#5B428F',
    orangeTua:'#5B428F',
    orangeMudaMax:'#FCF9F5',

    grey01:'#FAFCFC',
    grey02:'#969696',
    black01:'#1E1E1E',

    blue:'#095DE0',
    blue02:'#EAEEFD'

}

export const colors = {
    grey01:mainColors.grey01,
    grey02:mainColors.grey02,
    black01:mainColors.black01,

    orangePrimary:mainColors.orangeTua,
    violet:mainColors.unguTua,
    orangeMuda:mainColors.orangeMuda,
    orangeMudaMax:mainColors.orangeMudaMax,
    primary: mainColors.green1,
    secondary: mainColors.dark1,
    tabBar: '#F2F3F8',
    header:mainColors.violet,
    subTitle : mainColors.dark3,
    disable : mainColors.grey3,
    tertiary : mainColors.blue1,
    fonts : mainColors.fonts,
    defaultbg:mainColors.defaultBg,
    cardObat:mainColors.violet,
    white: 'white',
    black: mainColors.black01,
    text: {
        primary: mainColors.black2,
        secondary: mainColors.grey02,
        menuInactive: mainColors.grey02,
        menuActive: mainColors.black01,
        subTitle: mainColors.dark3
    },
    button: {
        primary: {
            background: mainColors.blue,
            text: 'white',
        },
        secondary: {
            background:mainColors.blue02,
            text:mainColors.black01,
        },
        disable :
        {
            background:mainColors.grey3,
            text:mainColors.grey4
        }
    },
    buttonSmall: {
        primary: {
            background: mainColors.black01,
            text: 'white',
        },
        secondary: {
            background:'white',
            text:mainColors.dark1,
        },
        disable :
        {
            background:mainColors.grey3,
            text:mainColors.grey4
        }
    },
    cardLights: mainColors.orange,
    border: mainColors.grey2,
    loadingBackground: mainColors.black2,
    error:mainColors.red1
}