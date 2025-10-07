import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, StyleSheet, View } from "react-native";
import { RootStackParamList } from "../navs/navigation";
import { colors } from "../styles/colors";
import { TextPoppins } from "./texts/TextPoppins";

export const NotificationIcon = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const count = 14;
  const displayCount = count > 99 ? "99+" : count.toString();

  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate("Main", { screen: "Notification" })}
    >
      <MaterialIcons name="notifications-none" size={28} color="black" />

      {count > 0 && (
        <View style={styles.wrapTotal}>
          <TextPoppins style={styles.text}>{displayCount}</TextPoppins>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 40,
    padding: 6,
    borderRadius: 40 / 2,
    backgroundColor: colors["light-gray"],
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
    fontSize: 12,
    fontWeight: "700",
  },
});
