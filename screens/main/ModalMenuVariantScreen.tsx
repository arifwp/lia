import { useMutation } from "@tanstack/react-query";
import Checkbox from "expo-checkbox";
import { Controller, useForm } from "react-hook-form";
import { Pressable, SectionList, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Toast } from "toastify-react-native";
import { ButtonBack } from "../../components/buttons/ButtonBack";
import { ButtonPrimary } from "../../components/buttons/ButtonPrimary";
import { CardQty } from "../../components/cards/CardQty";
import { TextPoppins } from "../../components/texts/TextPoppins";
import { TextScreenName } from "../../components/texts/TextScreenName";
import { BOLD, MEDIUM, SEMIBOLD } from "../../constants/fonts";
import { useAppRoute, useMainNavigation } from "../../hooks/useAppNav";
import {
  FoodCheckout,
  SelectedVariantCheckout,
  useCheckoutStore,
} from "../../hooks/useCheckoutStore";
import { colors } from "../../styles/colors";
import { globalStyle } from "../../styles/globalStyle";
import { formatToIDR } from "../../utils/string";

export interface VariantItem {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export interface FoodVariant {
  id: string;
  title: string;
  isRequired: boolean;
  isMultipleChoice: boolean;
  data: VariantItem[];
}

export const dummyVariants: FoodVariant[] = [
  {
    id: "v1",
    title: "Level Pedas",
    isRequired: true,
    isMultipleChoice: false,
    data: [
      { id: "v1-1", name: "Tidak Pedas", price: 0, stock: 50 },
      { id: "v1-2", name: "Sedang", price: 0, stock: 40 },
      { id: "v1-3", name: "Pedas", price: 3000, stock: 30 },
      { id: "v1-4", name: "Sangat Pedas", price: 5000, stock: 20 },
    ],
  },
  {
    id: "v2",
    title: "Ukuran Porsi",
    isRequired: true,
    isMultipleChoice: true,
    data: [
      { id: "v2-1", name: "Kecil", price: 5000, stock: 35 },
      { id: "v2-2", name: "Normal", price: 0, stock: 45 },
      { id: "v2-3", name: "Besar", price: 8000, stock: 25 },
      { id: "v2-4", name: "Jumbo", price: 15000, stock: 15 },
    ],
  },
];

// Base food price (example)
const BASE_FOOD_PRICE = 25000;

export const ModalMenuVariantScreen = () => {
  const navigation = useMainNavigation();
  const route = useAppRoute<"ModalMenuVariant">();
  const { idFood } = route.params;

  const insets = useSafeAreaInsets();

  const { addItem } = useCheckoutStore();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FoodCheckout>({
    defaultValues: {
      qty: 1,
      price: BASE_FOOD_PRICE,
      variants: dummyVariants.map((v) => ({
        id: v.id,
        selectedVariants: [],
      })),
    },
    mode: "onSubmit",
  });

  // Watch variants and qty for total price calculation
  const watchedVariants = watch("variants");
  const watchedQty = watch("qty");

  // Calculate total price
  const calculateTotalPrice = (): number => {
    const variantTotal = watchedVariants.reduce((sum, variant) => {
      const variantPrice = variant.selectedVariants.reduce(
        (vSum, selected) => vSum + selected.price,
        0
      );
      return sum + variantPrice;
    }, 0);

    return (BASE_FOOD_PRICE + variantTotal) * watchedQty;
  };

  const addOrderMutation = useMutation({
    mutationFn: async (data: FoodCheckout) => {
      console.log("Order submitted:", data);

      addItem({
        idFood,
        qty: data.qty,
        price: data.price,
        variants: data.variants,
      });
      return true;
    },
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Berhasil Menambahkan Order",
      });
      navigation.goBack();
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: error.message,
      });
    },
  });

  const onSubmit = (data: FoodCheckout) => {
    addOrderMutation.mutate(data);
  };

  return (
    <View
      style={[
        globalStyle["root-container"],
        { padding: 0, paddingTop: insets.top },
      ]}
    >
      <View
        style={[
          globalStyle["container-row"],
          { paddingVertical: 0, paddingHorizontal: 16 },
        ]}
      >
        <ButtonBack />
        <TextScreenName name={"Pilih Varian"} />
      </View>

      <SectionList
        sections={dummyVariants}
        stickySectionHeadersEnabled
        contentContainerStyle={styles.sectionlist}
        keyExtractor={(item) => item.id}
        renderItem={({ item, section }) => {
          const variantIndex = dummyVariants.findIndex(
            (v) => v.id === section.id
          );

          return (
            <Controller
              key={item.id}
              name={`variants.${variantIndex}.selectedVariants`}
              control={control}
              rules={{
                validate: (value) => {
                  if (section.isRequired && (!value || value.length === 0)) {
                    return `${section.title} wajib dipilih`;
                  }
                  return true;
                },
              }}
              render={({ field: { value = [], onChange } }) => {
                const isChecked = value.some((v) => v.id === item.id);

                const handlePress = () => {
                  if (section.isMultipleChoice) {
                    // Multiple choice logic
                    if (isChecked) {
                      // Remove item
                      onChange(value.filter((v) => v.id !== item.id));
                    } else {
                      // Add item
                      const newVariant: SelectedVariantCheckout = {
                        id: item.id,
                        price: item.price,
                      };
                      onChange([...value, newVariant]);
                    }
                  } else {
                    // Single choice logic
                    if (isChecked) {
                      onChange([]);
                    } else {
                      const newVariant: SelectedVariantCheckout = {
                        id: item.id,
                        price: item.price,
                      };
                      onChange([newVariant]);
                    }
                  }
                };

                return (
                  <Pressable
                    onPress={handlePress}
                    style={[
                      globalStyle["container-row"],
                      { paddingVertical: 12, justifyContent: "space-between" },
                    ]}
                  >
                    <TextPoppins weight={MEDIUM} style={{ maxWidth: 200 }}>
                      {item.name}
                    </TextPoppins>

                    <View
                      style={[
                        globalStyle["container-row"],
                        { gap: 4, alignItems: "center" },
                      ]}
                    >
                      <TextPoppins weight={MEDIUM}>
                        {item.price === 0 ? "Gratis" : formatToIDR(item.price)}
                      </TextPoppins>

                      <Checkbox
                        style={styles.checkbox}
                        value={isChecked}
                        onValueChange={handlePress}
                      />
                    </View>
                  </Pressable>
                );
              }}
            />
          );
        }}
        renderSectionHeader={({ section }) => {
          const variantIndex = dummyVariants.findIndex(
            (v) => v.id === section.id
          );
          const sectionError = errors.variants?.[variantIndex]?.selectedVariants
            ?.message as string | undefined;

          return (
            <View
              style={[
                globalStyle["container-column"],
                {
                  gap: 4,
                  backgroundColor: colors.white,
                  paddingVertical: 12,
                },
              ]}
            >
              <TextPoppins
                style={{ fontSize: 16 }}
                weight={BOLD}
                numberOfLines={1}
              >
                {section.title}
              </TextPoppins>

              <View
                style={[
                  globalStyle["container-row"],
                  {
                    gap: 8,
                  },
                ]}
              >
                {section.isRequired && (
                  <>
                    <TextPoppins
                      style={{
                        fontSize: 12,
                        color: sectionError ? colors.red : colors.primary,
                      }}
                      weight={SEMIBOLD}
                    >
                      {sectionError ? sectionError : "Harus dipilih"}
                    </TextPoppins>

                    <View style={globalStyle["dot-divider"]} />
                  </>
                )}

                <TextPoppins
                  style={{
                    fontSize: 12,
                    color: colors["primary-gray"],
                  }}
                  weight={SEMIBOLD}
                >
                  {section.isMultipleChoice
                    ? "Bisa beberapa pilihan"
                    : "Pilih salah satu"}
                </TextPoppins>
              </View>
            </View>
          );
        }}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: colors["soft-gray"],
            }}
          />
        )}
      />

      <View style={[globalStyle["upper-shadow"], styles["container-footer"]]}>
        <View
          style={[
            globalStyle["container-row"],
            { justifyContent: "space-between" },
          ]}
        >
          <View
            style={[
              globalStyle["container-column"],
              {
                gap: 4,
              },
            ]}
          >
            <TextPoppins weight={SEMIBOLD} style={{ fontSize: 12 }}>
              Total Pembelian
            </TextPoppins>
            <TextPoppins
              weight={BOLD}
              style={{ fontSize: 18, color: colors.primary }}
            >
              {formatToIDR(calculateTotalPrice())}
            </TextPoppins>
          </View>

          <Controller
            name="qty"
            control={control}
            render={({ field }) => (
              <CardQty
                qty={field.value}
                stock={300}
                onChangeQty={(qty) => field.onChange(qty)}
              />
            )}
          />
        </View>

        <ButtonPrimary
          isLoading={addOrderMutation.isPending}
          onPress={handleSubmit(onSubmit)}
          title="Tambah Order"
          buttonStyle={{ marginBottom: insets.bottom }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionlist: {
    paddingHorizontal: 16,
  },
  checkbox: {
    margin: 8,
    borderRadius: 4,
  },
  "container-footer": {
    paddingTop: 16,
    paddingHorizontal: 24,
    backgroundColor: colors.white,
    gap: 16,
  },
});
