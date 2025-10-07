import { Ionicons, Octicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View } from "react-native";
import { TextPoppins } from "../components/texts/TextPoppins";
import { ActivityScreen } from "../screens/main/bottomNav/ActivityScreen";
import { ChatScreen } from "../screens/main/bottomNav/ChatScreen";
import { FavoriteScreen } from "../screens/main/bottomNav/FavoriteScreen";
import { HomeScreen } from "../screens/main/bottomNav/HomeScreen";
import { colors } from "../styles/colors";

const Tab = createBottomTabNavigator();

export const BottomNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <Octicons
                name={focused ? "home-fill" : "home"}
                size={24}
                color={focused ? colors.primary : colors["primary-gray"]}
              />
              <TextPoppins
                style={[
                  styles.tabLabel,
                  { color: focused ? colors.primary : colors["primary-gray"] },
                ]}
              >
                Beranda
              </TextPoppins>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <Ionicons
                name={focused ? "heart" : "heart-outline"}
                size={24}
                color={focused ? colors.primary : colors["primary-gray"]}
              />
              <TextPoppins
                style={[
                  styles.tabLabel,
                  { color: focused ? colors.primary : colors["primary-gray"] },
                ]}
              >
                Favorit
              </TextPoppins>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Activity"
        component={ActivityScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <Ionicons
                name={focused ? "document-text" : "document-text-outline"}
                size={24}
                color={focused ? colors.primary : colors["primary-gray"]}
              />
              <TextPoppins
                style={[
                  styles.tabLabel,
                  { color: focused ? colors.primary : colors["primary-gray"] },
                ]}
              >
                Aktivitas
              </TextPoppins>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <Ionicons
                name={focused ? "chatbox-ellipses" : "chatbox-ellipses-outline"}
                size={24}
                color={focused ? colors.primary : colors["primary-gray"]}
              />
              <TextPoppins
                style={[
                  styles.tabLabel,
                  { color: focused ? colors.primary : colors["primary-gray"] },
                ]}
              >
                Chat
              </TextPoppins>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 90,
    paddingTop: 16,
    backgroundColor: "#FFFFFF",
    borderTopColor: "#E5E5E5",
    borderTopWidth: 0.5,
    elevation: 8,
    shadowColor: colors["primary-black"],
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  tabItem: {
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
    flexWrap: "nowrap",
  },
});
