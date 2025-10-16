import { StyleSheet } from "react-native";
import { BOLD } from "../../constants/fonts";
import { colors } from "../../styles/colors";
import { TextPoppins } from "./TextPoppins";

interface Props {
  name: string;
}

export const TextScreenName = ({ name, ...rest }: Props) => {
  return (
    <TextPoppins
      weight={BOLD}
      style={styles["screen-name"]}
      numberOfLines={1}
      ellipsizeMode="tail"
      {...rest}
    >
      {name}
    </TextPoppins>
  );
};

const styles = StyleSheet.create({
  "screen-name": {
    maxWidth: 200,
    fontSize: 16,
    color: colors["primary-black"],
  },
});
