import { Ionicons } from "@expo/vector-icons";
import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Animated,
  Pressable,
  SectionList,
  SectionListProps,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ButtonBack } from "../../components/buttons/ButtonBack";
import { FoodHorizontalCard } from "../../components/cards/FoodHorizontalCard";
import { DetailRestaurantHeader } from "../../components/page/detailRestaurant/DetailRestaurantHeader";
import { DetailRestaurantMenu } from "../../components/page/detailRestaurant/DetailRestaurantMenu";
import { TextPoppins } from "../../components/texts/TextPoppins";
import { BasicData } from "../../components/texts/TextRounded";
import { TextScreenName } from "../../components/texts/TextScreenName";
import { BOLD } from "../../constants/fonts";
import { useAppRoute, useMainNavigation } from "../../hooks/useAppNav";
import { colors } from "../../styles/colors";
import { globalStyle } from "../../styles/globalStyle";

// Buat Animated SectionList dengan proper typing
const AnimatedSectionList = Animated.createAnimatedComponent(
  SectionList
) as React.ForwardRefExoticComponent<
  SectionListProps<any> & React.RefAttributes<SectionList<any>>
>;

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
    id: "1",
    name: "Nasi Goreng Spesial",
    desc: "Nasi goreng dengan telur, ayam, udang, dan sayuran segar",
    price: 25000,
    img: "https://placehold.co/500x500.png",
    soldCount: 156,
    likeCount: 89,
    stock: 45,
    variants: [
      {
        id: "v1-1",
        title: "Level Pedas",
        isRequired: true,
        isMultipleChoice: false,
        data: [
          { id: "v1-1-1", name: "Tidak Pedas", price: 0, stock: 50 },
          { id: "v1-1-2", name: "Sedang", price: 0, stock: 30 },
          { id: "v1-1-3", name: "Pedas", price: 3000, stock: 20 },
          { id: "v1-1-4", name: "Sangat Pedas", price: 5000, stock: 15 },
        ],
      },
      {
        id: "v1-2",
        title: "Tambahan Toping",
        isRequired: false,
        isMultipleChoice: true,
        data: [
          { id: "v1-2-1", name: "Telur Mata Sapi", price: 5000, stock: 40 },
          { id: "v1-2-2", name: "Sosis", price: 7000, stock: 35 },
          { id: "v1-2-3", name: "Udang Extra", price: 12000, stock: 25 },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Sate Ayam",
    desc: "Sate ayam dengan bumbu kacang khas dan lontong",
    price: 18000,
    img: "https://placehold.co/500x500.png",
    soldCount: 203,
    likeCount: 134,
    stock: 32,
    variants: [
      {
        id: "v2-1",
        title: "Jumlah Tusuk",
        isRequired: true,
        isMultipleChoice: false,
        data: [
          { id: "v2-1-1", name: "10 Tusuk", price: 18000, stock: 40 },
          { id: "v2-1-2", name: "15 Tusuk", price: 25000, stock: 35 },
          { id: "v2-1-3", name: "20 Tusuk", price: 32000, stock: 25 },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "Gado-gado",
    desc: "Salad sayuran dengan bumbu kacang dan kerupuk",
    price: 15000,
    img: "https://placehold.co/500x500.png",
    soldCount: 98,
    likeCount: 67,
    stock: 28,
    variants: [
      {
        id: "v3-1",
        title: "Pilihan Lontong",
        isRequired: true,
        isMultipleChoice: true,
        data: [
          { id: "v3-1-1", name: "Tanpa Lontong", price: 0, stock: 20 },
          { id: "v3-1-2", name: "Dengan Lontong", price: 3000, stock: 35 },
        ],
      },
    ],
  },
  {
    id: "4",
    name: "Bakso Beranak",
    desc: "Bakso daging sapi dengan kuah kaldu sapi spesial",
    price: 20000,
    img: "https://placehold.co/500x500.png",
    soldCount: 187,
    likeCount: 112,
    stock: 50,
    variants: [
      {
        id: "v4-1",
        title: "Ukuran Bakso",
        isRequired: true,
        isMultipleChoice: false,
        data: [
          { id: "v4-1-1", name: "Normal", price: 20000, stock: 40 },
          { id: "v4-1-2", name: "Jumbo", price: 25000, stock: 25 },
        ],
      },
      {
        id: "v4-2",
        title: "Tambahan",
        isRequired: false,
        isMultipleChoice: true,
        data: [
          { id: "v4-2-1", name: "Pangsit Goreng", price: 8000, stock: 30 },
          { id: "v4-2-2", name: "Mie Kuning", price: 5000, stock: 45 },
        ],
      },
    ],
  },
  {
    id: "5",
    name: "Soto Ayam Lamongan",
    desc: "Soto ayam dengan koya khas Lamongan",
    price: 17000,
    img: "https://placehold.co/500x500.png",
    soldCount: 145,
    likeCount: 91,
    stock: 38,
    variants: [],
  },
  {
    id: "6",
    name: "Rendang Daging",
    desc: "Rendang daging sapi asli Padang dengan bumbu rempah lengkap",
    price: 35000,
    img: "https://placehold.co/500x500.png",
    soldCount: 223,
    likeCount: 178,
    stock: 22,
    variants: [
      {
        id: "v6-1",
        title: "Level Kering",
        isRequired: true,
        isMultipleChoice: true,
        data: [
          { id: "v6-1-1", name: "Basah", price: 0, stock: 25 },
          { id: "v6-1-2", name: "Sedang", price: 0, stock: 30 },
          { id: "v6-1-3", name: "Kering", price: 5000, stock: 20 },
        ],
      },
    ],
  },
  {
    id: "7",
    name: "Pempek Kapal Selam",
    desc: "Pempek isi telur dengan cuko khas Palembang",
    price: 22000,
    img: "https://placehold.co/500x500.png",
    soldCount: 89,
    likeCount: 56,
    stock: 41,
    variants: [],
  },
  {
    id: "8",
    name: "Ayam Betutu",
    desc: "Ayam betutu khas Bali dengan bumbu base genep",
    price: 45000,
    img: "https://placehold.co/500x500.png",
    soldCount: 76,
    likeCount: 48,
    stock: 15,
    variants: [
      {
        id: "v8-1",
        title: "Jenis Ayam",
        isRequired: true,
        isMultipleChoice: false,
        data: [
          { id: "v8-1-1", name: "Ayam Kampung", price: 45000, stock: 12 },
          { id: "v8-1-2", name: "Ayam Negeri", price: 38000, stock: 20 },
        ],
      },
      {
        id: "v8-2",
        title: "Level Pedas",
        isRequired: true,
        isMultipleChoice: false,
        data: [
          { id: "v8-2-1", name: "Tidak Pedas", price: 0, stock: 25 },
          { id: "v8-2-2", name: "Pedas", price: 0, stock: 30 },
          { id: "v8-2-3", name: "Sangat Pedas", price: 0, stock: 18 },
        ],
      },
    ],
  },
  {
    id: "9",
    name: "Martabak Manis",
    desc: "Martabak manis dengan berbagai topping pilihan",
    price: 28000,
    img: "https://placehold.co/500x500.png",
    soldCount: 134,
    likeCount: 102,
    stock: 33,
    variants: [
      {
        id: "v9-1",
        title: "Topping",
        isRequired: false,
        isMultipleChoice: true,
        data: [
          { id: "v9-1-1", name: "Coklat Keju", price: 5000, stock: 40 },
          { id: "v9-1-2", name: "Kacang Susu", price: 7000, stock: 35 },
          { id: "v9-1-3", name: "Srikaya", price: 6000, stock: 28 },
        ],
      },
    ],
  },
  {
    id: "10",
    name: "Es Cendol Dawet",
    desc: "Minuman tradisional dengan cendol, santan, dan gula merah",
    price: 12000,
    img: "https://placehold.co/500x500.png",
    soldCount: 267,
    likeCount: 189,
    stock: 60,
    variants: [],
  },
];

const dummyDetailRestaurant: DetailRestaurant = {
  id: "res-001",
  name: "McDonald's Solo",
  banner: "https://placehold.co/500x500.png",
  img: "https://placehold.co/500x500.png",
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
  const navigation = useMainNavigation();
  const route = useAppRoute<"DetailRestaurant">();
  const { id } = route.params;
  console.log("id-detail-restaurant:", id);

  const insets = useSafeAreaInsets();

  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [showScrollNav, setShowScrollNav] = useState<boolean>(false);

  const sectionListRef = useRef<SectionList<any>>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const categoryTitles = useMemo<BasicData[]>(() => {
    return dummyDetailRestaurant.foods.map((section) => ({
      id: section.id,
      name: section.title,
    }));
  }, [dummyDetailRestaurant.foods]);

  // Animated values untuk opacity navbar
  const scrollY = useRef(new Animated.Value(0)).current;

  // Threshold untuk mulai transisi (sesuaikan dengan kebutuhan)
  const SCROLL_THRESHOLD = 200;

  // Opacity untuk navbar kedua (muncul saat scroll down)
  const scrollNavOpacity = scrollY.interpolate({
    inputRange: [0, SCROLL_THRESHOLD],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: true,
      listener: (event: any) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setShowScrollNav(offsetY > SCROLL_THRESHOLD);
      },
    }
  );

  const renderRestaurantName = (
    opacity: Animated.AnimatedInterpolation<number>
  ) => (
    <Animated.View style={{ opacity }}>
      <TextScreenName name={dummyDetailRestaurant.name} />
    </Animated.View>
  );

  return (
    <View
      style={[
        globalStyle["root-container"],
        { padding: 0, position: "relative" },
      ]}
    >
      <View
        style={[
          styles["fixed-nav"],
          {
            paddingTop: insets.top,
            paddingHorizontal: 16,
            paddingBottom: 12,
          },
        ]}
      >
        <View style={globalStyle["container-row"]}>
          <ButtonBack />
          {renderRestaurantName(scrollNavOpacity)}
        </View>

        <View style={globalStyle["container-right-tools"]}>
          <Pressable
            onPress={() => {
              navigation.navigate("Search", {
                idRestaurant: dummyDetailRestaurant.id,
                nameRestaurant: dummyDetailRestaurant.name,
              });
            }}
          >
            <Ionicons
              name="search-outline"
              size={24}
              color={colors["primary-black"]}
            />
          </Pressable>

          <Pressable onPress={() => setIsFavorite((prev) => !prev)}>
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={24}
              color={isFavorite ? colors.red : colors["primary-black"]}
            />
          </Pressable>

          <Pressable>
            <Ionicons
              name="share-social"
              size={24}
              color={colors["primary-black"]}
            />
          </Pressable>
        </View>
      </View>

      {/* Content - SectionList */}
      <View style={styles["container-content"]}>
        <AnimatedSectionList
          ref={sectionListRef}
          sections={dummyDetailRestaurant.foods}
          keyExtractor={(item) => item.id}
          stickySectionHeadersEnabled={true}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={{
            paddingBottom: 32,
          }}
          ListHeaderComponent={
            <DetailRestaurantHeader
              data={{
                banner: dummyDetailRestaurant.banner,
                img: dummyDetailRestaurant.img,
                name: dummyDetailRestaurant.name,
                rating: dummyDetailRestaurant.rating,
                countRating: dummyDetailRestaurant.countRating,
                distance: dummyDetailRestaurant.distance,
                estTime: dummyDetailRestaurant.estTime,
              }}
            />
          }
          renderItem={({ item }) => (
            <View style={styles.item}>
              <FoodHorizontalCard data={item} />
            </View>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles["wrap-title-divider"]}>
              <TextPoppins
                style={styles["title-divider"]}
                weight={BOLD}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
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

      <DetailRestaurantMenu
        data={categoryTitles}
        onSelectMenu={(item: BasicData) => {
          const sectionIndex = dummyDetailRestaurant.foods.findIndex(
            (s) => s.id === item.id
          );
          sectionListRef.current?.scrollToLocation({
            itemIndex: 1,
            sectionIndex,
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  "fixed-nav": {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
  },
  "container-content": {
    flex: 1,
  },
  item: {
    paddingHorizontal: 16,
  },
  "title-divider": {
    fontSize: 20,
  },
  "wrap-title-divider": {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
  },
});
