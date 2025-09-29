import { createStaticNavigation } from "@react-navigation/native";
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

const Navigation = createStaticNavigation(RootNav);

SplashScreen.preventAutoHideAsync();

export default function App() {
  useOnlineManager();

  useAppState(onAppStateChange);

  const [fontsLoaded] = useFonts({
    "Sen-Regular": require("./assets/fonts/Sen-Regular.ttf"),
    "Sen-Medium": require("./assets/fonts/Sen-Medium.ttf"),
    "Sen-SemiBold": require("./assets/fonts/Sen-SemiBold.ttf"),
    "Sen-Bold": require("./assets/fonts/Sen-Bold.ttf"),
    "Sen-ExtraBold": require("./assets/fonts/Sen-ExtraBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

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
