import Feather from "@expo/vector-icons/Feather";
import { Image } from "expo-image";
import {
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NotificationIcon } from "../../../components/NotificationIcon";
import {
  FoodItem,
  FoodSimpleCard,
} from "../../../components/cards/FoodSimpleCard";
import { InputSearch } from "../../../components/inputs/InputSearch";
import { HomeCategoryItem } from "../../../components/page/home/HomeCategoryItem";
import {
  HomePopularRestaurants,
  PopularRestaurant,
} from "../../../components/page/home/HomePopularRestaurants";
import { TextPoppins } from "../../../components/texts/TextPoppins";
import { BasicData } from "../../../components/texts/TextRounded";
import { BOLD } from "../../../constants/fonts";
import { colors } from "../../../styles/colors";
import { blurImg, globalStyle } from "../../../styles/globalStyle";

const dummyCategories: BasicData[] = [
  {
    id: 1,
    name: "Breakfast",
    img: "https://placehold.co/500x500.png",
  },
  {
    id: 2,
    name: "Coffe",
    img: "https://placehold.co/500x500.png",
  },
  {
    id: 3,
    name: "Fast Food",
    img: "https://placehold.co/500x500.png",
  },
  {
    id: 4,
    name: "Pizza",
    img: "https://placehold.co/500x500.png",
  },
  {
    id: 5,
    name: "Grocery",
    img: "https://placehold.co/500x500.png",
  },
  {
    id: 6,
    name: "Pizza",
    img: "https://placehold.co/500x500.png",
  },
  {
    id: 7,
    name: "Grocery",
    img: "https://placehold.co/500x500.png",
  },
];

const dummyPopularRestaurants: PopularRestaurant[] = [
  {
    id: "1",
    name: "Martabak Santoso",
    rating: "4.5",
    countRating: "1.564",
    estTime: "30 - 40",
    distance: "5.32 km",
    img: "https://placehold.co/500x500.png",
  },
  {
    id: "2",
    name: "Ayam Geprek Bensu",
    rating: "4.7",
    countRating: "2.341",
    estTime: "20 - 30",
    distance: "3.12 km",
    img: "https://placehold.co/500x500.png",
  },
  {
    id: "3",
    name: "Bakso Pak Kumis",
    rating: "4.3",
    countRating: "987",
    estTime: "25 - 35",
    distance: "4.05 km",
    img: "https://placehold.co/500x500.png",
  },
  {
    id: "4",
    name: "Kopi Kenangan",
    rating: "4.8",
    countRating: "5.120",
    estTime: "10 - 20",
    distance: "1.84 km",
    img: "https://placehold.co/500x500.png",
  },
  {
    id: "5",
    name: "Sate Taichan Senayan",
    rating: "4.6",
    countRating: "3.452",
    estTime: "35 - 45",
    distance: "6.27 km",
    img: "https://placehold.co/500x500.png",
  },
];

export const dummyFoods: FoodItem[] = [
  {
    id: "1",
    name: "Lorem Ipsum is simply dummy text of the printing and typesetting  industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not",
    desc: "Nasi goreng dengan cita rasa khas kampung, menggunakan sambal terasi dan potongan ayam suwir.",
    price: "25000",
    img: "https://placehold.co/500x500.png",
    isFavorite: true,
  },
  {
    id: "2",
    name: "Mie Ayam Bakso",
    desc: "Mie ayam gurih disajikan dengan kuah kaldu hangat dan bakso sapi kenyal.",
    price: "22000",
    img: "https://placehold.co/500x500.png",
    isFavorite: false,
  },
  {
    id: "3",
    name: "Sate Ayam Madura",
    desc: "Sate ayam khas Madura dengan bumbu kacang kental dan lontong lembut.",
    price: "28000",
    img: "https://placehold.co/500x500.png",
    isFavorite: true,
  },
  {
    id: "4",
    name: "Nasi Padang",
    desc: "Paket nasi padang lengkap dengan rendang sapi, sambal ijo, dan daun singkong.",
    price: "35000",
    img: "https://placehold.co/500x500.png",
    isFavorite: false,
  },
  {
    id: "5",
    name: "Ayam Geprek Keju",
    desc: "Ayam goreng crispy dengan sambal bawang pedas dan topping lelehan keju mozarella.",
    price: "27000",
    img: "https://placehold.co/500x500.png",
    isFavorite: true,
  },
  {
    id: "6",
    name: "Bakso Malang",
    desc: "Bakso daging sapi dengan tahu isi, pangsit goreng, dan kuah kaldu bening gurih.",
    price: "20000",
    img: "https://placehold.co/500x500.png",
    isFavorite: false,
  },
  {
    id: "7",
    name: "Soto Betawi",
    desc: "Soto khas Betawi dengan kuah santan gurih, daging sapi empuk, dan taburan emping.",
    price: "32000",
    img: "https://placehold.co/500x500.png",
    isFavorite: false,
  },
  {
    id: "8",
    name: "Gado-Gado Jakarta",
    desc: "Sayuran segar dengan bumbu kacang manis gurih dan taburan kerupuk.",
    price: "23000",
    img: "https://placehold.co/500x500.png",
    isFavorite: true,
  },
  {
    id: "9",
    name: "Nasi Uduk Komplit",
    desc: "Nasi uduk gurih disajikan dengan ayam goreng, sambal kacang, dan telur balado.",
    price: "24000",
    img: "https://placehold.co/500x500.png",
    isFavorite: false,
  },
  {
    id: "10",
    name: "Pecel Lele Lamongan",
    desc: "Lele goreng garing disajikan dengan sambal tomat pedas dan lalapan segar.",
    price: "21000",
    img: "https://placehold.co/500x500.png",
    isFavorite: true,
  },
];

export const HomeScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        globalStyle["root-container"],
        {
          padding: 0,
          paddingTop: insets.top,
        },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles["sv-root"]}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles["wrap-address"]}>
            <TextPoppins style={styles["deliver-to"]}>Deliver To</TextPoppins>

            <TextPoppins style={styles.address} numberOfLines={1}>
              Hotel Mana Aja
            </TextPoppins>
          </View>

          <NotificationIcon />
        </View>

        {/* Input Search */}
        <View style={styles["wrap-search"]}>
          <InputSearch isSearchScreen={false} />
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles["sv-categories"]}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          onScrollBeginDrag={Keyboard.dismiss}
        >
          {dummyCategories.map((item) => (
            <HomeCategoryItem key={item.id} data={item} />
          ))}
        </ScrollView>

        {/* Banner 3/1 ratio */}
        <Pressable style={styles["wrap-banner"]}>
          <Image
            style={styles.banner}
            placeholder={blurImg}
            transition={1000}
            source={"https://placehold.co/500x500.png"}
            contentFit="cover"
          />
        </Pressable>

        {/* Last Food Buy Item */}
        <View style={styles["section"]}>
          <View style={styles["wrap-section-title"]}>
            <TextPoppins weight={BOLD} style={styles["section-title"]}>
              Last Buyed
            </TextPoppins>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles["sv-row"]}
          >
            {dummyFoods.map((item) => (
              <FoodSimpleCard key={item.id} data={item} />
            ))}
          </ScrollView>
        </View>

        {/* Popular Restaurants */}
        <View style={styles["section"]}>
          <View style={styles["wrap-section-title"]}>
            <TextPoppins weight={BOLD} style={styles["section-title"]}>
              Popular Restaurants
            </TextPoppins>

            {/* Arrow More */}
            <Pressable style={styles["arrow-more"]}>
              <Feather name="arrow-up-right" size={24} color={colors.primary} />
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles["sv-row"]}
          >
            {dummyPopularRestaurants.map((item) => (
              <HomePopularRestaurants key={item.id} data={item} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  "sv-root": { gap: 24, paddingBottom: 24 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  "wrap-search": {
    paddingHorizontal: 16,
  },
  "wrap-address": {
    width: "70%",
    flexDirection: "column",
    gap: 4,
  },
  "deliver-to": {
    fontSize: 12,
    color: colors.primary,
  },
  address: {
    color: colors["primary-black"],
  },
  "sv-categories": {
    marginHorizontal: 16,
  },
  "wrap-banner": {
    paddingHorizontal: 16,
  },
  banner: {
    width: "100%",
    aspectRatio: 3 / 1,
    borderRadius: 12,
  },
  "sv-row": {
    marginHorizontal: 16,
    gap: 10,
    paddingRight: 16,
  },
  section: {
    flexDirection: "column",
    gap: 16,
  },
  "wrap-section-title": {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    alignItems: "center",
  },
  "section-title": {
    fontSize: 16,
    color: colors["primary-black"],
  },
  "arrow-more": {
    width: 34,
    height: 34,
    borderRadius: 34 / 2,
    borderColor: colors["light-gray"],
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
