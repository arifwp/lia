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
import { InputCheckbox } from "../../components/inputs/InputCheckbox";
import { InputPrimary } from "../../components/inputs/InputPrimary";
import { RootStackParamList } from "../../navs/RootNav";
import { colors } from "../../styles/colors";
import { globalStyle } from "../../styles/globalStyle";
import { TextSen } from "../../components/texts/TextSen";

interface Register {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAggreement: boolean;
}

export const RegisterScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Register>({
    defaultValues: {
      termsAggreement: false,
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: Register) => {},
    onSuccess: () => {},
    onError: (error) => {},
    onSettled: () => {},
  });

  const onSubmit = (data: Register) => {
    if (!data.termsAggreement) {
      Toast.error("You must accept terms to register");
      return;
    }

    registerMutation.mutate(data);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={[
          globalStyle["root-container"],
          { paddingTop: insets.top, paddingBottom: insets.bottom, gap: 24 },
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
            <TextSen style={[globalStyle["xl-title"], { fontWeight: 600 }]}>
              Register Account
            </TextSen>

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
            Hello there, register to continue
          </Text>
        </View>

        <View style={{ flex: 1, gap: 14 }}>
          <Controller
            name="fullName"
            control={control}
            rules={{ required: "Name must be filled" }}
            render={({ field }) => (
              <InputPrimary
                label="Full Name"
                value={field.value}
                onChange={field.onChange}
                error={errors.fullName?.message}
              />
            )}
          />

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
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            rules={{ required: "Confirm password must be filled" }}
            render={({ field }) => (
              <InputPrimary
                label="Confirm Password"
                value={field.value}
                onChange={field.onChange}
                error={errors.confirmPassword?.message}
              />
            )}
          />

          <Controller
            name="termsAggreement"
            control={control}
            render={({ field }) => (
              <InputCheckbox
                label="I agree the Terms & Condition set out by this app"
                value={field.value}
                onValueChange={field.onChange}
              />
            )}
          />

          <ButtonPrimary
            buttonStyle={{ marginTop: 14 }}
            title="Register"
            onPress={handleSubmit(onSubmit)}
          />
        </View>

        <View style={styles["container-login"]}>
          <Text>Already have an account?</Text>

          <Text
            style={styles["link-login"]}
            onPress={() => navigation.navigate("Login")}
          >
            Login
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
  "container-login": {
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
  },
  "link-login": {
    fontSize: 14,
    fontWeight: 600,
    color: colors.primary,
  },
});
