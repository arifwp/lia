import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { MEDIUM } from "../../../constants/fonts";
import { blurImg } from "../../../styles/globalStyle";
import { TextPoppins } from "../../texts/TextPoppins";
import { BasicData } from "../../texts/TextRounded";

export const HomeCategoryItem = ({ data }: { data: BasicData }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        placeholder={blurImg}
        transition={1000}
        source={data.img}
        contentFit="cover"
      />

      <TextPoppins style={styles.text} weight={MEDIUM}>
        {data.name}
      </TextPoppins>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 10,
    alignItems: "center",
    paddingHorizontal: 12,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
  },
  text: {
    fontSize: 12,
  },
});
