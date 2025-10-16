import { StyleSheet, View } from "react-native";
import { MEDIUM } from "../../../constants/fonts";
import { globalStyle } from "../../../styles/globalStyle";
import { TextPoppins } from "../../texts/TextPoppins";
import { BasicData, TextRounded } from "../../texts/TextRounded";
import {
  SearchSuggestedRestaurants,
  SuggestedRestaurant,
} from "./SearchSuggestedRestaurants";

const dummyKeywords: BasicData[] = [
  {
    id: 1,
    name: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
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
    id: "1",
    name: "Ponzi Restaurant",
    img: "https://placehold.co/500x500.png",
    rating: "4.6",
  },
  {
    id: "2",
    name: "American Burger Shop",
    img: "https://placehold.co/500x500.png",
    rating: "4.5",
  },
  {
    id: "3",
    name: "Cafenio Coffe Club",
    img: "https://placehold.co/500x500.png",
    rating: "4.9",
  },
  // {
  //   id: "4",
  //   name: "Ponzi Restaurant",
  //   img: "https://placehold.co/500x500.png",
  //   rating: "4.6",
  // },
  // {
  //   id: "5",
  //   name: "American Burger Shop",
  //   img: "https://placehold.co/500x500.png",
  //   rating: "4.5",
  // },
  // {
  //   id: "6",
  //   name: "Cafenio Coffe Club",
  //   img: "https://placehold.co/500x500.png",
  //   rating: "4.9",
  // },
  // {
  //   id: "7",
  //   name: "Ponzi Restaurant",
  //   img: "https://placehold.co/500x500.png",
  //   rating: "4.6",
  // },
  // {
  //   id: "8",
  //   name: "American Burger Shop",
  //   img: "https://placehold.co/500x500.png",
  //   rating: "4.5",
  // },
  // {
  //   id: "9",
  //   name: "Cafenio Coffe Club",
  //   img: "https://placehold.co/500x500.png",
  //   rating: "4.9",
  // },
];

interface Props {
  onSelectKeyword: (item: BasicData) => void;
}

export const SearchSugestion = ({ onSelectKeyword }: Props) => {
  return (
    <View style={styles.container}>
      {/* Recent Keywords */}
      <View style={[globalStyle["container-column"], styles["gap-column"]]}>
        <TextPoppins weight={MEDIUM}>Recent Keywords</TextPoppins>

        <View style={styles["container-keywords"]}>
          {dummyKeywords.slice(0, 5).map((item) => (
            <TextRounded
              key={item.id}
              data={item}
              onPress={() => onSelectKeyword(item)}
            />
          ))}
        </View>
      </View>

      {/* Popular Keywords */}
      <View style={[globalStyle["container-column"], styles["gap-column"]]}>
        <TextPoppins weight={MEDIUM}>Popular Keywords</TextPoppins>

        <View style={styles["container-keywords"]}>
          {dummyKeywords.slice(6, 12).map((item) => (
            <TextRounded
              key={item.id}
              data={item}
              onPress={() => onSelectKeyword(item)}
            />
          ))}
        </View>
      </View>

      {/* Suggested Restaurants */}
      <View style={[globalStyle["container-column"], styles["gap-column"]]}>
        <TextPoppins weight={MEDIUM}>Suggested Restaurants</TextPoppins>

        <View style={[globalStyle["container-column"], { gap: 0 }]}>
          {dummySuggestedRestaurants.map((item) => (
            <SearchSuggestedRestaurants key={item.id} data={item} />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: 24,
  },
  "gap-column": {
    gap: 10,
  },
  "container-keywords": {
    gap: 6,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
