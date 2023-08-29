import { StyleSheet, ScrollView, Text, TextInput, View, KeyboardAvoidingView } from "react-native";
import RecipeCard from "../components/RecipeCard";
import React, { useState } from "react";
import { SearchBar } from "@rneui/themed";
import LinearGradient from "react-native-linear-gradient";
import { Searchbar } from "react-native-paper";

const Banner = ({ searchQuery, setSearchQuery, searchRecipes }) => {

  const onChangeSearch = query => {
    setSearchQuery(query);
    console.log(query);
  };

  return (
    <View style={styles.banner}>
      <LinearGradient
        colors={["#C94061FF", "#802C6DFF", "#6E449CFF", "#5257A7FF"]}
        style={styles.searchBarContainer}
      >
        <Searchbar
          style={styles.searchBarInput}
          placeholder="Search Here"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />

      </LinearGradient>
    </View>
  );
};


export default function Search() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchedRecipes, setSearchedRecipes] = React.useState([]);
  const searchRecipes = async () => {
    if (searchQuery.trim() === '') {
      setSearchedRecipes([]);
      return;
    }


    const results = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchQuery.trim())
      .then(response => response.json())
      .then(data => data.meals);

    if (!results) {
      setSearchedRecipes([]);
      return;
    }

    setSearchedRecipes(results);
  };

  React.useEffect(() => {
    searchRecipes();
  }, [searchQuery]);

  return (
    <View style={{ flex: 1 }}>
      <Banner searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchRecipes={searchRecipes} />
      <ScrollView>
        {searchedRecipes.length !== 0 ?
          searchedRecipes.map((recipe, index) => (
            <RecipeCard key={index} id={index} props={recipe} />
          )) : searchQuery.trim() !== '' ? <Text>No recipes found!</Text> : <Text style={{color: "black"}}>Search now!</Text>}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {},
  searchBarContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "100%",
    height: 60,
    borderRadius: 20,
    margin: 20,
  },
  searchBarInput: {
    backgroundColor: "transparent",
    color: "white",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    fontSize: 16,
    fontWeight: "500",
    width: "100%",
  },

});
