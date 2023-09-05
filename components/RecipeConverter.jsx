import { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { units, ingredientsDensity } from "../utils/conversionData";
import { View, Text, TextInput, Pressable, Image } from "react-native";
import convertIcon from "../assets/convert-icon.png";
import { convertData } from "../utils/conversionData";

function ValueBox({value, setValue}) {

  const handleChange = (value) => {
    setValue(value);
  }

  return (
    <View>
      <TextInput
        onChangeText={handleChange}
        value={value}
        placeholder="Insert value here..."
        keyboardType="numeric"
      />
    </View>
  )
}

export default function RecipeConverter() {
  const [fromUnit, setFromUnit] = useState("m:g");
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);
  const [toUnit, setToUnit] = useState("m:kg");
  const [ingredientDensity, setIngredientDensity] = useState(1.00);
  const [ingredientOpen, setIngredientOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [result, setResult] = useState('');

  const closeOtherPickers = (currentPicker) => {
    if (currentPicker !== "from") setFromOpen(false);
    if (currentPicker !== "to") setToOpen(false);
    if (currentPicker !== "ingredient") setIngredientOpen(false);
  };

  function handleSubmit() {
    if (value) {
      const test = convertData(fromUnit, toUnit, value, ingredientDensity);
      setResult(value + fromUnit.substring(2) + ' = ' + test + toUnit.substring(2));
    }
  }

  const DisplayIngredientPicker = () => {
    if ((fromUnit.includes("m:") && toUnit.includes("v:")) || (fromUnit.includes("v:") && toUnit.includes("m:"))) {
      return (
        <View style={{zIndex: 1000}}>
          <Text>In order to convert mass to volume and vice versa, please select an ingredient.</Text>
          <DropDownPicker setValue={setIngredientDensity} value={ingredientDensity} items={ingredientsDensity} open={ingredientOpen}
                          setOpen={(open) => {
                            setIngredientOpen(open);
                            if (open) {
                              closeOtherPickers("ingredient");
                            }
                          }}
                          zIndex={1000} zIndexInverse={2000} itemKey="label"
                          showTickIcon={false} />
        </View>
      );
    } else {
      return;
    }

  };

  return (
    <View>
      <DropDownPicker setValue={setFromUnit} value={fromUnit} items={units} open={fromOpen} setOpen={(open) => {
        setFromOpen(open);
        if (open) {
          closeOtherPickers("from");
        }
      }}
                      zIndex={3000} zIndexInverse={1000} showTickIcon={false} />
      <DropDownPicker setValue={setToUnit} value={toUnit} items={units} open={toOpen} setOpen={(open) => {
        setToOpen(open);
        if (open) {
          closeOtherPickers("to");
        }
      }}
                      zIndex={2000} zIndexInverse={2000} showTickIcon={false} />
      <DisplayIngredientPicker />
      <ValueBox setValue={setValue}/>
      <View style={{zIndex: 100}}>
        <Pressable onPress={handleSubmit} style={{ width: 30, margin: 5 }}>
          <Image source={convertIcon} style={{ width: "90%", height: undefined, aspectRatio: 1, tintColor: "#6E449CFF" }} />
        </Pressable>
      </View>
      {result ?
        <Text>{result}</Text> :
        null}
    </View>
  );
}
