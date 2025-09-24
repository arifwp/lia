import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  focusManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AppStateStatus, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ToastManager from "toastify-react-native";
import { CustomToastConfig } from "./components/CustomToastConfig";
import { useAppState } from "./hooks/useAppState";
import { useOnlineManager } from "./hooks/useOnlineManager";
import { LoginScreen } from "./screens/auth/LoginScreen";
import { RegisterScreen } from "./screens/auth/RegisterScreen";

const onAppStateChange = (status: AppStateStatus) => {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
};

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

export type RootStackParamList = {
  Register: undefined;
  Login: undefined;
};

const RootStack = createNativeStackNavigator({
  initialRouteName: "Register",
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Register: RegisterScreen,
    Login: LoginScreen,
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  useOnlineManager();

  useAppState(onAppStateChange);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <ToastManager
          position="bottom"
          duration={3000}
          config={CustomToastConfig}
          showCloseIcon={true}
          animationStyle={"slide"}
          autoHide={true}
        />

        <Navigation />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
