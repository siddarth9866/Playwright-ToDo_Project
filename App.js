import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import TodoInput from './src/components/TodoInput';

function App() {
   
  const [todos, setTodos] = useState([]);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingText, setEditingText] = useState('');

  const addTodo = (text) => {
    console.log(text);
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Date.now().toString(), text },
    ]);
  };

  console.log(todos);

  const removeTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const startEditing = (id, text) => {
    setEditingTodoId(id);
    setEditingText(text);
  };

  const saveTodo = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === editingTodoId ? { ...todo, text: editingText } : todo
      )
    );
    setEditingTodoId(null);
    setEditingText('');
  };

  const cancelEditing = () => {
    setEditingTodoId(null);
    setEditingText('');
  };
  const renderTodo = ({ item }) => (
    <View style={styles.todoItem}>
      {editingTodoId === item.id ? (
        <>
          <TextInput
            value={editingText}
            onChangeText={setEditingText}
            style={styles.editInput}
          />
          <TouchableOpacity style={styles.saveButton} onPress={saveTodo}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={cancelEditing}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.todoText}>{item.text}</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => startEditing(item.id, item.text)}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => removeTodo(item.id)}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Todo App</Text>
      <TodoInput addTodo={addTodo} />
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={renderTodo}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No Todos. Add a new one!</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
  },
  todoText: {
    fontSize: 16,
    flex: 1,
  },
  emptyText: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 20,
  },
  editButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  deleteButton: {
    backgroundColor: "red",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    color: '#ff3b30',
    marginLeft: 10,
  },
  saveButton: {
    backgroundColor: 'green',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: 'orange',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  editInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
});

export default App;