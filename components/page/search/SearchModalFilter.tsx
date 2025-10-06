import { StyleSheet, View } from "react-native";
import { MEDIUM } from "../../../constants/fonts";
import { useSearchFilterStore } from "../../../hooks/useSearchFilterStore";
import { colors } from "../../../styles/colors";
import { InputRangeSlider } from "../../inputs/InputRangeSlider";
import { ModalBase } from "../../modals/ModalBase";
import { TextPoppins } from "../../texts/TextPoppins";
import { SearchFilterMultipleSelect } from "./SearchFilterMultipleSelect";

export const SearchModalFilter = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: VoidFunction;
}) => {
  const { radius, setRadius } = useSearchFilterStore();

  return (
    <ModalBase
      isVisible={isVisible}
      onClose={onClose}
      title="Filter"
      style={{ gap: 24 }}
      height={"50%"}
    >
      <View style={styles.section}>
        <TextPoppins weight={MEDIUM} style={styles.title}>
          Category
        </TextPoppins>

        <SearchFilterMultipleSelect />
      </View>

      <View style={styles.section}>
        <View style={styles["section-title"]}>
          <TextPoppins weight={MEDIUM} style={styles.title}>
            Radius
          </TextPoppins>

          <TextPoppins weight={MEDIUM} style={styles.title}>
            {radius.toFixed()} KM
          </TextPoppins>
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
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 24,
  },
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
  "button-container": {
    paddingVertical: 16,
    borderTopColor: colors["light-gray"],
    borderTopWidth: 1,
  },
});
