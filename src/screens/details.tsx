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
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";
import { useQuery } from "@apollo/client";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { getCatInfo } from "../graphQL/queries";
import { QueryResult } from "@apollo/client";
import { Query } from "../__generated__/graphql";
import { useMutation } from "@apollo/client";
import { increaseTrackView } from "../graphQL/mutations";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack/lib/typescript/src/types";
import { DetailsStackType } from "../../navigation";
import Share from "react-native-share";

type DetailsNavigation = NativeStackNavigationProp<DetailsStackType, "Details">;
type DetailsScreenProps = NativeStackScreenProps<DetailsStackType, "Details">;
type DetailsRoute = RouteProp<DetailsStackType, "Details">;

function Details({}: DetailsScreenProps): React.JSX.Element {
  const route = useRoute<DetailsRoute>();
  const navigation = useNavigation<DetailsNavigation>();
  const params = route.params;
  const { itemId, title } = params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: title,
    });
  }, [navigation, title]);

  useEffect(() => {
    const unsubscribe: () => void = navigation.addListener(
      "transitionEnd",
      () => {
        console.log("LMAO");
      }
    );
    return unsubscribe;
  }, [navigation]);

  const { loading, error, data }: QueryResult<Query> = useQuery(getCatInfo, {
    variables: { trackId: itemId },
  });

  const [incrementTrackViews] = useMutation(increaseTrackView, {
    variables: { incrementTrackViewsId: itemId },
    onCompleted: (_data) => {
      console.log(_data);
    },
  });

  useEffect(() => {
    incrementTrackViews();
  }, [incrementTrackViews]);

  if (loading) {
    return <Text style={styles.loadingText}>{`<<<< LOADING >>>>`}</Text>;
  }

  if (error) {
    return (
      <Text style={styles.loadingText}>{`<<<< something went wrong >>>>`}</Text>
    );
  }

  return (
    <View testID="detailsScreenView" style={styles.container}>
      <Button onPress={() => navigation.pop()} title="go back" />
      <Image
        style={{ width: "100%", height: 300, marginBottom: 10 }}
        alt="lmao"
        source={{
          uri: data?.track.thumbnail,
        }}
      />

      <TouchableOpacity
        testID="sharing-soical"
        style={{
          width: "90%",
          height: 50,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: "pink",
          marginBottom: 10,
          borderRadius: 20,
          alignSelf: "center",
        }}
        onPress={() => {
          Share.open({
            message: "congratz on buying this cat for 2 dolalrs uwu",
          })
        }}
      >
        <Text>Share This Cat uwu</Text>
      </TouchableOpacity>
      <ScrollView>
        <Text
          style={{ width: "100%", paddingHorizontal: 10, textAlign: "left" }}
        >
          {data?.track.description}
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
