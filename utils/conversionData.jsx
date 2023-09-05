export const units = [
  { label: "Grams", value: "m:g" },
  { label: "Kilograms", value: "m:kg" },
  { label: "Ounces", value: "m:oz" },
  { label: "Pounds", value: "m:lb" },
  { label: "Milliliters", value: "v:ml" },
  { label: "Liters", value: "v:l" },
  { label: "Teaspoons", value: "v:tsp" },
  { label: "Tablespoons", value: "v:tbsp" },
  { label: "Cups", value: "v:cup" },
];

export const ingredientsDensity = [
  { label: "Water", value: 1.00 },
  { label: "All Purpose Flour", value: 0.529 },
  { label: "Baking Soda", value: 2.40 }, //
  { label: "Baking Powder", value: 0.9 }, //
  { label: "Granulated White Sugar", value: 0.8453506 },
  { label: "Brown Sugar", value: 0.93 },
  { label: "Powdered Sugar", value: 0.56 },
  { label: "Butter", value: 0.911 },
  { label: "Olive Oil", value: 0.918 },
  { label: "Sunflower Oil", value: 0.96 },
  { label: "Whole Milk", value: 1.03 },
  { label: "Heavy Cream", value: 0.994 },
  { label: "Sour Cream", value: 0.978 },
  { label: "Greek Yogurt", value: 1.03 }, //
  { label: "Plain Yogurt", value: 1.03 }, //
  { label: "Chocolate Chips", value: 0.85 },
  { label: "Cocoa Powder", value: 0.59 },
  { label: "Shredded Coconut", value: 0.35 },
  { label: "Peanut Butter", value: 0.92 }, //
  { label: "Salt (Table)", value: 1.38 },
  { label: "Rice", value: 0.72 }, //
];

export function convertData(fromUnit, toUnit, value, density) {

  if (fromUnit.includes("m:") && toUnit.includes("m:")) {
    switch (fromUnit) {
      case "m:g":
        switch (toUnit) {
          case "m:g":
            return value;
          case "m:kg":
            return value / 1000;
          case "m:oz":
            return value * 0.0352739615;
          case "m:lb":
            return value * 0.03527396195;
        }
        break;
      case "m:kg":
        switch (toUnit) {
          case "m:g":
            return value * 1000;
          case "m:kg":
            return value;
          case "m:oz":
            return value * 35.27396195;
          case "m:lb":
            return value * 2.20462262185;
        }
        break;
      case "m:oz":
        switch (toUnit) {
          case "m:g":
            return value * 28.34952;
          case "m:kg":
            return value * 0.02834952;
          case "m:oz":
            return value;
          case "m:lb":
            return value * 0.0625;
        }
        break;
      case "m:lb":
        switch (toUnit) {
          case "m:g":
            return value * 453.59237;
          case "m:kg":
            return value * 0.45359237;
          case "m:oz":
            return value * 16;
          case "m:lb":
            return value;
        }
        break;
    }
  } else if (fromUnit.includes("v:") && toUnit.includes("v:")) {
    switch (fromUnit) {
      case 'v:ml':
        switch (toUnit) {
          case 'v:ml' :
            return value;
          case 'v:l':
            return value / 1000;
          case 'v:tsp':
            return value * 0.2028841362;
          case 'v:tbsp':
            return value * 0.067628;
          case 'v:cup':
            return value * 0.004227;
        }
        break;
      case 'v:l':
        switch (toUnit) {
          case 'v:ml' :
            return value * 1000;
          case 'v:l':
            return value;
          case 'v:tsp':
            return value * 202.884136;
          case 'v:tbsp':
            return value * 67.628045;
          case 'v:cup':
            return value * 4.226753;
        }
        break;
      case 'v:tsp':
        switch (toUnit) {
          case 'v:ml' :
            return value * 4.928922;
          case 'v:l':
            return value * 0.004929;
          case 'v:tsp':
            return value;
          case 'v:tbsp':
            return value * 0.333333;
          case 'v:cup':
            return value * 0.020833;
        }
        break;
      case 'v:tbsp':
        switch (toUnit) {
          case 'v:ml' :
            return value * 14.786765;
          case 'v:l':
            return value * 0.014787;
          case 'v:tsp':
            return value * 3;
          case 'v:tbsp':
            return value;
          case 'v:cup':
            return value * 0.0625;
        }
        break;
      case 'v:cup':
        switch (toUnit) {
          case 'v:ml' :
            return value * 236.588236;
          case 'v:l':
            return value * 0.236588;
          case 'v:tsp':
            return value * 48;
          case 'v:tbsp':
            return value * 16;
          case 'v:cup':
            return value;
        }
        break;
    }
  } else {
    switch (fromUnit) {
      case 'm:g' :
        switch (toUnit) {
          case 'v:ml':
            return value / density;
          case 'v:l':
            return value / (1000 * density);
          case 'v:tsp' :
            return value / (4.928922 * density);
          case 'v:tbsp' :
            return value / (14.786765 * density);
          case 'v:cup' :
            return value / (236.588236 * density);
        }
        break;
      case 'm:kg' :
        switch (toUnit) {
          case 'v:ml':
            return value * (1000 / density);
          case 'v:l':
            return value / density;
          case 'v:tsp' :
            return value * (202.8841 * density);
          case 'v:tbsp' :
            return value / (67.628 * density);
          case 'v:cup' :
            return value / (4.2268 * density);
        }
        break;
      case 'm:oz' :
        switch (toUnit) {
          case 'v:ml':
            return value * (28.3495 / density);
          case 'v:l':
            return value / (35.274 * density);
          case 'v:tsp' :
            return (value * 5.7517) / density ;
          case 'v:tbsp' :
            return (value * 1.9172) / density;
          case 'v:cup' :
            return value / (8.3454 * density);
        }
        break;
      case 'm:lb' :
        switch (toUnit) {
          case 'v:ml':
            return value * (453.5924 / density);
          case 'v:l':
            return value / (2.2046 * density);
          case 'v:tsp' :
            return value * (92.0267 / density);
          case 'v:tbsp' :
            return value * (30.6756 / density);
          case 'v:cup' :
            return value * (1.9172 / density);
        }
        break;
      case 'v:ml':
        switch (toUnit) {
          case 'm:g':
            return value * density;
          case 'm:kg':
            return value * (density / 1000);
          case 'm:oz':
            return value * (density / 28.3495);
          case 'm:lb':
            return value * (density / 453.5924);
        }
        break;
      case 'v:l':
        switch (toUnit) {
          case 'm:g':
            return value * 1000 * density;
          case 'm:kg':
            return value * density;
          case 'm:oz':
            return value * 35.274 * density;
          case 'm:lb':
            return value * 2.2046 * density;
        }
        break;

      case 'v:tsp':
        switch (toUnit) {
          case 'm:g':
            return value * 4.9289 * density;
          case 'm:kg':
            return value * (density / 202.8841);
          case 'm:oz':
            return value * (density / 5.7517);
          case 'm:lb':
            return value * (density / 92.0267);
        }
        break;

      case 'v:tbsp':
        switch (toUnit) {
          case 'm:g':
            return value * 14.7868 * density;
          case 'm:kg':
            return value * (density / 67.628);
          case 'm:oz':
            return value * (density / 1.9172);
          case 'm:lb':
            return value * (density / 30.6756);
        }
        break;

      case 'v:cup':
        switch (toUnit) {
          case 'm:g':
            return value * 236.5882 * density;
          case 'm:kg':
            return value * (density / 4.2268);
          case 'm:oz':
            return value * 8.3454 * density;
          case 'm:lb':
            return value * (density / 1.9172);
        }
        break;

    }
  }
}
