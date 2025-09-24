import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const CustomToastConfig = {
  success: ({ text1, text2, hide }: any) => (
    <View style={[styles.container, styles.success]}>
      <View style={styles.row}>
        <View style={styles["container-text"]}>
          <Text style={styles.text1}>{text1}</Text>
          {text2 && <Text style={styles.text2}>{text2}</Text>}
        </View>
        <TouchableOpacity onPress={hide}>
          <Text style={styles.close}>✕</Text>
        </TouchableOpacity>
      </View>
    </View>
  ),
  error: ({ text1, text2, hide }: any) => (
    <View style={[styles.container, styles.error]}>
      <View style={styles.row}>
        <View style={styles["container-text"]}>
          <Text style={styles.text1}>{text1}</Text>
          {text2 && <Text style={styles.text2}>{text2}</Text>}
        </View>
        <TouchableOpacity onPress={hide}>
          <Text style={styles.close}>✕</Text>
        </TouchableOpacity>
      </View>
    </View>
  ),
  info: ({ text1, text2, hide }: any) => (
    <View style={[styles.container, styles.info]}>
      <View style={styles.row}>
        <View style={styles["container-text"]}>
          <Text style={styles.text1}>{text1}</Text>
          {text2 && <Text style={styles.text2}>{text2}</Text>}
        </View>
        <TouchableOpacity onPress={hide}>
          <Text style={styles.close}>✕</Text>
        </TouchableOpacity>
      </View>
    </View>
  ),
  warning: ({ text1, text2, hide }: any) => (
    <View style={[styles.container, styles.warning]}>
      <View style={styles.row}>
        <View style={styles["container-text"]}>
          <Text style={styles.text1}>{text1}</Text>
          {text2 && <Text style={styles.text2}>{text2}</Text>}
        </View>
        <TouchableOpacity onPress={hide}>
          <Text style={styles.close}>✕</Text>
        </TouchableOpacity>
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  "container-text": {
    flex: 1,
    gap: 4,
  },
  text1: { color: "#222", fontWeight: "bold" },
  text2: { color: "#222" },
  close: {
    marginLeft: 12,
    fontSize: 16,
    color: "#555",
    fontWeight: "bold",
  },
  success: {
    backgroundColor: "#E8F5E9",
    borderColor: "#4CAF50",
  },
  error: {
    backgroundColor: "#FFEBEE",
    borderColor: "#F44336",
  },
  info: {
    backgroundColor: "#E3F2FD",
    borderColor: "#2196F3",
  },
  warning: {
    backgroundColor: "#FFF8E1",
    borderColor: "#FFC107",
  },
});
