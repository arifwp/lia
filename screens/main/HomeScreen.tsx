import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CartIcon } from "../../components/CartIcon";
import { InputSearch } from "../../components/inputs/InputSearch";
import { TextPoppins } from "../../components/texts/TextPoppins";
import { RootStackParamList } from "../../navs/RootNav";
import { colors } from "../../styles/colors";
import { globalStyle } from "../../styles/globalStyle";

export const HomeScreen = () => {
  const insets = useSafeAreaInsets();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View
      style={[
        globalStyle["root-container"],
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          flexDirection: "column",
          gap: 24,
        },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={{ flexDirection: "column", gap: 4 }}>
          <TextPoppins style={styles["static-title"]}>DELIVER TO</TextPoppins>

          <TextPoppins style={styles.address}>Halal Lab Office</TextPoppins>
        </View>

        <CartIcon />
      </View>

      {/* Input Search */}
      <InputSearch isSearchScreen={false} />

      {/* Categories */}
      <View style={styles.categories}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  "static-title": { fontSize: 12, color: colors.primary },
  address: { fontSize: 14, color: colors["primary-gray"] },
  categories: {
    flexDirection: "row",
    gap: 4,
  },
});
