/* eslint-disable eqeqeq */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";

type CardProps = {
    handlePress: () => void;
    thumbnail: string,
    title: string,
    numberOfViews: number,
    description: string | undefined
}

function Card({ handlePress, thumbnail, title, numberOfViews }: CardProps): React.JSX.Element {
    return (
        <View style={{ width: "100%", marginVertical: 20, borderRadius: 5 }} key={title}>
            <TouchableOpacity
                onPress={handlePress
                }
            >
                <Image
                    style={styles.img}
                    source={{
                        uri: thumbnail,
                    }}
                    alt="some image"
                />
                <Text style={styles.textName}>{title}</Text>
                <Text style={{ textAlign: 'left', fontStyle: 'italic' }}> {`Number Of Views : ${numberOfViews}`} </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    textName: {
        fontSize: 18,
        color: "black",
        textAlign: 'left',
        fontStyle: 'italic',
        marginBottom: 5,
    },

    img: {
        width: "100%",
        height: 300,
        objectFit: "cover",
        borderRadius: 10,
        marginBottom: 20,
    },
});

export default Card;
