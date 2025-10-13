import { Pressable, ScrollView, View } from "react-native";
import { REGULAR, SEMIBOLD } from "../../../constants/fonts";
import { TabViewCategory } from "../../../screens/main/DetailRestaurantScreen";
import { colors } from "../../../styles/colors";
import { TextPoppins } from "../../texts/TextPoppins";

export const DetailRestaurantTabBar = ({ props }: { props: any }) => {
  return (
    <View
      style={{
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors["light-gray"],
      }}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: "row" }}>
          {props.navigationState.routes.map(
            (route: TabViewCategory, i: number) => {
              const focused = i === props.navigationState.index;

              return (
                <Pressable
                  key={route.key}
                  onPress={() => props.jumpTo(route.key)}
                  style={{
                    paddingVertical: 12,
                    paddingHorizontal: 24,
                    minWidth: 100,
                    maxWidth: 180,
                    alignItems: "center",
                    justifyContent: "center",
                    borderBottomWidth: focused ? 2 : 0,
                    borderBottomColor: colors.primary,
                  }}
                >
                  <TextPoppins
                    weight={focused ? SEMIBOLD : REGULAR}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      color: focused
                        ? colors["primary-black"]
                        : colors["primary-gray"],
                      fontSize: 14,
                      textAlign: "center",
                    }}
                  >
                    {route.title}
                  </TextPoppins>
                </Pressable>
              );
            }
          )}
        </View>
      </ScrollView>
    </View>
  );
};
