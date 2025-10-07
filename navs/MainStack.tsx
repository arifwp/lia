import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CartScreen } from "../screens/main/CartScreen";
import { NotificationScreen } from "../screens/main/NotificationScreen";
import { ProfileScreen } from "../screens/main/ProfileScreen";
import { SearchScreen } from "../screens/main/SearchScreen";
import { BottomNav } from "./BottomNav";
import { MainStackParamList } from "./navigation";

const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="BottomNav" component={BottomNav} />
    <Stack.Screen name="Search" component={SearchScreen} />
    <Stack.Screen name="Cart" component={CartScreen} />
    <Stack.Screen name="Notification" component={NotificationScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
  </Stack.Navigator>
);
