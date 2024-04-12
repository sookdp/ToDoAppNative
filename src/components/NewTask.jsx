import React, {useState} from 'react';
import {View, TextInput, Button, Image, TouchableOpacity} from 'react-native';
import EmojiPicker from 'rn-emoji-picker';

export default function NewTask({onAdd}) {
  const [inputStr, setInputStr] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const handleEmojiClick = () => {
    setShowPicker(!showPicker);
  };

  const handleChange = text => {
    setInputStr(text);
  };

  const handleClick = () => {
    onAdd(inputStr);
    setInputStr('');
  };

  const handleEmojiSelect = emoji => {
    setInputStr(prevInput => prevInput + emoji);
    setShowPicker(false);
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <TextInput
        style={{
          width: '60%',
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          padding: 8,
          marginBottom: 12,
        }}
        value={inputStr}
        onChangeText={handleChange}
        placeholder="Enter your task here"
      />
      <TouchableOpacity onPress={handleEmojiClick}>
        <Image
          source={require('../assets/smile.png')}
          style={{width: 40, height: 40, marginBottom: 12}}
        />
      </TouchableOpacity>
      <Button title="Add Task" onPress={handleClick} />
      {showPicker && (
        <View style={{position: 'absolute', bottom: 0}}>
          <EmojiPicker onEmojiSelected={handleEmojiSelect} />
        </View>
      )}
    </View>
  );
}
