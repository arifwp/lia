import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { MEDIUM } from "../../../constants/fonts";
import { InputRangeSlider } from "../../inputs/InputRangeSlider";
import { ModalBase } from "../../modals/ModalBase";
import { TextSen } from "../../texts/TextSen";
import { SearchFilterMultipleSelect } from "./SearchFilterMultipleSelect";

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

        <SearchFilterMultipleSelect />
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
  section: {
    flexDirection: "column",
    gap: 12,
  },
  "section-title": {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
