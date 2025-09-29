import { StyleSheet, View } from "react-native";
import { MEDIUM } from "../../../constants/fonts";
import { ModalBase } from "../../modals/ModalBase";
import { BasicData, TextRounded } from "../../texts/TextRounded";
import { TextSen } from "../../texts/TextSen";
import { InputRangeSlider } from "../../inputs/InputRangeSlider";
import { useState } from "react";

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

export const SearchModalFilter = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: VoidFunction;
}) => {
  const [radius, setRadius] = useState<number>(25);

  return (
    <ModalBase
      isVisible={isVisible}
      onClose={onClose}
      title="Filter"
      style={{ gap: 24 }}
    >
      <View style={styles.section}>
        <TextSen weight={MEDIUM} style={styles.title}>
          Category
        </TextSen>

        <View style={styles["wrap-categories"]}>
          {dummyCategories.map((item) => (
            <TextRounded key={item.id} data={item} />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles["section-title"]}>
          <TextSen weight={MEDIUM} style={styles.title}>
            Radius
          </TextSen>

          <TextSen weight={MEDIUM} style={styles.title}>
            {radius.toFixed()} KM
          </TextSen>
        </View>

        <InputRangeSlider
          minVal={0}
          maxVal={100}
          value={radius}
          onChange={(val: number) => {
            setRadius(val);
          }}
        />
      </View>
    </ModalBase>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
  },
  "wrap-categories": {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  section: {
    flexDirection: "column",
    gap: 12,
  },
  "section-title": {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
