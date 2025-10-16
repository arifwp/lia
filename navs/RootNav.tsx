import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AdminStack } from "./AdminStack";
import { AuthStack } from "./AuthStack";
import { MainStack } from "./MainStack";
import { RootStackParamList } from "./navigation";
import { OnboardingStack } from "./OnboardingStack";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNav = ({
  isLoggedIn,
  userRole,
  isFirstTime,
}: {
  isLoggedIn: boolean;
  userRole?: "user" | "admin";
  isFirstTime?: boolean;
}) => {
  let initialRoute: keyof RootStackParamList = "Auth";

  if (isFirstTime) initialRoute = "Onboarding";
  else if (isLoggedIn && userRole === "admin") initialRoute = "Admin";
  else if (isLoggedIn) initialRoute = "Main";

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingStack} />
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Main" component={MainStack} />
        <Stack.Screen name="Admin" component={AdminStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
