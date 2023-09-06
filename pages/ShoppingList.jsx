import {
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { useEffect, useMemo, useState } from "react";
import MainList from "../components/MainList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RecipeList from "../components/RecipeList";
import { useIsFocused } from "@react-navigation/native";


export default function ShoppingList() {
  const [listIDs, setListIDs] = useState([]);
  const isFocused = useIsFocused();

  const initializeLists = async () => {
    await createMainListIfNotExists();
    await getRecipeListIDs();
  };

  useEffect(() => {
    initializeLists();
  }, []);

  useEffect(() => {
    initializeLists();
  }, [isFocused]);


  const createMainListIfNotExists = async () => {
    const mainListID = await AsyncStorage.getItem("list:My List");
    if (mainListID === null) {
      await AsyncStorage.setItem("list:My List", "");
    }
  };

  const getRecipeListIDs = async () => {
    const IDs = await AsyncStorage.getAllKeys();
    const listIDs = IDs.filter((element) => element.includes("list"));
    const recipeListIDs = listIDs.filter((element) => !element.includes("My List"));
    setListIDs(recipeListIDs);
  };

  const deleteList = async (listID) => {
    try {
      await AsyncStorage.removeItem(listID);
      await getRecipeListIDs();
    } catch {

    }

  };

  const Lists = () => {
    if (listIDs.length === 0) {
      return;
    }

    return listIDs.map((listID, index) => (
      <RecipeList listID={listID} deleteList={deleteList} key={index} />
    ));
  };

  return (
      <View>
        <Text style={styles.shoppingListHeader}>Shopping List</Text>
        <ScrollView keyboardShouldPersistTaps='handled'>
          <MainList />
          <Lists />
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
    shoppingListHeader: {
      fontSize: 30,
      textAlign: "center",
      fontWeight: "bold",
      margin: 20,
      color: "#6E449CFF",
    },
  },
);
