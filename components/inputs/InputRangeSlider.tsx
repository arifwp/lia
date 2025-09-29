import Slider from "@react-native-community/slider";
import { StyleSheet, View } from "react-native";
import { colors } from "../../styles/colors";
import { TextSen } from "../texts/TextSen";

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
        minimumTrackTintColor={colors["primary-black"]}
        maximumTrackTintColor={colors["primary-gray"]}
      />

      <View style={styles["container-text"]}>
        <TextSen>{minVal}</TextSen>
        <TextSen>{maxVal}</TextSen>
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
