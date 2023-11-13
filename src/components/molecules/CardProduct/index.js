import { Text, View, StyleSheet, Image } from "react-native"
import { colors, config, fonts } from "../../../utils"
import { Gap } from "../../atoms"

const CardProduct = ({price, title, url, description}) => {
    return (
        <View style={styles.cardProduct}>
            <Image 
                source={{ uri : config.url +"/"+ url}}
                style={styles.image}
            />
            <Gap height={10}/>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>{price}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    )
}

export default CardProduct

const styles = StyleSheet.create({
    image: {
        width: 136, // Set the width as per your requirement
        height: 100, // Set the height as per your requirement
        borderRadius: 10
    },
    cardProduct: {
        borderWidth: 1,
        borderColor: colors.cardLights,
        backgroundColor: colors.white,
        width: '48%',
        padding: 8,
        borderRadius: 10,   
        marginRight:12,
        marginBottom: 12
    },
    title: {
        fontFamily:fonts.primary[400],
        color:colors.text.primary
    },
    price: {
        fontFamily:fonts.primary[700],
        color:colors.text.primary
    },
    description: {
        fontFamily:fonts.primary[300],
        color:colors.text.secondary,
        fontSize:12
    }
})