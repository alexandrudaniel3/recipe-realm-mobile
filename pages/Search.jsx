import { StyleSheet, ScrollView, Text, TextInput, View, KeyboardAvoidingView } from "react-native";
import RecipeCard from "../components/RecipeCard";
import React, { useState } from "react";
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
        start={{x: 0, y: 0}} end={{x: 1, y: 0}}
        colors={["#C94061FF", "#802C6DFF", "#6E449CFF", "#5257A7FF"]}
        style={styles.searchBarContainer}
      >
        <Searchbar
          style={styles.searchBarInput}
          placeholder="Search Here"
          onChangeText={onChangeSearch}
          value={searchQuery}
          placeholderTextColor="white"
          inputStyle={{color: "white"}}
          icon={require('../assets/search-icon-64px.png')}
          iconColor={"white"}
          clearIcon={require('../assets/clear-icon-64px.png')}
        />

      </LinearGradient>
    </View>
  );
};


export default function Search({navigation}) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchedRecipes, setSearchedRecipes] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const searchRecipes = async () => {
    if (searchQuery.trim() === '') {
      setSearchedRecipes([]);
      return;
    }

    setLoading(true);
    const results = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchQuery.trim())
      .then(response => response.json())
      .then(data => data.meals);
    setLoading(false);
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
      <ScrollView keyboardShouldPersistTaps='handled'>
        {searchedRecipes.length !== 0 ?
          searchedRecipes.map((recipe, index) => (
            <RecipeCard key={index} id={index} props={recipe} navigation={navigation}/>
          )) : searchQuery.trim() === '' ? <Text style={styles.resultsPlaceholderText}>Search now :)</Text> : loading ? null : <Text style={styles.resultsPlaceholderText}>No recipes found.</Text>}
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
  resultsPlaceholderText: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
    color: "#6E449CFF",
  }
});
