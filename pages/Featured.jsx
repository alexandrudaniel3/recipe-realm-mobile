import React, { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import RecipeCard from "../components/RecipeCard";
import SplashScreen from "react-native-splash-screen";

export default function Featured({ navigation }) {
  const [recipes, setRecipes] = useState([]);

  const getFeaturedRecipes = async () => {
    const newRecipes = [];
    for (let i = 0; i < 12; i++) {
      const randomRecipe = await fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then(response => response.json())
        .then(data => data.meals[0]);
      ;
      newRecipes.push(randomRecipe);
    }
    setRecipes(newRecipes);
  };

  useEffect(() => {
    getFeaturedRecipes();

    SplashScreen.hide();
  }, []);

  return (
    <View style={styles.featuredMain}>
      <ScrollView>
        {recipes.map((recipe, index) => (
          <RecipeCard
            key={index}
            props={recipe}
            navigation={navigation}
          />))
        }
      </ScrollView>
    </View>
  );

}

const styles = StyleSheet.create({
  featuredMain: {
    marginTop: 10,
  }
})


