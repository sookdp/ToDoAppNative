import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

export default function NoProjectSelected({onStartAddProject}) {
  return (
    <View style={{alignItems: 'center', marginTop: 100}}>
      <Image
        source={require('../assets/noProjects.png')}
        style={{width: 80, height: 80, marginBottom: 20}}
      />
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: '#333',
          marginBottom: 10,
        }}>
        No Project Selected
      </Text>
      <Text style={{fontSize: 16, color: '#666', marginBottom: 20}}>
        Select a project or get started with a new one
      </Text>
      <TouchableOpacity
        onPress={onStartAddProject}
        style={{backgroundColor: '#007AFF', padding: 10, borderRadius: 8}}>
        <Text style={{color: '#fff', fontSize: 16}}>Create new project</Text>
      </TouchableOpacity>
    </View>
  );
}
