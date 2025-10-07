import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../../navs/navigation";

export const ButtonBack = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.goBack()}
    >
      <Ionicons name="chevron-back-outline" size={24} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 46,
    width: 46,
    padding: 6,
    borderRadius: 46 / 2,
    backgroundColor: "#ECF0F4",
    justifyContent: "center",
    alignItems: "center",
  },
});
