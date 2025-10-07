import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMutation } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Controller, useForm } from "react-hook-form";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Toast } from "toastify-react-native";
import { ButtonPrimary } from "../../components/buttons/ButtonPrimary";
import { InputPrimary } from "../../components/inputs/InputPrimary";
import { COMMON_ERR_MSG } from "../../constants/error";
import { useAuthStore } from "../../hooks/useAuthStore";
import { RootStackParamList } from "../../navs/navigation";
import { colors } from "../../styles/colors";
import { globalStyle } from "../../styles/globalStyle";

interface Login {
  email: string;
  password: string;
}

export const LoginScreen = () => {
  const insets = useSafeAreaInsets();
  const login = useAuthStore((state) => state.login);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>();

  const loginMutation = useMutation({
    mutationFn: async (data: Login) => {
      // Your actual Supabase login here
      // const { data: authData, error } = await supabase.auth.signInWithPassword({
      //   email: data.email,
      //   password: data.password,
      // });
      // if (error) throw error;
      // return authData.session.access_token;

      // Mock for now
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return "mock-token-12345";
    },
    onSuccess: async (token) => {
      await login(token);
      Toast.show({
        type: "success",
        text1: "Login Success",
      });
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: COMMON_ERR_MSG,
      });
    },
  });

  const onSubmit = (data: Login) => {
    loginMutation.mutate(data);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={[
          globalStyle["root-container"],
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            gap: 24,
          },
        ]}
      >
        <View style={{ gap: 14 }}>
          <Image
            style={globalStyle["sm-logo"]}
            source="https://placehold.co/500x500.png"
            contentFit="contain"
            cachePolicy={"disk"}
          />

          <View style={styles["container-title"]}>
            <Text style={[globalStyle["xl-title"], { fontWeight: 600 }]}>
              Welcome Back 👋
            </Text>

            <View style={styles["container-app-title"]}>
              <Text style={[globalStyle["xl-title"], { fontWeight: 600 }]}>
                to
              </Text>

              <Text
                style={[
                  globalStyle["xl-title"],
                  { fontWeight: 600, color: colors.primary },
                ]}
              >
                LIA
              </Text>
            </View>
          </View>

          <Text
            style={[
              styles.subtitle,
              {
                marginTop: -8,
              },
            ]}
          >
            Hello there, login to continue
          </Text>
        </View>

        <View style={{ flex: 1, gap: 14 }}>
          <Controller
            name="email"
            control={control}
            rules={{ required: "Email must be filled" }}
            render={({ field }) => (
              <InputPrimary
                label="Email address"
                value={field.value}
                onChange={field.onChange}
                error={errors.email?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{ required: "Password must be filled" }}
            render={({ field }) => (
              <InputPrimary
                label="Password"
                value={field.value}
                onChange={field.onChange}
                error={errors.password?.message}
                secureTextEntry
              />
            )}
          />

          <Text style={styles["forgot-password"]}>Forgot Password?</Text>

          <ButtonPrimary
            buttonStyle={{ marginTop: 14 }}
            title="Login"
            onPress={handleSubmit(onSubmit)}
            isLoading={loginMutation.isPending}
          />
        </View>

        <View style={styles["container-register"]}>
          <Text>Don't have any account?</Text>

          <Text
            style={styles["link-register"]}
            onPress={() => navigation.navigate("Auth", { screen: "Register" })}
          >
            Register
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 14,
    fontWeight: 400,
    color: colors["primary-gray"],
  },
  "container-title": {
    flexDirection: "column",
    gap: 4,
  },
  "container-app-title": {
    flexDirection: "row",
    gap: 8,
  },
  "forgot-password": {
    color: colors.primary,
    alignSelf: "flex-end",
    fontSize: 14,
  },
  "container-register": {
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
  },
  "link-register": {
    fontSize: 14,
    fontWeight: 600,
    color: colors.primary,
  },
});
