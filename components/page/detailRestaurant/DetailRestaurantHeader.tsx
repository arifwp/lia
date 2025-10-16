import { AntDesign } from "@expo/vector-icons";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { BOLD, SEMIBOLD } from "../../../constants/fonts";
import { colors } from "../../../styles/colors";
import { blurImg, globalStyle } from "../../../styles/globalStyle";
import { TextPoppins } from "../../texts/TextPoppins";

interface Props {
  data: {
    banner: string;
    img: string;
    name: string;
    rating: string;
    countRating: string;
    distance: string;
    estTime: string;
  };
}

export const DetailRestaurantHeader = ({ data }: Props) => {
  return (
    <View style={styles["container-header"]}>
      <View
        style={{
          width: "100%",
          position: "relative",
        }}
      >
        <Image
          style={styles["image-banner"]}
          placeholder={blurImg}
          transition={1000}
          source={data.banner}
          contentFit="cover"
        />

        <Image
          style={styles["image-restaurant"]}
          placeholder={blurImg}
          transition={1000}
          source={data.img}
          contentFit="cover"
        />
      </View>

      <View style={styles["wrapper-image-restaurant"]}>
        <TextPoppins weight={BOLD} style={{ textAlign: "center" }}>
          {data.name}
        </TextPoppins>

        <View style={[globalStyle["container-row"], { gap: 8 }]}>
          <View style={[globalStyle["container-row"], { gap: 4 }]}>
            <AntDesign name="star" size={12} color={colors.primary} />

            <TextPoppins weight={SEMIBOLD}>{data.rating}</TextPoppins>

            <TextPoppins
              style={{
                color: colors["primary-gray"],
                textAlign: "center",
              }}
            >
              {`(${data.countRating})`}
            </TextPoppins>
          </View>

          <View style={globalStyle["dot-divider"]} />

          <TextPoppins
            style={{
              color: colors["primary-gray"],
              textAlign: "center",
            }}
          >
            {`${data.distance} km`}
          </TextPoppins>

          <View style={globalStyle["dot-divider"]} />

          <TextPoppins
            style={{
              color: colors["primary-gray"],
              textAlign: "center",
            }}
          >
            {`${data.estTime} min`}
          </TextPoppins>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  "container-header": {
    width: "100%",
    flexDirection: "column",
    position: "relative",
    paddingBottom: 16,
  },
  "image-banner": {
    width: "100%",
    aspectRatio: 16 / 9,
  },
  "wrapper-image-restaurant": {
    width: "100%",
    marginTop: 64, // sisa height image-restaurant (50) + 14 padding
    alignItems: "center",
    paddingHorizontal: 16,
  },
  "image-restaurant": {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: "absolute",
    left: "50%",
    bottom: -50,
    transform: [{ translateX: -50 }],
    borderWidth: 3,
    borderColor: colors.white,
  },
});
