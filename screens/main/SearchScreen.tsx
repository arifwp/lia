import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ButtonBack } from "../../components/buttons/ButtonBack";
import { ButtonFilterSearch } from "../../components/buttons/ButtonFilterSearch";
import { CartIcon } from "../../components/CartIcon";
import { InputSearch } from "../../components/inputs/InputSearch";
import {
  SearchSuggestedRestaurants,
  SuggestedRestaurant,
} from "../../components/page/search/SearchSuggestedRestaurants";
import { BasicData, TextRounded } from "../../components/texts/TextRounded";
import { TextSen } from "../../components/texts/TextSen";
import { useDebounce } from "../../hooks/useDebounce";
import { RootStackParamList } from "../../navs/RootNav";
import { colors } from "../../styles/colors";
import { globalStyle } from "../../styles/globalStyle";

const dummyKeywords: BasicData[] = [
  {
    id: 1,
    name: "Burger",
  },
  {
    id: 2,
    name: "Sandwich",
  },
  {
    id: 3,
    name: "Pizza",
  },
  {
    id: 4,
    name: "Burger",
  },
  {
    id: 5,
    name: "Fluitter",
  },
  {
    id: 6,
    name: "Pizza",
  },
  {
    id: 7,
    name: "Burger",
  },
  {
    id: 8,
    name: "Sandwich",
  },
  {
    id: 9,
    name: "Pizza",
  },
  {
    id: 10,
    name: "Burger",
  },
  {
    id: 11,
    name: "Sandwich",
  },
  {
    id: 12,
    name: "Pizza",
  },
];

const dummySuggestedRestaurants: SuggestedRestaurant[] = [
  {
    id: 1,
    name: "Ponzi Restaurant",
    img: "https://placehold.co/500x500.png",
    rating: "4.6",
  },
  {
    id: 2,
    name: "American Burger Shop",
    img: "https://placehold.co/500x500.png",
    rating: "4.5",
  },
  {
    id: 3,
    name: "Cafenio Coffe Club",
    img: "https://placehold.co/500x500.png",
    rating: "4.9",
  },
  {
    id: 4,
    name: "Ponzi Restaurant",
    img: "https://placehold.co/500x500.png",
    rating: "4.6",
  },
  {
    id: 5,
    name: "American Burger Shop",
    img: "https://placehold.co/500x500.png",
    rating: "4.5",
  },
  {
    id: 6,
    name: "Cafenio Coffe Club",
    img: "https://placehold.co/500x500.png",
    rating: "4.9",
  },
  {
    id: 7,
    name: "Ponzi Restaurant",
    img: "https://placehold.co/500x500.png",
    rating: "4.6",
  },
  {
    id: 8,
    name: "American Burger Shop",
    img: "https://placehold.co/500x500.png",
    rating: "4.5",
  },
  {
    id: 9,
    name: "Cafenio Coffe Club",
    img: "https://placehold.co/500x500.png",
    rating: "4.9",
  },
];

export const SearchScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearch = useDebounce(searchText, 1000);
  const selectKeyword = (item: BasicData) => {
    setSearchText(item.name);
  };

  return (
    <KeyboardAvoidingView
      style={[
        globalStyle["root-container"],
        {
          padding: 0,
          paddingTop: insets.top,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles["sub-header"]}>
          <ButtonBack />

          <TextSen style={styles["screen-name"]}>Search</TextSen>
        </View>
        <CartIcon />
      </View>

      <View style={styles["wrap-search"]}>
        <InputSearch
          isSearchScreen={true}
          value={searchText}
          onChange={(result: string) => setSearchText(result)}
          containerStyle={{ flex: 1 }}
        />

        <ButtonFilterSearch />
      </View>

      {/* SV Content */}
      <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
        {/* Recent Keywords */}
        <View
          style={[
            styles["container-section"],
            { paddingLeft: 0, marginTop: 0 },
          ]}
        >
          <TextSen style={[styles.title, { paddingHorizontal: 16 }]}>
            Recent Keywords
          </TextSen>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles["sv-keywords"]}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            onScrollBeginDrag={Keyboard.dismiss}
          >
            {dummyKeywords.map((item) => (
              <TextRounded
                key={item.id}
                data={item}
                onPress={() => selectKeyword(item)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Suggested Restaurants */}
        <View style={[styles["container-section"], { paddingRight: 16 }]}>
          <TextSen style={styles.title}>Suggested Restaurants</TextSen>

          <View style={styles["wrap-column"]}>
            {dummySuggestedRestaurants.map((item) => (
              <SearchSuggestedRestaurants key={item.id} data={item} />
            ))}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 6,
  },
  "sub-header": {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  "screen-name": {
    fontSize: 16,
    fontWeight: 400,
    color: colors["primary-black"],
  },
  "container-section": {
    flexDirection: "column",
    gap: 12,
    paddingLeft: 16,
    marginTop: 24,
  },
  "sv-keywords": {
    flexDirection: "row",
    gap: 10,
    marginHorizontal: 16,
    paddingRight: 16,
  },
  "wrap-column": {
    flexDirection: "column",
  },
  "wrap-search": {
    paddingHorizontal: 16,
    marginTop: 24,
    paddingBottom: 16,
    flexDirection: "row",
    gap: 8,
  },
  title: {
    fontSize: 16,
    color: colors["primary-black"],
  },
});
