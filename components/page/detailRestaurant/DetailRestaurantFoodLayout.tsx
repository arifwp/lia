import React, { memo } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { FoodItem, FoodSimpleCard } from "../../cards/FoodSimpleCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  foods: FoodItem[];
}

export const DetailRestaurantFoodLayout = memo(({ foods }: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <FlatList
        data={foods}
        renderItem={(data) => (
          <FoodSimpleCard
            data={data.item}
            containerStyle={styles["food-item"]}
          />
        )}
        keyExtractor={(data) => data.id}
        numColumns={2}
        scrollEnabled={false}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  "food-item": {
    width: "50%",
    padding: 16,
  },
});
