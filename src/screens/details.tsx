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

import React, { useEffect, useLayoutEffect } from "react";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import { useQuery } from "@apollo/client";
import { useRoute, useNavigation } from "@react-navigation/native";
import { getCatInfo } from "../graphQL/queries";
import { QueryResult } from "@apollo/client";
import { Query } from "../__generated__/graphql";
import { useMutation } from "@apollo/client";
import { increaseTrackView } from "../graphQL/mutations";
interface RouteParams {
    itemId?: string;
    title: string
}

function Details(): React.JSX.Element {
    const route = useRoute();
    const navigation = useNavigation();
    const params = route.params as RouteParams;
    const { itemId, title } = params;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: title,
        });
    }, [navigation, title]);


    const { loading, error, data }: QueryResult<Query> = useQuery(getCatInfo, {
        variables: { trackId: itemId },
    });


    const [incrementTrackViews] = useMutation(increaseTrackView, {
        variables: { incrementTrackViewsId: itemId },
        onCompleted: (_data) => {
            console.log(_data);
        },
    })


    useEffect(() => {
        incrementTrackViews();
    }, [incrementTrackViews]);


    if (loading) {
        return <Text style={styles.loadingText}>{`<<<< LOADING >>>>`}</Text>;
    }

    if (error) {
        return <Text style={styles.loadingText}>{`<<<< something went wrong >>>>`}</Text>;
    }

    return (
        <View style={styles.container}>
            <Image
                style={{ width: '100%', height: 300, marginBottom: 30 }}
                alt="lmao"
                source={{
                    uri: data?.track.thumbnail,
                }} />

            <ScrollView>
                <Text style={{ width: '100%', paddingHorizontal: 10, textAlign: 'left' }}>
                    {
                        data?.track.description
                    }
                </Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingText: {
        position: "absolute",
        top: "50%",
        left: "20%",
    },
});

export default Details;
