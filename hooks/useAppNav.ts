import {
  useNavigation,
  useRoute,
  type RouteProp,
} from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  AdminStackParamList,
  AuthStackParamList,
  MainStackParamList,
  RootStackParamList,
} from "../navs/navigation";

// --- Root Navigation ---
export const useAppNavigation = () =>
  useNavigation<NativeStackNavigationProp<RootStackParamList>>();

// --- Specific Stack Navigations ---
export const useMainNavigation = () =>
  useNavigation<NativeStackNavigationProp<MainStackParamList>>();

export const useAuthNavigation = () =>
  useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

export const useAdminNavigation = () =>
  useNavigation<NativeStackNavigationProp<AdminStackParamList>>();

// --- Route helper generic ---
export const useAppRoute = <T extends keyof MainStackParamList>() =>
  useRoute<RouteProp<MainStackParamList, T>>();
