import React, {useState} from 'react';
import {View, TextInput, Text} from 'react-native';

export default function SearchBar({onSearch}) {
  const [searchText, setSearchText] = useState('');
  const handleChange = text => {
    setSearchText(text);
    onSearch(text);
  };

  return (
    <View style={{marginTop: 10}}>
      <Text
        style={{
          marginBottom: 5,
          fontWeight: 'bold',
          fontSize: 16,
          color: '#333',
        }}>
        Search Tasks
      </Text>
      <TextInput
        placeholder="Search tasks..."
        value={searchText}
        onChangeText={handleChange}
        style={{
          width: 200,
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderRadius: 8,
          backgroundColor: '#eee',
        }}
      />
    </View>
  );
}
