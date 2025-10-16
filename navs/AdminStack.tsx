import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DashboardScreen } from "../screens/admin/DashboardScreen";
import { AdminStackParamList } from "./navigation";

const Stack = createNativeStackNavigator<AdminStackParamList>();

export const AdminStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Dashboard" component={DashboardScreen} />
  </Stack.Navigator>
);
