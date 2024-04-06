import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import MyButton from './MyButton.jsx';

export default function ProjectsSideBar({
  onStartAddProject,
  projects,
  onSelectProject,
  selectedProjectId,
}) {
  return (
    <View
      style={{
        width: '30%',
        paddingHorizontal: 16,
        paddingVertical: 32,
        backgroundColor: '#333',
        borderRadius: 16,
      }}>
      <Text
        style={{
          marginBottom: 16,
          fontWeight: 'bold',
          fontSize: 18,
          color: '#eee',
        }}>
        Your Projects
      </Text>
      <MyButton onPress={onStartAddProject}>+ Add Project</MyButton>
      <ScrollView style={{marginTop: 16}}>
        {projects.map(project => (
          <TouchableOpacity
            key={project.id}
            onPress={() => onSelectProject(project.id)}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 8,
              marginVertical: 4,
              backgroundColor:
                project.id === selectedProjectId ? '#444' : '#222',
            }}>
            <Text
              style={{
                color: project.id === selectedProjectId ? '#eee' : '#999',
              }}>
              {project.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
