import { StyleSheet, View } from "react-native";
import { useSearchFilterStore } from "../../../hooks/useSearchFilterStore";
import { colors } from "../../../styles/colors";
import { withOpacity } from "../../../utils/color";
import { BasicData, TextRounded } from "../../texts/TextRounded";

const dummyCategories: BasicData[] = [
  {
    id: 1,
    name: "Burger",
  },
  {
    id: 2,
    name: "Pizza",
  },
  {
    id: 3,
    name: "Serba Goreng",
  },
  {
    id: 4,
    name: "Fast Food",
  },
];

export const SearchFilterMultipleSelect = () => {
  const { categories, setCategories } = useSearchFilterStore();

  return (
    <View style={styles.container}>
      {dummyCategories.map((item) => (
        <TextRounded
          key={item.id}
          data={item}
          containerStyle={
            categories.find((v) => v.id === item.id)
              ? {
                  borderColor: colors.primary,
                  borderWidth: 1,
                  backgroundColor: withOpacity(colors.primary, 0.2),
                }
              : undefined
          }
          onPress={() => setCategories(item)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
});
