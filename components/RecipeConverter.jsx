import { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { units, ingredientsDensity } from "../utils/conversionData";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { convertData } from "../utils/conversionData";

function ValueBox({ value, setValue }) {

  const handleChange = (value) => {
    setValue(value);
  };

  return (
    <View style={{ alignItems: "center" }}>
      <TextInput
        onChangeText={handleChange}
        value={value}
        placeholder="Insert value here..."
        keyboardType="numeric"
        style={styles.textInput}
        placeholderTextColor={"#6E449CFF"}
      />
    </View>
  );
}

export default function RecipeConverter() {
  const [fromUnit, setFromUnit] = useState("m:g");
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);
  const [toUnit, setToUnit] = useState("m:kg");
  const [ingredientDensity, setIngredientDensity] = useState(1.00);
  const [ingredientOpen, setIngredientOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [result, setResult] = useState("");

  const closeOtherPickers = (currentPicker) => {
    if (currentPicker !== "from") setFromOpen(false);
    if (currentPicker !== "to") setToOpen(false);
    if (currentPicker !== "ingredient") setIngredientOpen(false);
  };

  function handleSubmit() {
    if (value) {
      let test = convertData(fromUnit, toUnit, value, ingredientDensity);
      if (typeof test === "number") {
        test = test.toFixed(3);
      }
      setResult(value + fromUnit.substring(2) + " = " + test + toUnit.substring(2));
    } else {
      setResult("");
    }
  }

  useEffect(() => {
    handleSubmit();
  }, [fromUnit, toUnit, value]);

  const DisplayIngredientPicker = () => {
    if ((fromUnit.includes("m:") && toUnit.includes("v:")) || (fromUnit.includes("v:") && toUnit.includes("m:"))) {
      return (
        <View style={{ zIndex: 1000 }}>
          <Text style={styles.volumeWarning}>In order to convert mass to volume and vice versa, please select an ingredient:</Text>
          <DropDownPicker setValue={setIngredientDensity} value={ingredientDensity} items={ingredientsDensity}
                          open={ingredientOpen}
                          setOpen={(open) => {
                            setIngredientOpen(open);
                            if (open) {
                              closeOtherPickers("ingredient");
                            }
                          }}
                          zIndex={1000} zIndexInverse={2000} itemKey="label"
                          showTickIcon={false} style={styles.selector} />
        </View>
      );
    } else {
      return;
    }

  };

  return (
    <View style={{ marginHorizontal: 10 }}>
      <Text style={styles.fromTo}>From:</Text>
      <DropDownPicker setValue={setFromUnit} value={fromUnit} items={units} open={fromOpen} setOpen={(open) => {
        setFromOpen(open);
        if (open) {
          closeOtherPickers("from");
        }
      }}
                      zIndex={3000} zIndexInverse={1000} showTickIcon={false}
                      style={styles.selector} />
      <Text style={styles.fromTo}>To:</Text>
      <DropDownPicker setValue={setToUnit} value={toUnit} items={units} open={toOpen} setOpen={(open) => {
        setToOpen(open);
        if (open) {
          closeOtherPickers("to");
        }
      }}
                      zIndex={2000} zIndexInverse={2000} showTickIcon={false}
                      style={styles.selector} />
      <DisplayIngredientPicker />
      <ValueBox setValue={setValue} />
      <View style={{ zIndex: 100 }}>
        {/*<Pressable onPress={handleSubmit} style={styles.convertButtonContainer}>*/}
        {/*  <Text style={styles.convertButton}>Convert</Text>*/}
        {/*</Pressable>*/}
      </View>
      {result ?
        <Text style={styles.resultText}>{result}</Text> :
        null}
    </View>
  );
}

const styles = StyleSheet.create({
    selector: {
      borderStyle: "solid",
      borderColor: "#6E449CFF",
      borderWidth: 2,
      marginVertical: 5,
      width: "80%",
      alignSelf: "center",
    },
    fromTo: {
      width: "75%",
      alignSelf: "center",
      color: "#6E449CFF",
    },
  volumeWarning: {
    color: "#6E449CFF",
    textAlign: "center",
    fontSize: 20,
  },
    textInput: {
      borderStyle: "solid",
      borderColor: "#6E449CFF",
      borderWidth: 2,
      margin: 20,
      borderRadius: 7,
      width: "60%",
      height: 50,
      padding: 10,
      color: "#6E449CFF",
    },
    convertButtonContainer: {
      alignItems: "center",
    },
    convertButton: {
      alignSelf: "center",
      padding: 5,
      borderStyle: "solid",
      borderColor: "#6E449CFF",
      borderWidth: 2,
      backgroundColor: "#6E449CFF",
      overflow: "hidden",
      borderRadius: 7,
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    resultText: {
      alignSelf: "center",
      margin: 10,
      fontWeight: "bold",
      fontSize: 30,
      color: "#6E449CFF",
    },
  },
);
