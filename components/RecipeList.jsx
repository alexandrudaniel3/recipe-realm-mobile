import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CheckBox from "@react-native-community/checkbox";
import arrowDown from "../assets/arrow-down.png";
import arrowRight from "../assets/arrow-right.png";
import trashCan from "../assets/trash-can.png";


export default function RecipeList({ listID, deleteList }) {
  const [list, setList] = useState([]);
  const [title, setTitle] = useState(listID.substring(5));
  const [visible, setVisible] = useState(false);
  const [initialized, setInitialized] = useState(false);


  useEffect(() => {
    const initializeList = async () => {
      await getListEntries();
      setInitialized(true);
    };

    initializeList();
  }, []);

  useEffect(() => {
    if (initialized) {
      updateList();
    }
  }, [list]);

  const Entry = ({ entry }) => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <CheckBox value={entry.checked} style={{ margin: 5 }} onValueChange={(newValue) => checkEntry(entry.id, newValue)}
                  tintColors={{ true: "#6e449c", false: "#6E449CFF" }}
        />
        <Text style={{ color: "#6E449CFF", margin: "auto" }}>{entry.text}</Text>
      </View>
    );
  };

  const checkEntry = (id, newValue) => {
    const updatedList = [...list];
    const entryIndex = updatedList.findIndex((entry) => entry.id === id);
    updatedList[entryIndex].checked = newValue;
    setList(updatedList);
  }

  const updateList = async () => {
    await AsyncStorage.setItem(listID, JSON.stringify(list));
  };

  const getListEntries = async () => {
    const entriesJSON = await AsyncStorage.getItem(listID);
    const entries = JSON.parse(entriesJSON);
    if (entries !== null) {
      setList(entries);
    } else {
      setList([]);
    }
  };

  const ListHeader = () => {
    return (
      <View style={styles.listHeader}>
        <Pressable onPress={() => setVisible(!visible)} style={{ width: 30, margin: 5 }}>
          {visible ? <Image source={arrowDown} style={{ width: "90%", height: undefined, aspectRatio: 1, tintColor: "#6E449CFF"}} /> :
            <Image source={arrowRight} style={{ width: "90%", height: undefined, aspectRatio: 1, tintColor: "#6E449CFF"}} />}
        </Pressable>
        <Text style={styles.listTitle}>{title}</Text>
        <Pressable onPress={() => deleteList(listID)} style={{ width: 30, margin: 5 }}>
          <Image source={trashCan} style={{ width: "90%", height: undefined, aspectRatio: 1, tintColor: "#6E449CFF"}} />
        </Pressable>
      </View>
    );
  };

  const ListEntries = () => {
    if (visible === false || list.length === 0) {
      return;
    }

    return (
      <View>
        {list.map((entry, index) => (
          <Entry entry={entry} key={index} />
        ))}
      </View>
    );
  };

  const ListBody = () => {
    return (
      <View
        style={visible ? styles.visibleList : styles.hiddenList}>
        <ListEntries />
      </View>
    );
  };

  return (
    <View>
      <ListHeader />
      <ListBody />
    </View>
  );
}

const styles = StyleSheet.create({
  listHeader: {
    flexDirection: "row",
  },
  listTitle: {
    fontSize: 30,
    fontWeight: "bold",
    flex: 1,
    flexWrap: "wrap",
    marginBottom: 10,
    color: "#6E449CFF",
  },
  visibleList: {},
  hiddenList: {
    display: "none",
  },
});
