import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { globalStyle } from "../../../styles/globalStyle";

export const FavoriteScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        globalStyle["root-container"],
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          flexDirection: "column",
          gap: 16,
        },
      ]}
    >
      <Text>Favorite Screen</Text>
    </View>
  );
};
