import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStack } from "./AuthStack";
import { MainStack } from "./MainStack";
import { RootStackParamList } from "./navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNav = ({ isLoggedIn }: { isLoggedIn: boolean }) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    {!isLoggedIn ? (
      <Stack.Screen name="Auth" component={AuthStack} />
    ) : (
      <Stack.Screen name="Main" component={MainStack} />
    )}
  </Stack.Navigator>
);
