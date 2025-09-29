import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "../screens/auth/LoginScreen";
import { RegisterScreen } from "../screens/auth/RegisterScreen";
import { HomeScreen } from "../screens/main/HomeScreen";
import { SearchScreen } from "../screens/main/SearchScreen";
import { CartScreen } from "../screens/main/CartScreen";

export type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  Home: undefined;
  Search: undefined;
  Cart: undefined;
};

export const RootNav = createNativeStackNavigator({
  initialRouteName: "Register",
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Register: RegisterScreen,
    Login: LoginScreen,
    Home: HomeScreen,
    Search: SearchScreen,
    Cart: CartScreen,
  },
});
