import { View, Text, StyleSheet, Image, ScrollView, ImageBackground, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import CheckBox from "@react-native-community/checkbox";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Recipe({ route }) {
  const { recipeID } = route.params;
  const [recipeData, setRecipeData] = React.useState({});
  const [formattedIngredients, setFormattedIngredients] = React.useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

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
  };

  const favoriteButtonHandler = () => {
    if (isFavorite) {
      removeFromFavorites();
    } else {
      addToFavorites();
    }
  }
  const addToFavorites = async () => {
    try {
      await AsyncStorage.setItem(recipeID, JSON.stringify(recipeData));
      setIsFavorite(true);
    } catch (e) {
      console.log(e);
    }
  }

  const removeFromFavorites = async () => {
    try {
      await AsyncStorage.removeItem(recipeID);
      setIsFavorite(false);
    } catch (e) {
      console.log(e);
    }
  }

  const checkIfFavorite = async () => {
    try {
      const value = await AsyncStorage.getItem(recipeID);
      if (value !== null) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getRecipe();
  }, []);

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
              <Pressable
                style={styles.recipeFavoriteButton}
                onPress={favoriteButtonHandler}
              >
                {isFavorite ? <Image
                  source={require('../assets/heart-full.png')}
                  style={{width: 35, height: 35,
                    resizeMode: "contain"}}
                /> : <Image
                  source={require('../assets/heart-empty.png')}
                  style={{width: 35, height: 35,
                    resizeMode: "contain"}}
                />}
              </Pressable>
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
      </View>
    );
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


  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {recipeHeader()}
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
      alignItems: 'center',
      justifyContent: 'center',
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
