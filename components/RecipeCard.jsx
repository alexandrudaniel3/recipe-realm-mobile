import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import LinearGradient from "react-native-linear-gradient";

const RecipeCard = ({ id, props, navigation }) => {
  return (
    <TouchableOpacity
      delayPressIn={10} delayPressOut={10} delayLongPress={10}
      style={styles.recipeCardWrapper}
      onPress={() => {
        /* 1. Navigate to the Details route with params */
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
        <View style={styles.recipeThumbnailContainer}>
          <Image
            source={{uri: props.strMealThumb}}
            style={styles.recipeThumbnail}
            resizeMode="cover"
          />
        </View>
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
    borderRadius: 23,
    margin: 10,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 5,
    // elevation: 4,
    height: 330,
  },
  recipeCard: {
    borderRadius: 20,
    margin: 3,
    backgroundColor: '#fbf8f9',
    height: '98%',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 5,
    // elevation: 4,
  },
  recipeThumbnailContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    flex: 4
  },
  recipeThumbnail: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    height: 240,
  },
  recipeTitleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  recipeTitle: {
    flex: 1,
    fontSize: 30,
    textAlign: 'center',
    justifyContent: 'center',
    color: '#6E449CFF',
    margin: "auto",
  },
});

export default RecipeCard;
