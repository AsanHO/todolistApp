---
emoji: π±
title: λ¦¬μ‘νΈ_λ€μ΄ν°λΈ#2
date: "2022-07-14"
author: AsanHo
tags:
categories: react
---

μ΄λ²μλ ν¬λλ¦¬μ€νΈλ₯Ό λ§λ€λ©΄μ μ΄λ²€νΈ, λ°μ΄ν°μ μμΆλ ₯, λ‘μ»¬μ μ₯μμ λν΄ μμλ³Ό κ²μ΄λ€.
#1κ³Ό κ°μ΄ μ±μ κ΅¬μΆνλ€.

## λ²νΌ μ΄λ²€νΈ

λ²νΌμλ ν¬κ² 3κ°μ§ μ»΄ν¬λνΈ(νκ·Έ)λ₯Ό κ°μ§λ€.  
**TouchableOpacity**  
νκ·Έκ° ν°μΉλλ©΄ νμ€νΈμ ν¬λͺλκ° λ°λλ€.
**TouchableHighlight**
νκ·Έκ° ν°μΉλλ©΄ bgμ ν¬λͺλκ° λ°λλ€.  
**TouchableWithoutFeedback**  
νκ·Έκ° ν°μΉλμ΄λ μλ¬΄μΌμ΄μΌμ΄λμ§ μλλ€.

## onPress

μ΄ μμ±μ μ΄μ©ν΄ ν κΈμ μμ±ν΄λ³Έλ€.

```js
const [working, setWorking] = useState(true); //workμ΄κ±°λ μλκ±°λ
const toDo = () => setWorking(false);
const work = () => setWorking(true);

<TouchableOpacity onPress={work}>
  <Text
    style={{ ...styles.btnText, color: working ? "white" : theme.grey }}
  >
    WORK
  </Text>
</TouchableOpacity>
<TouchableOpacity onPress={toDo}>
  <Text
    style={{ ...styles.btnText, color: !working ? "white" : theme.grey,
    }}
  >
    TODO
  </Text>
</TouchableOpacity>
```

## textinput

```js
<TextInput
  keyboardType="decimal-pad" // ν€λ³΄λ νμ λ³κ²½
  style={styles.input}
  placeholder={working ? "μμμ μλ ₯νμΈμ©" : "ν μΌμ μλ ₯νμΈμ©"}
></TextInput>
```

μ΄λ€ μ΄νμμ ν΄λν° λ²νΈλ₯Ό μλ ₯νλΌκ³  νλλ° λ²νΈν€κ° λμ€λ©΄ λ­κ° μμν κΈ°λΆμ΄λ€. μ΄κ²λ€μ νΈλ€λ§ν μ μλ ν€λ³΄λ νμ μμ±μ μ΄μ©νμ.

μ΄μ  μλ ₯νκ²μ μΆλ ₯ν΄λ³΄μ

```js
const onChangeText = (e) => console.log(e);
<TextInput
  onChangeText={onChangeText}
  style={styles.input}
  placeholder={working ? "μμμ μλ ₯νμΈμ©" : "ν μΌμ μλ ₯νμΈμ©"}
></TextInput>;
```

λ€μμ μλ ₯νκ²μ λ¦¬ν΄νλ κ²μ κ°μ§ν΄λ³΄μ

```js
const [toDos, setToDos] = useState({});

const addToDo = () => {
  if (text == "") {
    return;
  } //νμ€νΈλ°μ€κ° λΉμ΄μλ€λ©΄ μλ¬΄κ²λ μν¨
  const newToDos = Object.assign({}, toDos, {
    [Date.now()]: { text, work: working },
  });
  setToDos(newToDos);
  console.log(toDos);
  setText("");
};

<TextInput
  onSubmitEditing={addToDo} //λ¦¬ν΄μ addToDoν¨μ νΈμΆ
  onChangeText={onChangeText}
  value={text}
  style={styles.input}
  placeholder={working ? "μμμ μλ ₯νμΈμ©" : "ν μΌμ μλ ₯νμΈμ©"}
></TextInput>;
```

```js
const newToDos = Object.assign({}, toDos, {
  [Date.now()]: { text, work: working },
});
```

μ΄λΆλΆμ μλ³΄μ. μλ°μ΄νΈμ μ­μ λ₯Ό ν κ²μ΄κΈ° λλ¬Έμ idκ° νμνκ³  idλ μκ°μΌλ‘ μ€μ νκ³  objectλ‘ μ μνλ€. κ·Έλ°λ° `Obeject.assign()`μ λ¬΄μμΌκΉ?  
λ¦¬μ‘νΈjsμμλ stateλ₯Ό μ§μ μμ νμ§ μκ³  setstateλ₯Ό ν΅ν΄ μμ νλ€. λλ¬Έμ toDos.push()μ΄λ°μμΌλ‘ μΆκ°ν μ μλ€. κ·Έλμ μ  ν¨μλ₯Ό μ΄λ€. ν¨μμ κΈ°λ₯μ μλ ₯λ objλ₯Ό κΈ°μ‘΄ objμ μΆκ°νλ€.  
**νμ§λ§ es6λ₯Ό μ΄λ€λ©΄??**

```js
const newToDos = { ...toDos, [Date.now()]: { text, work: working } };
```

### work todo λΆλ¦¬

μ΄μ  workμ todoλ¦¬μ€νΈλ€μ λΆλ¦¬ν΄μ ν κΈκ°μ λ°λΌ μ€ν¬λ‘€λ·°λ₯Ό λ³κ²½ν΄μ€ κ²μ΄λ€.

```js
const newToDos = { ...toDos, [Date.now()]: { text, working } };

<ScrollView>
  {Object.keys(toDos).map((key) =>
    toDos[key].working === working ? (
      <View style={styles.toDo} key={key}>
        <Text style={styles.toDoText}>{toDos[key].text}</Text>
      </View>
    ) : null
  )}
</ScrollView>;
```

μκ°λ³΄λ€ μμ±ν  μ½λκ° μ μκ²μ λ³Ό μ μλ€.

## [λ‘μ»¬ μ μ₯μ](https://docs.expo.dev/versions/latest/sdk/async-storage/)

`% expo install @react-native-async-storage/async-storage`

```js
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@toDos";

const saveToDos = async (toSave) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
};
const loadToDos = async () => {
  const s = await AsyncStorage.getItem(STORAGE_KEY);
  s !== null ? setToDos(JSON.parse(s)) : console.log("local is empty"); //dbug sκ° λμ΄μλλ©΄ ν¨μνΈμΆκ³  μλλ©΄ λ¦¬ν΄
};
useEffect(() => {
  loadToDos();
}, []);
const addToDo = async () => {
  if (text == "") {
    return;
  } //νμ€νΈλ°μ€κ° λΉμ΄μλ€λ©΄ μλ¬΄κ²λ μν¨
  const newToDos = { ...toDos, [Date.now()]: { text, working } };
  setToDos(newToDos);
  await saveToDos(newToDos);
  setText("");
};
```

μ΄μ  μ±μ λ€μ μμν΄λ λ°μ΄ν°κ° κ·Έλλ‘μΈκ²μ λ³Ό μ μλ€.

## Delete

μ­μ κ΅¬νμ ν΅ν΄ alertλ₯Ό μμ±ν΄λ³Έλ€.

```js
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

<TouchableOpacity onPress={() => deleteToDo(key)}>
  <Fontisto style={styles.trash} name="trash" size={24} color="black" />
</TouchableOpacity>;
```
