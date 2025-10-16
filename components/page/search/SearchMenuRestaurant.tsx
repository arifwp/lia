import { FlatList, StyleSheet, View } from "react-native";
import { dummyFoodHorizontal } from "../../../screens/main/DetailRestaurantScreen";
import { FoodHorizontalCard } from "../../cards/FoodHorizontalCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  restaurant: { id: string; name: string };
  search: string;
}

export const SearchMenuRestaurant = ({ restaurant, search }: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <FlatList
      data={dummyFoodHorizontal}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator
      renderItem={({ item }) => (
        <View style={styles.item}>
          <FoodHorizontalCard data={item} />
        </View>
      )}
      style={styles["flat-list"]}
      contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 16,
  },
  "flat-list": {
    width: "100%",
  },
});
