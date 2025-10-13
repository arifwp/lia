import { Ionicons, MaterialIcons } from "@expo/vector-icons";
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
import { BOLD, MEDIUM, SEMIBOLD } from "../../constants/fonts";
import { colors } from "../../styles/colors";
import { blurImg } from "../../styles/globalStyle";
import { ButtonOutline } from "../buttons/ButtonOutline";
import { ButtonPrimary } from "../buttons/ButtonPrimary";
import { ModalBase } from "../modals/ModalBase";
import { TextPoppins } from "../texts/TextPoppins";

export interface FoodItem {
  id: string;
  name: string;
  desc: string;
  price: string;
  img?: string;
  isFavorite: boolean;
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
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const cardGrid = (width - 32 - 12) / 2; // 32 = padding (16*2), 12 = gap

  const onClose = () => {
    setIsOpen(false);
  };

  const footer = (
    <View style={styles["wrap-bottom-tools"]}>
      <View style={styles["wrap-tools"]}>
        <Pressable
          style={styles["button-tools"]}
          onPress={(e) => {
            e.preventDefault();
            setIsFavorite((prev) => !prev);
          }}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={16}
            color={isFavorite ? colors.red : colors["primary-black"]}
          />

          <TextPoppins weight={SEMIBOLD}>
            {isFavorite ? "Disimpan" : "Simpan"}
          </TextPoppins>
        </Pressable>

        <View
          style={[
            styles["wrap-tools"],
            { justifyContent: "flex-end", gap: 12 },
          ]}
        >
          <Pressable
            style={styles["button-tools"]}
            onPress={(e) => {
              e.preventDefault();
            }}
          >
            <Ionicons name="alert" size={16} color="black" />

            <TextPoppins weight={SEMIBOLD}>Report</TextPoppins>
          </Pressable>

          <Pressable
            style={styles["button-tools"]}
            onPress={(e) => {
              e.preventDefault();
            }}
          >
            <MaterialIcons name="share" size={16} color="black" />

            <TextPoppins weight={SEMIBOLD}>Share</TextPoppins>
          </Pressable>
        </View>
      </View>

      <ButtonPrimary
        onPress={() => {
          console.log("buy", data);
        }}
        title="Add Order"
      />
    </View>
  );

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
          title="Order"
          buttonStyle={{ paddingVertical: 4 }}
        />
      </Pressable>

      {isOpen && (
        <ModalBase
          isVisible={isOpen}
          onClose={onClose}
          title="Detail"
          footer={footer}
        >
          <View style={styles["container-modal"]}>
            <View style={styles["wrap-summary"]}>
              {data.img && (
                <Image
                  style={styles.image}
                  placeholder={blurImg}
                  transition={1000}
                  source={data.img}
                  contentFit="contain"
                />
              )}

              <TextPoppins weight={SEMIBOLD} style={styles["name-modal"]}>
                {data.name}
              </TextPoppins>

              <TextPoppins style={styles["desc-modal"]}>
                {data.desc}
              </TextPoppins>

              <TextPoppins style={styles["price-modal"]} weight={BOLD}>
                {data.price}
              </TextPoppins>
            </View>
          </View>
        </ModalBase>
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
  "wrap-summary": {
    flexDirection: "column",
    gap: 12,
  },
  "sv-container": {
    flexDirection: "column",
    // paddingBottom: 24,
  },
  "container-modal": {
    flexDirection: "column",
    gap: 24,
    position: "relative",
  },
  "name-modal": {
    fontSize: 20,
    color: colors["primary-black"],
  },
  "desc-modal": {
    color: colors["primary-gray"],
  },
  "price-modal": {
    fontSize: 16,
    color: colors["primary-black"],
  },
  "wrap-bottom-tools": {
    gap: 16,
  },
  "wrap-tools": {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  "button-tools": {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderWidth: 1,
    gap: 6,
    borderColor: "#e5e5e5",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
});
