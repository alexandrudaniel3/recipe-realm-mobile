import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Pressable } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const RecipeCard = ({ id, props, navigation }) => {
  return (
    <Pressable
      delayPressIn={10} delayPressOut={10} delayLongPress={10}
      style={styles.recipeCardWrapper}
      onPress={() => {
        navigation.navigate('Recipe', {
          recipeID: props.idMeal,
        });
      }}
    >
      <LinearGradient
        start={{x: 0, y: 0}} end={{x: 1, y: 0}}
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
    </Pressable>
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
    shadowColor: "#6e449c",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity:  0.22,
    shadowRadius: 9.22,
    elevation: 12
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
