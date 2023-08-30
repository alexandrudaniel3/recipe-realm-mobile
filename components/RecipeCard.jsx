import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import LinearGradient from "react-native-linear-gradient";

const RecipeCard = ({ id, props, navigation }) => {
  return (
    <TouchableOpacity
      delayPressIn={10} delayPressOut={10} delayLongPress={10}
      style={styles.recipeCardWrapper}
      onPress={() => {
        navigation.navigate('Recipe', {
          recipeID: props.idMeal,
        });
      }}
    >
      <LinearGradient
        colors={['#C94061FF', '#802C6DFF', '#6E449CFF', '#5257A7FF']}
        style={styles.recipeCardWrapper}
      >
      <View style={styles.recipeCard}>
          <Image
            source={{uri: props.strMealThumb}}
            style={styles.recipeThumbnail}
            resizeMode="cover"
          />
        <View style={styles.recipeTitleContainer}>
          <Text style={styles.recipeTitle}>
            {props.strMeal}
          </Text>
        </View>
      </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  recipeCardWrapper: {
    margin: 10,
    marginTop: 0,
    borderRadius: 23,
  },
  recipeCard: {
    borderRadius: 18,
    margin: 5,
    backgroundColor: "white",
  },
  recipeThumbnail: {
    height: 240,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  recipeTitleContainer: {
    margin: 15,
  },
  recipeTitle: {
    textAlign: "center",
    color: "#6E449CFF",
    fontWeight: "500",
    fontSize: 30,
  },
});

export default RecipeCard;
