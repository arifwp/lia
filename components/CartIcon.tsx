import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../navs/RootNav";
import { colors } from "../styles/colors";
import { TextSen } from "./texts/TextSen";

export const CartIcon = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const count = 2;
  const displayCount = count > 99 ? "99+" : count.toString();

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={() => navigation.navigate("Cart")}
    >
      <Feather name="shopping-bag" size={24} color="white" />

      {count > 0 && (
        <View style={styles.wrapTotal}>
          <TextSen style={styles.text}>{displayCount}</TextSen>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 40,
    padding: 6,
    borderRadius: 40 / 2,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  wrapTotal: {
    minHeight: 24,
    minWidth: 24,
    borderRadius: 24 / 2,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -4,
    right: -4,
  },
  text: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },
});
