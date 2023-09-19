import { Pressable, ScrollView, StyleSheet, Text, Touchable, View } from "react-native";
import RecipeCard from "../components/RecipeCard";
import React, { useEffect, useState } from "react";

export default function Categories({navigation}) {
  const [categories, setCategories] = React.useState([]);

  const getCategories = async () => {
    let results = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      .then(response => response.json())
      .then(data => data.meals);

    results = results.sort((a, b) => a.strCategory.localeCompare(b.strCategory));

    setCategories(results);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.categoriesHeader}>
        Select a category:
      </Text>
        <ScrollView >
          {categories.length !== 0 ?
            categories.map((category, index) => (
              <Pressable key={index} onPress={() => {
                navigation.navigate("Category", {
                  selectedCategory: category.strCategory,
                });
              }}>
                <Text style={styles.categoryName}>{category.strCategory}</Text>
              </Pressable>
            )) : null}
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  categoriesHeader: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 20,
    color: "#6E449CFF",
  },
  categoryName: {
    fontSize: 30,
    textAlign: "left",
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 20,
    color: "#6E449CFF",
  },
})
