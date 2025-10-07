import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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

export const FoodSimpleCard = ({ data }: { data: FoodItem }) => {
  const insets = useSafeAreaInsets();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Pressable style={styles.container} onPress={() => setIsOpen(true)}>
        <Image
          style={styles.image}
          placeholder={blurImg}
          transition={1000}
          source={data.img}
          contentFit="cover"
        />

        <View style={styles.content}>
          <TextPoppins weight={MEDIUM} numberOfLines={2} ellipsizeMode="tail">
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

      <ModalBase isVisible={isOpen} onClose={onClose} title="Detail">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles["sv-container"]}
        >
          <View style={styles["container-modal"]}>
            <View style={styles["wrap-summary"]}>
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

            <View style={styles["wrap-bottom-tools"]}>
              <View style={styles["wrap-tools"]}>
                <Pressable
                  style={styles["button-tools"]}
                  onPress={(e) => {
                    e.preventDefault();
                  }}
                >
                  <Ionicons
                    name={"heart-outline"}
                    size={20}
                    color={colors["primary-black"]}
                  />

                  <TextPoppins weight={SEMIBOLD}>Simpan</TextPoppins>
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
                    <Ionicons name="alert" size={20} color="black" />

                    <TextPoppins weight={SEMIBOLD}>Report</TextPoppins>
                  </Pressable>

                  <Pressable
                    style={styles["button-tools"]}
                    onPress={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <MaterialIcons name="share" size={20} color="black" />

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
          </View>
        </ScrollView>
      </ModalBase>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 90,
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
    paddingBottom: 24,
  },
  "container-modal": {
    flexDirection: "column",
    gap: 24,
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
    flexDirection: "column",
    gap: 24,
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
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },
});
