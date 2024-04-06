import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  Image,
} from 'react-native';

export default function NewProject({onAdd, onCancel}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [backgroundImage, setBackgroundImage] = useState(null);

  const handleSave = () => {
    // Validation
    if (!title.trim() || !description.trim() || !dueDate.trim()) {
      // Show error modal or alert
      return;
    }

    onAdd({
      title,
      description,
      dueDate,
      backgroundImage,
    });

    // Reset fields after saving
    setTitle('');
    setDescription('');
    setDueDate('');
    setBackgroundImage(null);
  };

  const handleImageChange = event => {
    const uri = event.uri;
    setBackgroundImage(uri);
  };

  let addImage;
  return (
    <View style={{padding: 16}}>
      {/* Add any error modal or alert for invalid inputs here */}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}>
        <TouchableOpacity onPress={onCancel}>
          <Text style={{color: '#333', fontSize: 16}}>Cancel</Text>
        </TouchableOpacity>
        <Button title="Save" onPress={handleSave} />
      </View>

      <TextInput
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          padding: 8,
          marginBottom: 12,
        }}
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
      />
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          padding: 8,
          marginBottom: 12,
        }}
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        multiline
      />
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          padding: 8,
          marginBottom: 12,
        }}
        value={dueDate}
        onChangeText={setDueDate}
        placeholder="Due Date"
        keyboardType="numeric" // Assuming due date is in numeric format
      />

      {/* Image picker */}
      <TouchableOpacity onPress={() => console.log('Open image picker')}>
        <Image
          source={require('../assets/add-image.png')}
          style={{width: 32, height: 32, marginBottom: 12}}
        />
      </TouchableOpacity>

      {/* Display selected image */}
      {backgroundImage && (
        <Image
          source={{uri: backgroundImage}}
          style={{width: '100%', height: 200, marginBottom: 12}}
        />
      )}
    </View>
  );
}
