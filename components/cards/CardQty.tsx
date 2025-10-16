import AntDesign from "@expo/vector-icons/AntDesign";
import { useEffect, useRef, useState } from "react";
import { Pressable, View } from "react-native";
import { SEMIBOLD } from "../../constants/fonts";
import { colors } from "../../styles/colors";
import { globalStyle } from "../../styles/globalStyle";
import { TextPoppins } from "../texts/TextPoppins";

interface Props {
  onChangeQty: (qty: number) => void;
  qty: number;
  stock: number;
}

export const CardQty = ({ onChangeQty, qty, stock }: Props) => {
  const [tempQty, setTempQty] = useState<number>(qty);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    onChangeQty(tempQty);
  }, [tempQty]);

  const handleDecrease = () => {
    setTempQty((prev) => (prev <= 1 ? 1 : prev - 1));
  };

  const handleIncrease = () => {
    setTempQty((prev) => (prev >= stock ? stock : prev + 1));
  };

  const startAuto = (action: "inc" | "dec") => {
    action === "inc" ? handleIncrease() : handleDecrease();

    intervalRef.current = setInterval(() => {
      action === "inc" ? handleIncrease() : handleDecrease();
    }, 100);
  };

  const stopAuto = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <View style={[globalStyle["container-row"], { alignItems: "center" }]}>
      <Pressable
        onPress={handleDecrease}
        onLongPress={() => startAuto("dec")}
        onPressOut={stopAuto}
        delayLongPress={250} // lama menahan sebelum auto jalan
      >
        <AntDesign
          name="minus-circle"
          size={24}
          color={tempQty <= 1 ? colors["primary-gray"] : colors.primary}
        />
      </Pressable>

      <TextPoppins
        weight={SEMIBOLD}
        style={{ minWidth: 28, textAlign: "center" }}
      >
        {tempQty}
      </TextPoppins>

      <Pressable
        onPress={handleIncrease}
        onLongPress={() => startAuto("inc")}
        onPressOut={stopAuto}
        delayLongPress={250}
      >
        <AntDesign
          name="plus-circle"
          size={24}
          color={tempQty >= stock ? colors["primary-gray"] : colors.primary}
        />
      </Pressable>
    </View>
  );
};
