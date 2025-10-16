import { StyleSheet, View } from "react-native";
import { TextPoppins } from "../../components/texts/TextPoppins";
import { colors } from "../../styles/colors";

export const OnboardingScreen = () => {
  return (
    <View style={styles.container}>
      <TextPoppins>Onboarding Screen</TextPoppins>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
});
