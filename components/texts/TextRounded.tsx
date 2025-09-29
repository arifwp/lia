import { Pressable, StyleSheet } from "react-native";
import { TextSen } from "./TextSen";

export interface BasicData {
  id: number;
  name: string;
}

interface Props {
  data: BasicData;
}

export const TextRounded = ({ data }: Props) => {
  return (
    <Pressable style={styles.container}>
      <TextSen style={styles.name}>{data.name}</TextSen>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 34,
    borderColor: "#EDEDED",
    borderWidth: 1,
  },
  name: {
    fontSize: 14,
  },
});
