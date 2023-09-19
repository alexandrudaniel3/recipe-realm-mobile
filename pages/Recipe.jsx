import { View, Text, StyleSheet, Image, ScrollView, ImageBackground, Pressable, Share } from "react-native";
import React, { useEffect, useState } from "react";
import CheckBox from "@react-native-community/checkbox";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
import { useIsFocused } from "@react-navigation/native";

export default function Recipe({ route }) {
  const { recipeID } = route.params;
  const [recipeData, setRecipeData] = React.useState({});
  const [formattedIngredients, setFormattedIngredients] = React.useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const isFocused = useIsFocused();


  const getRecipe = async () => {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + recipeID);
    const data = await response.json();
    setRecipeData(data.meals[0]);

    const newIngredients = [];

    for (let i = 1; i <= 20; i++) {
      if (!data.meals[0]["strIngredient" + i]) {
        break;
      }
      newIngredients.push({
        checked: false,
        measure: data.meals[0]["strMeasure" + i],
        ingredient: data.meals[0]["strIngredient" + i],
      });
    }

    setFormattedIngredients(newIngredients);

    const favoriteCheck = await checkIfFavorite();
    setIsFavorite(favoriteCheck);

    console.log(favoriteCheck);
  };

  const favoriteButtonHandler = () => {
    if (isFavorite) {
      removeFromFavorites();
    } else {
      addToFavorites();
    }
  };

  const addToFavorites = async () => {
    try {
      await AsyncStorage.setItem("recipe:" + recipeID, JSON.stringify(recipeData));
      setIsFavorite(true);
      showMessage({
        message: "Recipe added to favorites.",
      });
    } catch (e) {
      console.log(e);
    }
  };

  const removeFromFavorites = async () => {
    try {
      await AsyncStorage.removeItem("recipe:" + recipeID);
      setIsFavorite(false);
      showMessage({
        message: "Recipe removed from favorites.",
      });
    } catch (e) {
      console.log(e);
    }
  };

  const FavoriteButton = () => {
    return (
      <Pressable
        style={styles.recipeFavoriteButton}
        onPress={favoriteButtonHandler}
      >
        {isFavorite ? <Image
          source={require("../assets/heart-full.png")}
          style={{
            width: 35, height: 35,
            resizeMode: "contain",
          }}
        /> : <Image
          source={require("../assets/heart-empty.png")}
          style={{
            width: 35, height: 35,
            resizeMode: "contain",
          }}
        />}
      </Pressable>
    );
  };

  const checkIfFavorite = async () => {
    try {
      const value = await AsyncStorage.getItem("recipe:" + recipeID);
      if (value !== null) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getRecipe();
  }, []);

  useEffect(() => {
    getRecipe();
  }, [isFocused]);

  const recipeHeader = () => {
    if (!recipeData) {
      return;
    }

    return (
      <LinearGradient
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        colors={["#C94061FF", "#802C6DFF", "#6E449CFF", "#5257A7FF"]}
        style={styles.recipeHeaderWrapper}
      >
        <View style={styles.recipeHeader}>
          {recipeData.strMealThumb ?
            <ImageBackground
              source={{ uri: recipeData.strMealThumb }}
              style={styles.recipeImage}>
              <FavoriteButton />
            </ImageBackground> : null}
          <View style={styles.recipeHeaderText}>
            <Text style={styles.recipeTitle}>{recipeData.strMeal}</Text>
            <Text style={styles.recipeCategoryAndCuisine}>Category: {recipeData.strCategory}</Text>
            <Text style={styles.recipeCategoryAndCuisine}>Cuisine: {recipeData.strArea}</Text>
          </View>
        </View>
      </LinearGradient>
    );
  };

  const ingredientCheckHandler = (index, newValue) => {
    const updatedIngredients = [...formattedIngredients];
    updatedIngredients[index].checked = newValue;

    setFormattedIngredients(updatedIngredients);
  };

  const recipeIngredients = () => {
    if (!recipeData) {
      return;
    }

    return (
      <View style={styles.ingredientsContainer}>
        <Text style={styles.sectionTitle}>Ingredients:</Text>
        <View style={{ flex: 10 }}>
          {formattedIngredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredientRow}>
              <CheckBox disabled={false} value={ingredient.checked}
                        onValueChange={(newValue) => ingredientCheckHandler(index, newValue)}
                        tintColors={{ true: "#6e449c", false: "#6E449CFF" }}
              />
              <Text style={styles.ingredientText}>
                {ingredient.measure + " " + ingredient.ingredient}
              </Text>
            </View>
          ))}
        </View>
        <View>
          <Pressable
            onPress={addToShoppingList}
            style={styles.recipePageButtonContainer}
          >
            <Text style={styles.recipePageButton}>Add Ingredients to Shopping List</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  const addToShoppingList = async () => {
    const checkIfPresent = await AsyncStorage.getItem("list:" + recipeData.strMeal);
    if (checkIfPresent !== null) {
      showMessage({
        message: "Ingredients already in Shopping List.",
      });

      return;
    }
    const shoppingList = formattedIngredients.map((element, index) => {
      return {
        id: index,
        checked: false,
        text: element.measure + " " + element.ingredient,
      };
    });

    await AsyncStorage.setItem("list:" + recipeData.strMeal, JSON.stringify(shoppingList));

    showMessage({
      message: "Ingredients added to Shopping List.",
    });
  };

  const recipeDirections = () => {
    if (!recipeData) {
      return;
    }

    const directions = recipeData.strInstructions?.replace(/^/gm, "\t");

    return (
      <View style={styles.instructionsContainer}>
        <Text style={styles.sectionTitle}>Instructions:</Text>
        <Text style={styles.instructionsText}>{directions}</Text>
      </View>
    );
  };

  const recipeShare = () => {

    return (
      <Pressable
        onPress={async () => {
          await Share.share({
            message: `Check out this recipe for '${recipeData.strMeal}' I found on RecipeRealm! http://alexandrudaniel3.github.io/recipe-app-react/#/recipe/${recipeID}/`,
          });
        }}
        style={styles.recipePageButtonContainer}
      >
        <Text style={styles.recipePageButton}>Share Recipe</Text>
        <Image
          style={{ width: 18, height: 18, alignSelf: "center", tintColor: "#6E449CFF", marginLeft: 3 }}
          source={require("../assets/share_icon.png")}
        />
      </Pressable>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {recipeHeader()}
        {recipeShare()}
        {recipeIngredients()}
        {recipeDirections()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    recipeHeaderWrapper: {
      margin: 10,
      borderRadius: 23,
    },
    recipeHeader: {
      borderRadius: 18,
      margin: 5,
      backgroundColor: "white",
      shadowColor: "#6e449c",
      shadowOffset: {
        width: 0,
        height: 9,
      },
      shadowOpacity: 0.22,
      shadowRadius: 9.22,
      elevation: 12,
      overflow: "hidden",
    },
    recipeImage: {
      height: 300,
      borderTopLeftRadius: 18,
      borderTopRightRadius: 18,
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "flex-end",
    },
    recipeFavoriteButton: {
      backgroundColor: "#C94061FF",
      width: 65,
      height: 65,
      position: "relative",
      margin: 10,
      borderRadius: 50,
      alignItems: "center",
      justifyContent: "center",
    },
    recipeHeaderText: {
      margin: 15,
    },
    recipeTitle: {
      textAlign: "center",
      color: "#6E449CFF",
      fontWeight: "bold",
      fontSize: 30,
      marginBottom: 10,
    },
    recipeCategoryAndCuisine: {
      textAlign: "center",
      color: "#6E449CFF",
    },
    ingredientsContainer: {
      marginTop: 20,
      paddingHorizontal: 20,
    },
    sectionTitle: {
      fontSize: 30,
      textAlign: "center",
      fontWeight: "bold",
      marginBottom: 10,
      color: "#6E449CFF",
    },
    ingredientRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 5,
      color: "#6E449CFF",
    },
    ingredientText: {
      marginLeft: 10,
      color: "#6E449CFF",
    },
    recipePageButtonContainer: {
      alignSelf: "center",
      borderStyle: "solid",
      borderColor: "#6E449CFF",
      borderWidth: 2,
      padding: 7,
      borderRadius: 15,
      flexDirection: "row"
    },
    recipePageButton: {
      fontSize: 15,
      textAlign: "center",
      fontWeight: "bold",
      color: "#6E449CFF",
    },
    instructionsContainer: {
      marginTop: 20,
      paddingHorizontal: 20,
    },
    instructionsText: {
      marginLeft: 10,
      color: "#6E449CFF",
    },
  },
);
