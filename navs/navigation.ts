import type { NavigatorScreenParams } from "@react-navigation/native";

// --- Auth Stack ---
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

// --- Onboarding Stack ---
export type OnboardingStackParamList = {
  Welcome: undefined;
  // Intro: undefined;
  // Permissions: undefined;
};

// --- Bottom Tabs ---
export type BottomTabParamList = {
  Home: undefined;
  Favorite: undefined;
  Activity: undefined;
  Chat: undefined;
  Profile: undefined;
};

// --- Main Stack (User App) ---
export type MainStackParamList = {
  BottomNav: NavigatorScreenParams<BottomTabParamList>;
  Search: { idRestaurant: string; nameRestaurant: string } | undefined;
  Cart: undefined;
  Profile: undefined;
  Notification: undefined;
  DetailRestaurant: { id: string };
  ModalMenuVariant: { idFood: string };
};

// --- Admin Stack ---
export type AdminStackParamList = {
  Dashboard: undefined;
  Users: undefined;
  Settings: undefined;
};

// --- Root Stack ---
export type RootStackParamList = {
  Onboarding: NavigatorScreenParams<OnboardingStackParamList>;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainStackParamList>;
  Admin: NavigatorScreenParams<AdminStackParamList>;
};
