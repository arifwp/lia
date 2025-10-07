import { NavigationContainer } from "@react-navigation/native";
import {
  focusManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { AppStateStatus, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ToastManager from "toastify-react-native";
import { CustomToastConfig } from "./components/CustomToastConfig";
import { useAppState } from "./hooks/useAppState";
import { useAuthStore } from "./hooks/useAuthStore";
import { useOnlineManager } from "./hooks/useOnlineManager";
import { RootNav } from "./navs/RootNav";

const onAppStateChange = (status: AppStateStatus) => {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
};

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

SplashScreen.preventAutoHideAsync();

export default function App() {
  useOnlineManager();
  useAppState(onAppStateChange);

  const { isLoggedIn, loading } = useAuthStore();

  const [fontsLoaded] = useFonts({
    "Poppins-Thin": require("./assets/fonts/Poppins-Thin.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("./assets/fonts/Poppins-ExtraBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded && !loading) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, loading]);

  if (!fontsLoaded || loading) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <ToastManager
          position="bottom"
          duration={3000}
          config={CustomToastConfig}
          showCloseIcon
          animationStyle="slide"
          autoHide
        />
        <NavigationContainer>
          <RootNav isLoggedIn={isLoggedIn} />
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
