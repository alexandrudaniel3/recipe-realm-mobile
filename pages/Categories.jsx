import { Pressable, ScrollView, Text, Touchable, View } from "react-native";
import RecipeCard from "../components/RecipeCard";
import React, { useEffect, useState } from "react";

export default function Categories() {
  const [categories, setCategories] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState('');
  const [recipesByCategory, setRecipesByCategory] = React.useState([]);

  const category = () => {
    return (
      <Pressable>
        <Text style={{ color: "black" }}>{category.strCategory}</Text>
      </Pressable>
    )
  }

  const searchByCategory = async () => {
    if (selectedCategory === '') {
      return;
    }
    const results = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=' + selectedCategory)
      .then(response => response.json())
      .then(data => data.meals);

    setRecipesByCategory(results);
  }

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

  useEffect(() => {
    searchByCategory();
  }, [selectedCategory]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{flex: 1}}>
        <ScrollView horizontal={true}>
          {categories.length !== 0 ?
            categories.map((category, index) => (
              <Pressable style={{width: 50, height: 50}} key={index} onPress={() => setSelectedCategory(category.strCategory)}>
                <Text style={{ color: "black" }}>{category.strCategory}</Text>
              </Pressable>
            )) : null}
        </ScrollView>
      </View>
      <View style={{flex: 10}}>
        <ScrollView>
          {recipesByCategory.length !== 0 ?
            recipesByCategory.map((recipe, index) => (
              <RecipeCard key={index} id={index} props={recipe} />
            )) :  <Text style={{color: "black"}}>Select a category</Text>}
        </ScrollView>
      </View>
    </View>
  );
}
