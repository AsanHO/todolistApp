---
emoji: 📱
title: 리액트_네이티브#2
date: "2022-07-14"
author: AsanHo
tags:
categories: react
---

이번에는 투두리스트를 만들면서 이벤트, 데이터의 입출력, 로컬저장소에 대해 알아볼 것이다.
#1과 같이 앱을 구축한다.

## 버튼 이벤트

버튼에는 크게 3가지 컴포넌트(태그)를 가진다.  
**TouchableOpacity**  
태그가 터치되면 텍스트의 투명도가 바뀐다.
**TouchableHighlight**
태그가 터치되면 bg의 투명도가 바뀐다.  
**TouchableWithoutFeedback**  
태그가 터치되어도 아무일이일어나지 않는다.

## onPress

이 속성을 이용해 토글을 작성해본다.

```js
const [working, setWorking] = useState(true); //work이거나 아니거나
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
  keyboardType="decimal-pad" // 키보드 타입 변경
  style={styles.input}
  placeholder={working ? "작업을 입력하세용" : "할일을 입력하세용"}
></TextInput>
```

어떤 어플에서 휴대폰 번호를 입력하라고 하는데 번호키가 나오면 뭔가 시원한 기분이다. 이것들을 핸들링할수 있는 키보드 타입 속성을 이용하자.

이제 입력한것을 출력해보자

```js
const onChangeText = (e) => console.log(e);
<TextInput
  onChangeText={onChangeText}
  style={styles.input}
  placeholder={working ? "작업을 입력하세용" : "할일을 입력하세용"}
></TextInput>;
```

다음은 입력한것을 리턴하는 것을 감지해보자

```js
const [toDos, setToDos] = useState({});

const addToDo = () => {
  if (text == "") {
    return;
  } //텍스트박스가 비어있다면 아무것도 안함
  const newToDos = Object.assign({}, toDos, {
    [Date.now()]: { text, work: working },
  });
  setToDos(newToDos);
  console.log(toDos);
  setText("");
};

<TextInput
  onSubmitEditing={addToDo} //리턴시 addToDo함수 호출
  onChangeText={onChangeText}
  value={text}
  style={styles.input}
  placeholder={working ? "작업을 입력하세용" : "할일을 입력하세용"}
></TextInput>;
```

```js
const newToDos = Object.assign({}, toDos, {
  [Date.now()]: { text, work: working },
});
```

이부분을 잘보자. 업데이트와 삭제를 할것이기 떄문에 id가 필요하고 id는 시간으로 설정하고 object로 정의했다. 그런데 `Obeject.assign()`은 무엇일까?  
리액트js에서는 state를 직접수정하지 않고 setstate를 통해 수정한다. 때문에 toDos.push()이런식으로 추가할수 없다. 그래서 저 함수를 쓴다. 함수의 기능은 입력된 obj를 기존 obj와 추가한다.  
**하지만 es6를 쓴다면??**

```js
const newToDos = { ...toDos, [Date.now()]: { text, work: working } };
```

### work todo 분리

이제 work와 todo리스트들을 분리해서 토글값에 따라 스크롤뷰를 변경해줄 것이다.

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

생각보다 작성할 코드가 적은것을 볼 수 있다.

## [로컬 저장소](https://docs.expo.dev/versions/latest/sdk/async-storage/)

`% expo install @react-native-async-storage/async-storage`

```js
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@toDos";

const saveToDos = async (toSave) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
};
const loadToDos = async () => {
  const s = await AsyncStorage.getItem(STORAGE_KEY);
  s !== null ? setToDos(JSON.parse(s)) : console.log("local is empty"); //dbug s가 눌이아니면 함수호출고 아니면 리턴
};
useEffect(() => {
  loadToDos();
}, []);
const addToDo = async () => {
  if (text == "") {
    return;
  } //텍스트박스가 비어있다면 아무것도 안함
  const newToDos = { ...toDos, [Date.now()]: { text, working } };
  setToDos(newToDos);
  await saveToDos(newToDos);
  setText("");
};
```

이제 앱을 다시 시작해도 데이터가 그대로인것을 볼 수 있다.

## Delete

삭제구현을 통해 alert를 작성해본다.

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
