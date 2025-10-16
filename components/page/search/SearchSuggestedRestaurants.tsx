import AntDesign from "@expo/vector-icons/AntDesign";
import { Image } from "expo-image";
import { Pressable, StyleSheet, View } from "react-native";
import { useMainNavigation } from "../../../hooks/useAppNav";
import { colors } from "../../../styles/colors";
import { blurImg } from "../../../styles/globalStyle";
import { TextPoppins } from "../../texts/TextPoppins";

export interface SuggestedRestaurant {
  id: string;
  img: string;
  name: string;
  rating: string;
}

interface Props {
  data: SuggestedRestaurant;
}

export const SearchSuggestedRestaurants = ({ data }: Props) => {
  const navigation = useMainNavigation();

  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        navigation.navigate("DetailRestaurant", {
          id: data.id,
        })
      }
    >
      <Image
        style={styles.image}
        placeholder={blurImg}
        transition={1000}
        source={data.img}
        contentFit="cover"
      />

      <View style={styles["container-info"]}>
        <TextPoppins style={styles.name} numberOfLines={1} ellipsizeMode="tail">
          {data.name}
        </TextPoppins>

        <View style={styles["container-rating"]}>
          <AntDesign name="star" size={12} color={colors.primary} />

          <TextPoppins style={styles.rating}>{data.rating}</TextPoppins>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    flexDirection: "row",
    gap: 10,
    borderBottomColor: "#EBEBEB",
    borderBottomWidth: 1,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 80,
    resizeMode: "cover",
    borderRadius: 12,
  },
  "container-info": {
    flex: 1,
    flexDirection: "column",
    gap: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: 500,
    color: colors["primary-black"],
  },
  "container-rating": {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  rating: {
    fontSize: 16,
    fontWeight: 400,
    color: colors["primary-black"],
  },
});
