import Slider from "@react-native-community/slider";
import { StyleSheet, View } from "react-native";
import { colors } from "../../styles/colors";
import { TextPoppins } from "../texts/TextPoppins";

interface Props {
  maxVal?: number;
  minVal?: number;
  value: number;
  onChange: (val: number) => void;
}

export const InputRangeSlider = ({
  maxVal = 50,
  minVal = 0,
  value,
  onChange,
}: Props) => {
  return (
    <View>
      <Slider
        style={{ width: "100%", height: 40 }}
        minimumValue={minVal}
        maximumValue={maxVal}
        value={value}
        onValueChange={onChange}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor={colors["primary-gray"]}
      />

      <View style={styles["container-text"]}>
        <TextPoppins>{minVal}</TextPoppins>
        <TextPoppins>{maxVal}</TextPoppins>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  "container-text": {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
