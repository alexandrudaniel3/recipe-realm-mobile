import { Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import RecipeConverter from "../components/RecipeConverter";

export default function UnitConverter() {

  const [page, setPage] = useState('recipe');

  const UnitConverterContent = () => {
    switch (page) {
      case 'recipe':
        return <RecipeConverter />;
      case 'butter':
        return <Text>butter</Text>;
      case 'temperature':
        return <Text>temperature</Text>;
    }
  }

  return (
    <View>
      <Text style={styles.unitConverterHeader}>Unit Converter</Text>
      <View style={{flexDirection: "row"}}>
        <Pressable onPress={() => setPage('recipe')}><Text>Common</Text></Pressable>
        <Pressable onPress={() => setPage('butter')}><Text>Butter</Text></Pressable>
        <Pressable onPress={() => setPage('temperature')}><Text>Temperature</Text></Pressable>
      </View>
      <UnitConverterContent />
    </View>
  )
}

const styles = StyleSheet.create({
    unitConverterHeader: {
      fontSize: 30,
      textAlign: "center",
      fontWeight: "bold",
      margin: 20,
      color: "#6E449CFF",
    },
  },
);
