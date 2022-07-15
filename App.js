import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Fontisto } from "@expo/vector-icons";
import { theme } from "./colors";

const STORAGE_KEY = "@toDos";
const WORKING_STORAGE_KEY = "@working";
export default function App() {
  const [working, setWorking] = useState();
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});

  const toDo = () => {
    setWorking(false);
    saveWorking(false);
  };
  const work = () => {
    setWorking(true);
    saveWorking(true);
  };
  const onChangeText = (inputData) => setText(inputData);
  // todos save in local
  const saveToDos = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  };
  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    s !== null ? setToDos(J.parse(s)) : console.log("list is empty"); //dbug
  };
  useEffect(() => {
    loadToDos();
  }, []);
  // working save in local
  const saveWorking = async (working) => {
    await AsyncStorage.setItem(WORKING_STORAGE_KEY, String(working));
  };
  const loadWorking = async () => {
    const w = await AsyncStorage.getItem(WORKING_STORAGE_KEY);
    console.log(w);
    console.log(typeof w);
    const b = w === "true";
    console.log(b);
    b !== null ? setWorking(b) : setWorking(true); //dbug
  };
  useEffect(() => {
    loadWorking();
  }, []);
  // CRUD
  const addToDo = async () => {
    if (text == "") {
      return;
    } //텍스트박스가 비어있다면 아무것도 안함
    const newToDos = { ...toDos, [Date.now()]: { text, working } };
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };
  const deleteToDo = (key) => {
    Alert.alert("Delete To Do", "Are you sure?", [
      { text: "cancel" },
      {
        text: "OK",
        onPress: () => {
          const newToDos = { ...toDos };
          delete newToDos[key];
          setToDos(newToDos);
          saveToDos(newToDos);
        },
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{ ...styles.btnText, color: working ? "white" : theme.grey }}
          >
            WORK
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toDo}>
          <Text
            style={{
              ...styles.btnText,
              color: !working ? "white" : theme.grey,
            }}
          >
            TODO
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        onSubmitEditing={addToDo} //리턴시 addToDo함수 호출
        onChangeText={onChangeText}
        value={text}
        style={styles.input}
        placeholder={working ? "작업을 입력하세용" : "할일을 입력하세용"}
      ></TextInput>
      <ScrollView>
        {Object.keys(toDos).map((key) =>
          toDos[key].working === working ? (
            <View style={styles.toDo} key={key}>
              <Text style={styles.toDoText}>{toDos[key].text}</Text>
              <TouchableOpacity onPress={() => deleteToDo(key)}>
                <Fontisto
                  style={styles.trash}
                  name="trash"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          ) : null
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100,
  },
  btnText: {
    fontSize: 39,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "white",
    height: 60,
    fontSize: 18,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 10,
  },
  toDo: {
    marginTop: 10,
    backgroundColor: theme.todo,
    height: 60,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    borderRadius: 30,
    flexDirection: "row",
  },
  toDoText: {
    fontSize: 20,
    color: "white",
  },
  trash: { color: "white", opacity: 0.8 },
});
