import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const globalStyle = StyleSheet.create({
  "root-container": {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  "primary-color": {
    color: colors.primary,
  },
  "xl-title": {
    fontSize: 32,
    color: "#000",
    fontWeight: 600,
  },
  "sm-logo": {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});
