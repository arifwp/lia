import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ButtonBack } from "../../components/buttons/ButtonBack";
import { FoodItem } from "../../components/cards/FoodSimpleCard";
import { DetailRestaurantFoodLayout } from "../../components/page/detailRestaurant/DetailRestaurantFoodLayout";
import { DetailRestaurantTabBar } from "../../components/page/detailRestaurant/DetailRestaurantTabBar";
import { TextPoppins } from "../../components/texts/TextPoppins";
import { BOLD, SEMIBOLD } from "../../constants/fonts";
import { colors } from "../../styles/colors";
import { blurImg, globalStyle } from "../../styles/globalStyle";
import { dummyFoods } from "./bottomNav/HomeScreen";

export interface TabViewCategory {
  key: string;
  title: string;
}

export interface DetailRestaurant {
  id: string;
  name: string;
  banner: string;
  img: string;
  rating: string;
  countRating: string;
  distance: string;
  estTime: string;
  categories: TabViewCategory[];
  foods: FoodItem[];
}

const dummyDetailRestaurant: DetailRestaurant = {
  id: "res-001",
  name: "McDonald's Solo",
  banner: "https://picsum.photos/200/300",
  img: "https://picsum.photos/200/300",
  rating: "3.8",
  countRating: "1.234",
  distance: "0.45",
  estTime: "10 - 20",
  categories: [
    {
      key: "popular",
      title: "Popular",
    },
    {
      key: "appetizer",
      title: "Appetizer",
    },
    {
      key: "burger",
      title: "Burger",
    },
    {
      key: "getuk",
      title: "Getuk",
    },
    {
      key: "gudeg",
      title: "Gudeg",
    },
    {
      key: "nasi",
      title: "Nasi biasa",
    },
    {
      key: "nasi-goreng",
      title: "Nasi Goreng",
    },
  ],
  foods: dummyFoods,
};

export const DetailRestaurantScreen = () => {
  const insets = useSafeAreaInsets();
  const layout = useWindowDimensions();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [foodsByCategory, setFoodsByCategory] = useState<FoodItem[]>(
    dummyDetailRestaurant.foods
  );
  const [index, setIndex] = useState<number>(0);
  const routes = useMemo(() => dummyDetailRestaurant.categories, []);
  const bannerHeight = (layout.width * 9) / 16;
  const scrollY = useRef(new Animated.Value(0)).current;

  const renderScene = useCallback(
    ({ route }: { route: TabViewCategory }) => {
      return <DetailRestaurantFoodLayout foods={foodsByCategory} />;
    },
    [foodsByCategory, scrollY]
  );

  const navBackgroundColor = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: ["rgba(255,255,255,0)", "rgba(255,255,255,1)"],
    extrapolate: "clamp",
  });

  return (
    <View
      style={[
        globalStyle["root-container"],
        {
          padding: 0,
        },
      ]}
    >
      <View style={styles.container}>
        {/* Fixed Navigation Buttons */}
        <Animated.View
          style={[
            styles["fixed-nav"],
            {
              paddingTop: insets.top,
              paddingBottom: 16,
              paddingHorizontal: 16,
              backgroundColor: navBackgroundColor,
              borderBottomWidth: 1,
              borderBottomColor: scrollY.interpolate({
                inputRange: [0, 100],
                outputRange: ["transparent", "rgba(0,0,0,0.1)"],
                extrapolate: "clamp",
              }),
            },
          ]}
        >
          <ButtonBack />

          <View style={globalStyle["container-right-tools"]}>
            <Pressable onPress={() => setIsFavorite((prev) => !prev)}>
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={24}
                color={isFavorite ? colors.red : colors["primary-black"]}
              />
            </Pressable>

            <Pressable>
              <MaterialIcons
                name="share"
                size={24}
                color={colors["primary-black"]}
              />
            </Pressable>
          </View>
        </Animated.View>

        {/* Scrollable Content dengan Header + TabView */}
        <Animated.ScrollView
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
        >
          {/* Header Content */}
          <View style={styles["container-header"]}>
            <View style={styles.header}>
              <Image
                style={styles["image-banner"]}
                placeholder={blurImg}
                transition={1000}
                source={dummyDetailRestaurant.banner}
                contentFit="cover"
              />
            </View>

            {/* Remove absolute positioning */}
            <View style={styles["wrapper-image-restaurant-relative"]}>
              <Image
                style={styles["image-restaurant"]}
                placeholder={blurImg}
                transition={1000}
                source={dummyDetailRestaurant.img}
                contentFit="cover"
              />
              <TextPoppins weight={BOLD} style={{ textAlign: "center" }}>
                {dummyDetailRestaurant.name}
              </TextPoppins>

              <View style={[globalStyle["container-row"], { gap: 8 }]}>
                <View style={[globalStyle["container-row"], { gap: 4 }]}>
                  <AntDesign name="star" size={12} color={colors.primary} />

                  <TextPoppins weight={SEMIBOLD}>
                    {dummyDetailRestaurant.rating}
                  </TextPoppins>

                  <TextPoppins
                    style={{
                      color: colors["primary-gray"],
                      textAlign: "center",
                    }}
                  >
                    {`(${dummyDetailRestaurant.countRating})`}
                  </TextPoppins>
                </View>

                <View style={globalStyle["dot-divider"]} />

                <TextPoppins
                  style={{ color: colors["primary-gray"], textAlign: "center" }}
                >
                  {`${dummyDetailRestaurant.distance} km`}
                </TextPoppins>

                <View style={globalStyle["dot-divider"]} />

                <TextPoppins
                  style={{ color: colors["primary-gray"], textAlign: "center" }}
                >
                  {`${dummyDetailRestaurant.estTime} min`}
                </TextPoppins>
              </View>
            </View>

            <View style={styles["container-tabbar"]}>
              <DetailRestaurantTabBar
                props={{
                  navigationState: { index, routes },
                  position: new Animated.Value(index),
                  jumpTo: (key: string) => {
                    const newIndex = routes.findIndex(
                      (route) => route.key === key
                    );
                    if (newIndex !== -1) setIndex(newIndex);
                  },
                }}
              />
            </View>

            {/* TabView Content */}
            <View style={styles.container}>
              {renderScene({ route: routes[index] })}
            </View>
          </View>
        </Animated.ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
  },
  "fixed-nav": {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  "container-header": {
    position: "relative",
    flexDirection: "column",
    flex: 1,
  },
  header: {
    position: "relative",
  },
  "image-banner": {
    width: "100%",
    aspectRatio: 16 / 9,
  },
  "wrapper-image-restaurant": {
    width: "100%",
    backgroundColor: colors.red,
    position: "absolute",
    top: 200 - 50,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingHorizontal: 16,
    overflow: "hidden",
  },
  "image-restaurant": {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    marginBottom: 8,
  },
  "wrapper-image-restaurant-relative": {
    width: "100%",
    // backgroundColor: colors.red,
    marginTop: -50,
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  "container-tabbar": {
    backgroundColor: colors.red,
  },
});
