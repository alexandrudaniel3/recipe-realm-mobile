import React from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import Search from "./pages/Search";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import Featured from "./pages/Featured";
import Categories from "./pages/Categories";
import Favorites from "./pages/Favorites";
import Recipe from "./pages/Recipe";

function App() {
  const Stack = createStackNavigator();

  const FeaturedStack = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="FeaturedScreen" component={Featured} />
        <Stack.Screen name="Recipe" component={Recipe}/>
      </Stack.Navigator>
    )
  }

  const SearchStack = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SearchScreen" component={Search} />
        <Stack.Screen name="Recipe" component={Recipe}/>
      </Stack.Navigator>
    )
  }

  const CategoriesStack = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="CategoriesScreen" component={Categories} />
        <Stack.Screen name="Recipe" component={Recipe}/>
      </Stack.Navigator>
    )
  }

  const FavoritesStack = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="FavoritesScreen" component={Favorites} />
        <Stack.Screen name="Recipe" component={Recipe}/>
      </Stack.Navigator>
    )
  }


  const Tab = createBottomTabNavigator();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer style={{flex: 1}}>
        <Tab.Navigator>
          <Tab.Screen name="Featured" component={FeaturedStack} />
          <Tab.Screen name="Search" component={SearchStack} />
          <Tab.Screen name="Categories" component={CategoriesStack} />
          {/*<Tab.Screen name="Favorites" component={FavoritesStack} />*/}
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}



export default App;
