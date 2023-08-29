import React from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import RecipeCard from "./components/RecipeCard";
import Search from "./pages/Search";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Featured from "./pages/Featured";
import Categories from "./pages/Categories";
import Favorites from "./pages/Favorites";

function App() {

  const Tab = createBottomTabNavigator();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer style={{flex: 1}}>
        <Tab.Navigator>
          <Tab.Screen name="Featured" component={Featured} />
          <Tab.Screen name="Search" component={Search} />
          <Tab.Screen name="Categories" component={Categories} />
          <Tab.Screen name="Favorites" component={Favorites} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
