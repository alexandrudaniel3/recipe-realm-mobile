import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import button from "react-native-paper/src/components/Button/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Divider() {
  return (
    <View
      style={{
        borderBottomColor: "#6E449CFF",
        borderBottomWidth: 1,
        marginHorizontal: 10,
      }}
    />
  );
}

export default function Settings() {

  const clearFavoritesData = async () => {
    let keys = [];
    let recipeKeys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
      recipeKeys = keys.filter((element) => element.includes("recipe"));
    } catch (e) {

    }

    if (recipeKeys.length > 0) {
      await AsyncStorage.multiRemove(recipeKeys);
      console.log("removed");
    }
  };

  const clearShoppingListData = async () => {
    let keys = [];
    let shoppingListKeys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
      shoppingListKeys = keys.filter((element) => element.includes("list"));
    } catch (e) {

    }

    if (shoppingListKeys.length > 0) {
      await AsyncStorage.multiRemove(shoppingListKeys);
      console.log("removed");
    }
  };

  const clearAllData = async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
    } catch (e) {

    }

    if (keys.length > 0) {
      await AsyncStorage.multiRemove(keys);
      console.log("removed");
    }
  };

  const ClearDataButton = ({ buttonText, dataFunction }) => {
    return (
      <Pressable onPress={dataFunction} style={styles.settingsButton}>
        <Text style={styles.settingsText}>
          {buttonText}
        </Text>
      </Pressable>
    );
  };

  const displayConfirmationPopUp = (alertMessage, dataFunction) => {
    Alert.alert(
      "Are you sure?",
      alertMessage,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: dataFunction,
        },
      ],
    );
  };

  return (
    <View>
      <Text style={styles.settingsHeader}>Settings</Text>
      <Text style={styles.settingsTitle}>Manage your data</Text>
      <ClearDataButton
        buttonText={"Clear Favorites data"}
        dataFunction={() => displayConfirmationPopUp("This action will delete all the recipes you have saved in your Favorites section.", clearFavoritesData)} />
      <Divider />
      <ClearDataButton
        buttonText={"Clear Shopping List data"}
        dataFunction={() => displayConfirmationPopUp("This action will delete all your saved recipe shopping lists, and will clear your main shopping list.", clearShoppingListData)} />
      <Divider />
      <ClearDataButton
        buttonText={"Clear all RecipeRealm data"}
        dataFunction={() => displayConfirmationPopUp("This action will delete ALL your RecipeRealm data.", clearAllData)} />
    </View>
  );
}

const styles = StyleSheet.create({
  settingsHeader: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    margin: 20,
    color: "#6E449CFF",
  },
  settingsTitle: {
    fontSize: 20,
    color: "#6E449CFF",
    margin: 20,
    fontWeight: "bold",
  },
  settingsButton: {
    paddingVertical: 8,
  },
  settingsText: {
    color: "#6E449CFF",
    marginHorizontal: 20,
    marginVertical: 5,
  },
});
