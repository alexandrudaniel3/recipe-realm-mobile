import { StyleSheet, Text, View } from "react-native";
import RecipeConverter from "../components/RecipeConverter";

export default function UnitConverter() {

  return (
    <View>
      <Text style={styles.unitConverterHeader}>Unit Converter</Text>
      <RecipeConverter />
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
