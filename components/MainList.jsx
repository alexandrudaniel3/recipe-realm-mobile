import { View, Text, StyleSheet, Pressable, TextInput, Image, Keyboard } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CheckBox from "@react-native-community/checkbox";
import arrowDown from "../assets/arrow-down.png";
import arrowRight from "../assets/arrow-right.png";
import plusSign from "../assets/plus-icon.png";
import minusSign from "../assets/minus-icon.png";

const NewEntry = ({ addEntry }) => {
  const [newEntry, setNewEntry] = useState("");
  const handleSubmit = () => {
    addEntry(newEntry);
    setNewEntry("");
  }

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <TextInput style={{
        flex: 1,
        height: 50,
        margin: 12,
        borderWidth: 2,
        padding: 10,
        borderRadius: 15,
        borderColor: "#6E449CFF",
        color: "#6E449CFF",
      }}
                 keyboardType="default"
                 returnKeyType="done"
                 onSubmitEditing={handleSubmit}
                 value={newEntry}
                 onChangeText={(text) => setNewEntry(text)}
                 placeholder={'Enter item here...'}
                 placeholderTextColor={"#6E449CFF"}
      />
      <Pressable onPress={handleSubmit} style={{ width: 30, margin: 5 }}>
        <Image source={plusSign} style={{ width: "90%", height: undefined, aspectRatio: 1, tintColor: "#6E449CFF" }} />
      </Pressable>
    </View>
  );
};

export default function MainList() {
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("My List");
  const [visible, setVisible] = useState(true);
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
        <CheckBox value={entry.checked} style={{ margin: 5 }}
                  onValueChange={(newValue) => checkEntry(entry.id, newValue)}
                  tintColors={{ true: "#6e449c", false: "#6E449CFF" }}
        />
        <Text style={{ color: "#6E449CFF", margin: "auto", flex: 1 }}>{entry.text}</Text>
        <Pressable onPress={() => {
          removeEntry(entry.id);
        }} style={{ width: 30, margin: 5 }}>
          <Image source={minusSign}
                 style={{ width: "90%", height: undefined, aspectRatio: 1, tintColor: "#6E449CFF" }} />
        </Pressable>
      </View>
    );
  };

  const checkEntry = (id, newValue) => {
    const updatedList = [...list];
    const entryIndex = updatedList.findIndex((entry) => entry.id === id);
    updatedList[entryIndex].checked = newValue;
    setList(updatedList);
  };

  const addEntry = (title) => {

    if (title === "") {
      return;
    }

    const newID = (list.length === 0) ? 0 : list[list.length - 1].id + 1;
    const newEntry = {
      id: newID,
      checked: false,
      text: title,
    };
    setList((current) => [...current, newEntry]);
  };

  const removeEntry = (id) => {
    const entries = list.filter(entry => entry.id !== id);
    setList(entries);
  };


  const updateList = async () => {
    await AsyncStorage.setItem("list:My List", JSON.stringify(list));
  };

  const getListEntries = async () => {
    const entriesJSON = await AsyncStorage.getItem("list:My List");
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
          {visible ? <Image source={arrowDown}
                            style={{ width: "90%", height: undefined, aspectRatio: 1, tintColor: "#6E449CFF" }} /> :
            <Image source={arrowRight}
                   style={{ width: "90%", height: undefined, aspectRatio: 1, tintColor: "#6E449CFF" }} />}
        </Pressable>
        <Text style={styles.listTitle}>{title}</Text>
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
        <NewEntry addEntry={addEntry} />
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
    marginBottom: 10,
    color: "#6E449CFF",
  },
  visibleList: {},
  hiddenList: {
    display: "none",
  },
});
