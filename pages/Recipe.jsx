import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import React, { useEffect } from "react";
import CheckBox from "@react-native-community/checkbox";

export default function Recipe({ route }) {
  const { recipeID } = route.params;
  const [recipeData, setRecipeData] = React.useState({});
  const [formattedIngredients, setFormattedIngredients] = React.useState([]);

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

  };

  useEffect(() => {
    getRecipe();
  }, []);

  const recipeHeader = () => {
    if (!recipeData) {
      return;
    }

    return (
      <View style={styles.recipeHeader}>
        {recipeData.strMealThumb ? <Image source={{ uri: recipeData.strMealThumb }}
                                          style={styles.recipeImage} /> : null}
        <Text style={styles.recipeTitle}>{recipeData.strMeal}</Text>
        <Text style={styles.recipeCategoryAndCuisine}>Category: {recipeData.strCategory}</Text>
        <Text style={styles.recipeCategoryAndCuisine}>Cuisine: {recipeData.strArea}</Text>
      </View>
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
                        onValueChange={(newValue) => ingredientCheckHandler(index, newValue)} />
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

    return (
      <View style={styles.instructionsContainer}>
        <Text style={styles.sectionTitle}>Instructions:</Text>
        <Text style={styles.instructionsText}>{recipeData.strInstructions}</Text>
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
    recipeHeader: {
      margin: 10,
    },
    recipeImage: {
      height: 300,
    },
    recipeTitle: {
      textAlign: "center",
      color: "#6E449CFF",
      fontWeight: "500",
      fontSize: 30,
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
      fontSize: 18,
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
