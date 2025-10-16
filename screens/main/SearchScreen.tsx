import { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ButtonBack } from "../../components/buttons/ButtonBack";
import { ButtonFilterSearch } from "../../components/buttons/ButtonFilterSearch";
import { InputSearch } from "../../components/inputs/InputSearch";
import { SearchMenuRestaurant } from "../../components/page/search/SearchMenuRestaurant";
import { SearchSugestion } from "../../components/page/search/SearchSugestion";
import { BasicData } from "../../components/texts/TextRounded";
import { useAppRoute } from "../../hooks/useAppNav";
import { globalStyle } from "../../styles/globalStyle";

export const SearchScreen = () => {
  const route = useAppRoute<"Search">();
  const idRestaurant = route.params?.idRestaurant;
  const nameRestaurant = route.params?.nameRestaurant;

  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState("");

  const selectKeyword = (item: BasicData) => setSearchText(item.name);

  const searchRestaurantMenu = idRestaurant && nameRestaurant && searchText;
  const searchGlobalMenu = !idRestaurant && !nameRestaurant;

  return (
    <KeyboardAvoidingView
      style={[
        globalStyle["root-container"],
        {
          paddingTop: insets.top,
          paddingHorizontal: 0,
          gap: 16,
        },
      ]}
    >
      <View
        style={[
          globalStyle["container-row"],
          {
            gap: 6,
            justifyContent: "space-between",
            paddingHorizontal: 16,
          },
        ]}
      >
        <View
          style={[
            globalStyle["container-row"],
            {
              justifyContent: "space-between",
              flex: 1,
              gap: 6,
            },
          ]}
        >
          <ButtonBack />

          <InputSearch
            isSearchScreen
            value={searchText}
            onChange={setSearchText}
            placeholder={
              idRestaurant && nameRestaurant
                ? `Cari menu di ${nameRestaurant}`
                : "Search food or restaurants..."
            }
            containerStyle={{ flex: 1 }}
          />
        </View>

        {searchGlobalMenu && <ButtonFilterSearch />}
      </View>

      {/* Content */}
      <View style={styles.scrollContent}>
        {searchRestaurantMenu ? (
          <SearchMenuRestaurant
            restaurant={{ id: idRestaurant!, name: nameRestaurant! }}
            search={searchText}
          />
        ) : searchGlobalMenu ? (
          <SearchSugestion onSelectKeyword={selectKeyword} />
        ) : (
          <View style={styles.blankContainer} />
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    gap: 24,
  },
  blankContainer: {
    flex: 1,
    backgroundColor: "white",
  },
});
