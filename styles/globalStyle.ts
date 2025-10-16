import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const globalStyle = StyleSheet.create({
  "root-container": {
    flex: 1,
    padding: 16,
    backgroundColor: colors.white,
  },
  "container-row": {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  "container-column": {
    flexDirection: "column",
    gap: 16,
    alignItems: "flex-start",
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
  "container-tools": {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  "container-right-tools": {
    gap: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  "circle-button": {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  "dot-divider": {
    width: 4,
    height: 4,
    borderRadius: 4 / 2,
    backgroundColor: colors["primary-gray"],
  },
  "screen-name": {
    fontSize: 16,
  },
  "upper-shadow": {
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    zIndex: 10,
  },
});

export const blurImg =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
