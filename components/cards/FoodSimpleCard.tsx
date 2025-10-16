import { Image } from "expo-image";
import { useState } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  useWindowDimensions,
} from "react-native";
import { MEDIUM, SEMIBOLD } from "../../constants/fonts";
import { blurImg } from "../../styles/globalStyle";
import { ButtonOutline } from "../buttons/ButtonOutline";
import { ModalDetailFood } from "../modals/ModalDetailFood";
import { TextPoppins } from "../texts/TextPoppins";

export interface FoodItem {
  id: string;
  name: string;
  desc: string;
  price: number;
  img?: string;
  isFavorite: boolean;
  stock: number;
}

interface Props {
  data: FoodItem;
  containerStyle?: StyleProp<ViewStyle>;
  grid?: boolean;
}

export const FoodSimpleCard = ({
  data,
  containerStyle,
  grid,
  ...rest
}: Props) => {
  const { width } = useWindowDimensions();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const cardGrid = (width - 32 - 12) / 2; // 32 = padding (16*2), 12 = gap

  return (
    <>
      <Pressable
        style={[
          styles.container,
          {
            width: grid ? cardGrid : 140,
          },
          containerStyle,
        ]}
        onPress={() => setIsOpen(true)}
        {...rest}
      >
        <Image
          style={styles.image}
          placeholder={blurImg}
          transition={1000}
          source={data.img}
          contentFit="cover"
        />

        <View style={styles.content}>
          <TextPoppins weight={MEDIUM} numberOfLines={1} ellipsizeMode="tail">
            {data.name}
          </TextPoppins>

          <TextPoppins weight={SEMIBOLD}>{data.price}</TextPoppins>
        </View>

        <ButtonOutline
          onPress={(e) => {
            e.preventDefault();
            console.log("click button", data);
          }}
          title="Pesan Lagi"
          textStyle={{ fontSize: 12 }}
          buttonStyle={{ paddingVertical: 4 }}
        />
      </Pressable>

      {isOpen && (
        <ModalDetailFood data={data} isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    gap: 16,
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    aspectRatio: 1 / 1,
    borderRadius: 12,
  },
  content: {
    flexDirection: "column",
    marginTop: -6,
    gap: 8,
    textAlign: "left",
    alignItems: "flex-start",
  },
});
