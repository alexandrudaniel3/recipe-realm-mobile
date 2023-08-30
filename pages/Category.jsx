import RecipeCard from "../components/RecipeCard";
import { ScrollView, View, Text, StyleSheet, Pressable } from "react-native";
import React, { useEffect } from "react";

export default function Category({ route, navigation }) {
  const { selectedCategory } = route.params;

  const [recipesByCategory, setRecipesByCategory] = React.useState([]);

  const searchByCategory = async () => {
    if (selectedCategory === "") {
      return;
    }
    const results = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=" + selectedCategory)
      .then(response => response.json())
      .then(data => data.meals);

    setRecipesByCategory(results);
  };

  useEffect(() => {
    searchByCategory();
  }, []);

  if (!selectedCategory) {
    return (
      <View>
        <Text>Select a category.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.categoryHeader}>
        <Pressable style={styles.categoryBack}
                   onPress={() => navigation.goBack()}
                   hitSlop = {50}>
          <Text style={styles.categoryBack}>Back</Text>
        </Pressable>
        <Text style={styles.categoryTitle}>{selectedCategory}</Text>
      </View>
      <ScrollView>
        {recipesByCategory.length !== 0 ?
          recipesByCategory.map((recipe, index) => (
            <RecipeCard key={index} id={index} props={recipe} navigation={navigation} />
          )) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryHeader: {
    justifyContent: "center",
    paddingTop: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  categoryBack: {
    fontSize: 20,
    color: "#6E449CFF",
    top: 0,
    position: "absolute",
    marginLeft: 10,
  },
  categoryTitle: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    alignSelf: "center",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "absolute",
    color: "#6E449CFF",
  },
});
