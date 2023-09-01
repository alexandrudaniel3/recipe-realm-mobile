import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, Image, StatusBar } from "react-native";
import Search from "./pages/Search";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Featured from "./pages/Featured";
import Categories from "./pages/Categories";
import Favorites from "./pages/Favorites";
import Recipe from "./pages/Recipe";
import LinearGradient from "react-native-linear-gradient";
import Category from "./pages/Category";
import { transparent } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

function App() {
  const Stack = createStackNavigator();

  const FeaturedStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="FeaturedScreen" component={Featured} />
        <Stack.Screen name="Recipe" component={Recipe} />
      </Stack.Navigator>
    );
  };

  const SearchStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SearchScreen" component={Search} />
        <Stack.Screen name="Recipe" component={Recipe} />
      </Stack.Navigator>
    );
  };

  const CategoriesStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="CategoriesScreen" component={Categories} />
        <Stack.Screen name="Category" component={Category} />
        <Stack.Screen name="Recipe" component={Recipe} />
      </Stack.Navigator>
    );
  };

  const FavoritesStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="FavoritesScreen" component={Favorites} />
        <Stack.Screen name="Recipe" component={Recipe} />
      </Stack.Navigator>
    );
  };


  const Tab = createBottomTabNavigator();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#C94061FF", "#802C6DFF", "#6E449CFF", "#5257A7FF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <StatusBar
          translucent={true} backgroundColor={"transparent"}
        />
      </LinearGradient>
      <NavigationContainer style={{ flex: 1 }}>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: "#6E449CFF",
            tabBarInactiveTintColor: "#555",
            headerBackground: () => (
              <LinearGradient
                colors={["#C94061FF", "#802C6DFF", "#6E449CFF", "#5257A7FF"]}
                style={{ flex: 1 }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
            ),
            headerTitle: "RecipeRealm",
            headerTitleStyle: {
              color: "#fff",
              fontWeight: "bold",
              fontSize: 30,
            },
            headerTitleAlign: "center",
          }}>
          <Tab.Screen name="For You"
                      component={FeaturedStack}
                      options={{
                        tabBarIcon: ({ size, focused }) => (
                          <Image
                            source={require("./assets/home-icon-64px.png")}
                            style={{ width: size, height: size, tintColor: focused ? "#6E449CFF" : "gray" }}
                          />
                        ),
                      }} />
          <Tab.Screen name="Search"
                      component={SearchStack}
                      options={{
                        tabBarIcon: ({ size, focused }) => (
                          <Image
                            source={require("./assets/search-icon-64px.png")}
                            style={{ width: size, height: size, tintColor: focused ? "#6E449CFF" : "gray" }}
                          />
                        ),
                      }} />
          <Tab.Screen name="Categories"
                      component={CategoriesStack}
                      options={{
                        tabBarIcon: ({ size, focused }) => (
                          <Image
                            source={require("./assets/categories-icon-2.png")}
                            style={{ width: size, height: size, tintColor: focused ? "#6E449CFF" : "gray" }}
                          />
                        ),
                      }} />
          <Tab.Screen name="Favorites"
                      component={FavoritesStack}
                      options={{
                        tabBarIcon: ({ size, focused }) => (
                          <Image
                            source={require("./assets/heart-full.png")}
                            style={{ width: size, height: size, tintColor: focused ? "#6E449CFF" : "gray" }}
                          />
                        ),
                      }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}


export default App;
