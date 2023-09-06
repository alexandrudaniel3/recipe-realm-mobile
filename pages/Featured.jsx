import React, { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet, Pressable, Text, Image } from "react-native";
import RecipeCard from "../components/RecipeCard";
import SplashScreen from "react-native-splash-screen";
import shoppingBag from '../assets/shopping-bag.png';
import scale from '../assets/scale.png';
import settingsIcon from '../assets/settings.png';


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
      <ScrollView style={{height: 100, marginHorizontal: 5}} horizontal={true}>
        <Pressable onPress={() => {
          navigation.navigate("ShoppingList");
        }}
        style={{width: 80, alignItems: "center"}}>
          <Image source={shoppingBag} style={{ width: 50, height: undefined, aspectRatio: 1}}/>
          <Text style={{textAlign: "center", color: "#C94061FF" }}>Shopping List</Text>
        </Pressable>
        <Pressable onPress={() => {
        navigation.navigate("UnitConverter");
      }}
                               style={{width: 80, alignItems: "center"}}>
        <Image source={scale} style={{ width: 50, height: undefined, aspectRatio: 1}}/>
        <Text style={{textAlign: "center", color: "#802C6DFF" }}>Unit Converter</Text>
      </Pressable>
        <Pressable onPress={() => {
          navigation.navigate("Settings");
        }}
                   style={{width: 80, alignItems: "center"}}>
          <Image source={settingsIcon} style={{ width: 50, height: undefined, aspectRatio: 1}}/>
          <Text style={{textAlign: "center", color: "#6E449CFF" }}>Settings</Text>
        </Pressable>
      </ScrollView>
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


