import { ScrollView, View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RecipeCard from "../components/RecipeCard";
import { useIsFocused } from "@react-navigation/native";

export default function Favorites({navigation}) {
  const [favoriteRecipesIDs, setFavoriteRecipesIDs] = useState([]);
  const [favoriteRecipesData, setFavoriteRecipesData] = useState();
  const isFocused = useIsFocused();

  const getFavoriteRecipesIds = async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
      setFavoriteRecipesIDs(keys);
      console.log(keys);
    } catch (e) {

    }
  }

  const getFavoriteRecipesTitles = async () => {
    let titles = [];
    for (let id of favoriteRecipesIDs) {
      let recipeDataJson = await AsyncStorage.getItem(id);
      titles.push(JSON.parse(recipeDataJson));
    }

    setFavoriteRecipesData(titles);
  }

  useEffect(() => {
    getFavoriteRecipesIds();
  }, [isFocused]);

  useEffect(() => {
    getFavoriteRecipesIds();
  }, []);

  useEffect(() => {
    getFavoriteRecipesTitles()
  }, [favoriteRecipesIDs]);

  return (
    <View style={{flex: 1, marginTop: 10, }}>
      {favoriteRecipesIDs.length > 0 ? <ScrollView style={{flex: 1}}>
        {favoriteRecipesData ? favoriteRecipesData.map((recipe, index) => (
          <RecipeCard
            key={index}
            props={recipe}
            navigation={navigation}
          />)) : ''
        }
      </ScrollView> : <Text style={styles.noRecipes}>You haven't saved any recipes yet :(</Text>
      }
    </View>
  )
}


const styles = StyleSheet.create({
  noRecipes: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
    color: "#6E449CFF",
  }
})
