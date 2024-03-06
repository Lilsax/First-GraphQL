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

import React, { useLayoutEffect, useRef, useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TextInput,
} from "react-native";
import { useQuery, NetworkStatus /*useLazyQuery*/ } from "@apollo/client";
import { QueryResult } from "@apollo/client";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { getHomeData } from "../graphQL/queries";
import Card from "../components/card";
import { Query, Track } from "../__generated__/graphql";
import { SafeAreaView } from "react-native-safe-area-context";
import { MainStackType, HomeStackType } from "../../navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

SafeAreaView;
// Define types for your data

type HomeNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackType, "Home">,
  NativeStackNavigationProp<MainStackType>
>;

function Home(): React.JSX.Element {
  const navigation = useNavigation<HomeNavigationProp>();
  const scrollRef = useRef<ScrollView>(null);
  const [scrollValue, setScrollValue] = useState<number>(0);
  const [filterValue, setFilterValue] = useState<string>("");
  const { loading, error, data, refetch, networkStatus }: QueryResult<Query> =
    useQuery(getHomeData, {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "network-only",
      nextFetchPolicy: "cache-first",
    });

  // const [getData, { loading, error, data, refetch, networkStatus }] = useLazyQuery(GET_LOCATIONS);
  const styles = getStyles("pink");

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollValue(event.nativeEvent.contentOffset.y);
  };

  const handleCityNameChange = (_cityName: string) => {
    setFilterValue(_cityName);
  };

  useLayoutEffect(() => {
    scrollRef.current?.scrollTo({
      x: 0,
      y: scrollValue,
      animated: false,
    });
  }, [scrollValue, networkStatus, loading]);

  const nav = (id: string, title: string): void => {
    navigation.navigate("DetailsStack", {
      screen: "Details",
      params: {
        itemId: id,
        title,
      },
    });
  };

  // useEffect(() => {
  //   const iniit = setInterval(() => {
  //     console.log("refetching the data")
  //     refetch();
  //   }, 5000)

  //   return () => clearInterval(iniit)
  // }, [refetch]);

  if (loading || networkStatus === NetworkStatus.refetch) {
    return <Text style={styles.loadingText}>{`<<<< LOADING >>>>`}</Text>;
  }
  if (error) {
    return (
      <View style={styles.container}>
        <Text>An error occurred</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Button
        onPress={() => {
          setFilterValue("");
          refetch();
        }}
        title="Refresh"
      />
      <View style={{ marginVertical: 10 }} />
      <Button
        onPress={() => console.log("commenting") /*getData()*/}
        title="Get Data"
        color={"pink"}
      />
      <ScrollView
        ref={scrollRef}
        onScroll={handleScroll}
        style={styles.container}
      >
        <TextInput
          style={styles.input}
          value={filterValue}
          placeholder="useless placeholder"
          onChangeText={handleCityNameChange}
        />
        {data?.tracksForHome.map((item: Track) => {
          if (item.title.includes(filterValue)) {
            return (
              <Card
                btnTestID={"card-btn"}
                key={item.id}
                description={item.description}
                title={item.title}
                thumbnail={item.thumbnail}
                handlePress={() => nav(item.id, item.title)}
                numberOfViews={item.numberOfViews}
              />
            );
          }
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const getStyles = (color: string) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    text: {
      color,
    },
    loadingText: {
      position: "absolute",
      top: "50%",
      left: "35%",
    },
    textName: {
      fontSize: 18,
      color: "black",
      textAlign: "left",
      fontStyle: "italic",
      marginBottom: 5,
    },
    textDes: {
      fontSize: 16,
      color: "#000",
    },
    img: {
      width: "100%",
      height: 300,
      objectFit: "cover",
      borderRadius: 10,
      marginBottom: 20,
    },
    input: {
      borderBottomColor: "#000",
      borderBottomWidth: 1,
    },
  });

export default Home;
