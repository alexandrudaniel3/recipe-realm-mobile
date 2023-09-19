import { useEffect, useState } from "react";
import { units, ingredientsDensity } from "../utils/conversionData";
import { View, Text, TextInput, StyleSheet, Platform, Pressable } from "react-native";
import { convertData } from "../utils/conversionData";
import { Dropdown } from "react-native-element-dropdown";

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
  const [toUnit, setToUnit] = useState("m:kg");
  const [ingredientDensity, setIngredientDensity] = useState(1.00);
  const [value, setValue] = useState(0);
  const [result, setResult] = useState("");

  function handleSubmit() {
    if (value) {
      let test = convertData(fromUnit, toUnit, value, ingredientDensity);
      if (typeof test === "number") {
        test = +parseFloat(test.toFixed(3));
      }
      setResult(value + fromUnit.substring(2) + " = " + test + toUnit.substring(2));
    } else {
      setResult("");
    }
  }

  useEffect(() => {
    handleSubmit();
  }, [fromUnit, toUnit, value, ingredientDensity]);

  const DisplayIngredientPicker = () => {
    if ((fromUnit.includes("m:") && toUnit.includes("v:")) || (fromUnit.includes("v:") && toUnit.includes("m:"))) {
      return (
        <View>
          <Text style={styles.volumeWarning}>In order to convert mass to volume and vice versa, please select an
            ingredient:</Text>
          <Dropdown
            onChange={item => {
              setIngredientDensity(item.value);
            }}
            value={ingredientDensity}
            data={ingredientsDensity}
            labelField="label"
            valueField="value"
            style={styles.selector}
            selectedTextStyle={styles.selectorText}
            itemTextStyle={styles.selectorText}
            autoScroll={false}
          />
        </View>
      );
    } else {
      return;
    }

  };

  const FrequentButtons = () => {
    return (
      <View style={styles.frequentButtonsContainer}>
        <Pressable style={styles.frequentButton}
                   onPress={() => setValue(0.25)}>
          <Text style={styles.frequentButtonText}>1/4</Text>
        </Pressable>
        <Pressable style={styles.frequentButton}
                   onPress={() => setValue(0.33)}>
          <Text style={styles.frequentButtonText}>1/3</Text>
        </Pressable>
        <Pressable style={styles.frequentButton}
                   onPress={() => setValue(0.5)}>
          <Text style={styles.frequentButtonText}>1/2</Text>
        </Pressable>
        <Pressable style={styles.frequentButton}
                   onPress={() => setValue(0.66)}>
          <Text style={styles.frequentButtonText}>2/3</Text>
        </Pressable>
        <Pressable style={styles.frequentButton}
                   onPress={() => setValue(0.75)}>
          <Text style={styles.frequentButtonText}>3/4</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={{ marginHorizontal: 10 }}>
      <Text style={styles.fromTo}>From:</Text>
      <Dropdown
        onChange={item => setFromUnit(item.value)}
        value={fromUnit}
        data={units}
        labelField="label"
        valueField="value"
        style={styles.selector}
        selectedTextStyle={styles.selectorText}
        itemTextStyle={styles.selectorText}
        autoScroll={false}
      />
      <Text style={styles.fromTo}>To:</Text>
      <Dropdown
        onChange={item => setToUnit(item.value)}
        value={toUnit}
        data={units}
        labelField="label"
        valueField="value"
        style={styles.selector}
        selectedTextStyle={styles.selectorText}
        itemTextStyle={styles.selectorText}
        autoScroll={false}
      />
      <DisplayIngredientPicker />
      <ValueBox setValue={setValue} />
      <FrequentButtons />
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
      borderRadius: 10,
      borderWidth: 2,
      padding: 5,
      marginVertical: 5,
      width: "80%",
      alignSelf: "center",
      color: "#6E449CFF",
    },
    selectorText: {
      color: "#6E449CFF",
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
      textAlign: "center",
    },
    resultText: {
      alignSelf: "center",
      margin: 10,
      fontWeight: "bold",
      fontSize: 30,
      color: "#6E449CFF",
    },
    frequentButtonsContainer: {
      flexDirection: "row",
      alignSelf: "center"
    },
    frequentButton: {
      borderStyle: "solid",
      borderColor: "#6E449CFF",
      borderRadius: 10,
      borderWidth: 2,
      padding: 5,
      margin: 2
    },
    frequentButtonText: {
      fontWeight: "bold",
      color: "#6E449CFF",
    },
  },
);
