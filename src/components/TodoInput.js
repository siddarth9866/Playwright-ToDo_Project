import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react';

function TodoInput({ addTodo }) {
    const [text, setText] = useState(''); 

  const handleAddTodo = () => {
    if (text.trim()) {
      addTodo(text);
      setText('');
    }
    };
    

    return (
        <View style={styles.container}>
            <TextInput
                value={text}
                style={styles.Input}
                onChangeText={setText}
                placeholder='Add a new Todo'
            />
            <TouchableOpacity style={styles.addTodoButton} onPress={handleAddTodo}>
                <Text style={styles.addTodoButtonText}>Add</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    Input: {
        flex: 1,
        borderWidth: 2,
        borderColor: '#ccc',
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginRight: 10,
    },
    addTodoButton: {
        backgroundColor: '#007aff',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addTodoButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
  
});

export default TodoInput;