import AntDesign from "@expo/vector-icons/AntDesign";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { SEMIBOLD } from "../../../constants/fonts";
import { colors } from "../../../styles/colors";
import { blurImg } from "../../../styles/globalStyle";
import { TextPoppins } from "../../texts/TextPoppins";

export interface PopularRestaurant {
  id: string;
  name: string;
  rating: string;
  countRating: string;
  estTime: string;
  distance: string;
  img: string;
}

export const HomePopularRestaurants = ({
  data,
}: {
  data: PopularRestaurant;
}) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        placeholder={blurImg}
        transition={1000}
        source={data.img}
        contentFit="cover"
      />

      <View style={styles.content}>
        <View style={styles.row}>
          <TextPoppins style={styles["text-secondary"]}>
            {data.distance}
          </TextPoppins>

          <View
            style={{
              width: 4,
              height: 4,
              borderRadius: 4 / 2,
              backgroundColor: colors["primary-gray"],
            }}
          />

          <TextPoppins style={styles["text-secondary"]}>
            {`${data.estTime} min`}
          </TextPoppins>
        </View>

        <TextPoppins
          style={styles.name}
          weight={SEMIBOLD}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {data.name}
        </TextPoppins>

        <View style={styles.row}>
          <AntDesign name="star" size={12} color={colors.primary} />

          <TextPoppins style={styles["text-secondary"]}>
            {data.rating}
          </TextPoppins>

          <TextPoppins style={styles["text-secondary"]}>
            {`(${data.countRating} rating)`}
          </TextPoppins>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    flexDirection: "column",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors["light-gray"],
    overflow: "hidden",
  },
  image: {
    width: "100%",
    resizeMode: "cover",
    aspectRatio: 16 / 9,
  },
  content: {
    padding: 16,
    flexDirection: "column",
    gap: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  name: {
    fontSize: 16,
    color: colors["primary-black"],
  },
  "text-secondary": {
    fontSize: 14,
    color: colors["primary-gray"],
  },
});
