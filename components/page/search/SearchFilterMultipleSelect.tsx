import { useState } from "react";
import { StyleSheet, View } from "react-native";
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
  const [selected, setSelected] = useState<BasicData[]>([]);

  const onSelect = (data: BasicData) => {
    setSelected((prev) => {
      const exist = prev.find((item) => item.id === data.id);

      if (exist) {
        return prev.filter((item) => item.id !== data.id);
      } else {
        return [...prev, data];
      }
    });
  };

  return (
    <View style={styles.container}>
      {dummyCategories.map((item) => (
        <TextRounded
          key={item.id}
          data={item}
          containerStyle={
            selected.find((v) => v.id === item.id)
              ? {
                  borderColor: colors.primary,
                  borderWidth: 1,
                  backgroundColor: withOpacity(colors.primary, 0.2),
                }
              : undefined
          }
          onPress={() => onSelect(item)}
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
