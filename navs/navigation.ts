import type { NavigatorScreenParams } from "@react-navigation/native";

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Favorite: undefined;
  Activity: undefined;
  Chat: undefined;
};

export type MainStackParamList = {
  BottomNav: NavigatorScreenParams<BottomTabParamList>;
  Search: undefined;
  Cart: undefined;
  Notification: undefined;
  Profile: undefined;
  DetailRestaurant: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainStackParamList>;
};
