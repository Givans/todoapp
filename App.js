import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import Appbar from './components/Appbar';
import Task from './components/Task';

export default function App() {

  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  
  const handleAddTask = () =>{
    Keyboard.dismiss();
    if (task == null) {
      Alert.alert('Empty task');
    } else {
      setTaskItems([...taskItems, task]);
      setTask(null);
    }
  }

  const completeTast = (index) =>{
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy)
  }

  return (
    <>
    <View style={styles.container}>
    {/* <Appbar /> */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>

        {/* tasks */}
        <ScrollView style={styles.items}>
          {/* displaying the tasks */}
          {taskItems.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => completeTast(index)}>
                <Task text={item} />
              </TouchableOpacity>
            );
          })}

        </ScrollView>
      </View>

      {/* write a task */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskrapper}
      >
        <TextInput style={styles.input} placeholder="write a task" value={task} onChangeText={text => setTask(text)} />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View></>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    flex: 1,
    marginTop: 30,
  },
  writeTaskrapper: {
    position: 'absolute',
    bottom: 0,
    padding: 10,
    borderRadius: 5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'darkblue',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    Width: 250,
    backgroundColor: '#fff',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {
    color: 'blue',
    fontSize: 45,
  },
});
