import { SectionList, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FoodHorizontalCard } from "../../components/cards/FoodHorizontalCard";
import { TextPoppins } from "../../components/texts/TextPoppins";
import { BOLD } from "../../constants/fonts";
import { colors } from "../../styles/colors";
import { globalStyle } from "../../styles/globalStyle";

interface DetailRestaurantFood {
  id: number;
  title: string;
  data: FoodHorizontalCard[];
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
  foods: DetailRestaurantFood[];
}

export const dummyFoodHorizontal: FoodHorizontalCard[] = [
  {
    id: "food-001",
    name: "Nasi Goreng Jawa",
    desc: "Nasi goreng khas Jawa dengan bumbu rempah dan topping ayam suwir.",
    price: "25.000",
    img: "https://placehold.co/500x500.png",
    soldCount: 230,
    likeCount: 120,
  },
  {
    id: "food-002",
    name: "Sate Ayam Madura",
    desc: "Sate ayam dengan bumbu kacang khas Madura yang gurih dan manis.",
    price: "20.000",
    img: "https://placehold.co/500x500.png",
    soldCount: 310,
    likeCount: 185,
  },
  {
    id: "food-003",
    name: "Bakso Malang",
    desc: "Bakso daging sapi lengkap dengan tahu, pangsit goreng, dan kuah kaldu.",
    price: "18.000",
    img: "https://placehold.co/500x500.png",
    soldCount: 420,
    likeCount: 220,
  },
  {
    id: "food-004",
    name: "Mie Ayam Jamur",
    desc: "Mie kenyal dengan topping ayam kecap dan jamur yang lembut.",
    price: "22.000",
    img: "https://placehold.co/500x500.png",
    soldCount: 390,
    likeCount: 205,
  },
  {
    id: "food-005",
    name: "Rendang Padang",
    desc: "Daging sapi dimasak dengan santan dan rempah khas Minangkabau.",
    price: "35.000",
    img: "https://placehold.co/500x500.png",
    soldCount: 270,
    likeCount: 240,
  },
  {
    id: "food-006",
    name: "Gado-Gado Jakarta",
    desc: "Sayuran rebus dengan saus kacang, lontong, dan telur rebus.",
    price: "17.000",
    img: "https://placehold.co/500x500.png",
    soldCount: 150,
    likeCount: 95,
  },
  {
    id: "food-007",
    name: "Ayam Geprek Sambal Bawang",
    desc: "Ayam goreng tepung dengan sambal bawang pedas menggigit.",
    price: "20.000",
    img: "https://placehold.co/500x500.png",
    soldCount: 500,
    likeCount: 310,
  },
  {
    id: "food-008",
    name: "Pecel Madiun",
    desc: "Sayur rebus dengan bumbu kacang pedas khas Madiun.",
    price: "15.000",
    img: "https://placehold.co/500x500.png",
    soldCount: 180,
    likeCount: 130,
  },
  {
    id: "food-009",
    name: "Soto Betawi",
    desc: "Soto dengan kuah santan gurih, daging sapi, dan emping.",
    price: "28.000",
    img: "https://placehold.co/500x500.png",
    soldCount: 260,
    likeCount: 175,
  },
  {
    id: "food-010",
    name: "Nasi Uduk Komplit",
    desc: "Nasi uduk dengan ayam goreng, tempe orek, telur balado, dan sambal.",
    price: "23.000",
    img: "https://placehold.co/500x500.png",
    soldCount: 330,
    likeCount: 210,
  },
];

const dummyDetailRestaurant: DetailRestaurant = {
  id: "res-001",
  name: "McDonald's Solo",
  banner: "https://picsum.photos/200/300",
  img: "https://picsum.photos/200/300",
  rating: "3.8",
  countRating: "1.234",
  distance: "0.45",
  estTime: "10 - 20",
  foods: [
    {
      id: 1,
      title: "Nasi Goreng",
      data: dummyFoodHorizontal.slice(0, 3),
    },
    {
      id: 2,
      title: "Martabak",
      data: dummyFoodHorizontal.slice(4, 6),
    },
    {
      id: 3,
      title: "Marhaban",
      data: dummyFoodHorizontal.slice(7, 10),
    },
  ],
};

export const DetailRestaurantScreen = () => {
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
      {/* Content */}
      <View style={styles.container}>
        <SectionList
          sections={dummyDetailRestaurant.foods}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <FoodHorizontalCard data={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles["title-divider"]}>
              <TextPoppins style={styles.header} weight={BOLD}>
                {title}
              </TextPoppins>
            </View>
          )}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 1,
                width: "100%",
                backgroundColor: colors["light-gray"],
              }}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 20,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 24,
  },
  "title-divider": {
    paddingVertical: 16,
    backgroundColor: colors.white,
  },
  // container: {
  //   flexDirection: "column",
  //   flex: 1,
  // },
  // "fixed-nav": {
  //   position: "absolute",
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   zIndex: 10,
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  // },
  // "container-header": {
  //   position: "relative",
  //   flexDirection: "column",
  //   flex: 1,
  // },
  // header: {
  //   position: "relative",
  // },
  // "image-banner": {
  //   width: "100%",
  //   aspectRatio: 16 / 9,
  // },
  // "wrapper-image-restaurant": {
  //   width: "100%",
  //   backgroundColor: colors.red,
  //   position: "absolute",
  //   top: 200 - 50,
  //   left: 0,
  //   right: 0,
  //   alignItems: "center",
  //   paddingHorizontal: 16,
  //   overflow: "hidden",
  // },
  // "image-restaurant": {
  //   width: 100,
  //   height: 100,
  //   borderRadius: 100 / 2,
  //   marginBottom: 8,
  // },
  // "wrapper-image-restaurant-relative": {
  //   width: "100%",
  //   // backgroundColor: colors.red,
  //   marginTop: -50,
  //   alignItems: "center",
  //   paddingHorizontal: 16,
  //   paddingBottom: 16,
  // },
  // "container-tabbar": {
  //   backgroundColor: colors.red,
  // },
});
