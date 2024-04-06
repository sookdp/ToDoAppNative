import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import Tasks from './Tasks.jsx';
import History from './History.jsx';

export default function SelectedProject({
  project,
  onDelete,
  onAddTask,
  onDeleteTask,
  onRestoreTask,
  tasks,
  backgroundImage,
  accomplishTasks,
  moveUp,
  moveDown,
}) {
  const formattedDate = new Date(project.dueDate).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{uri: backgroundImage}}
        style={styles.backgroundImage}>
        <View style={styles.overlay} />
        <View style={styles.header}>
          <Text style={styles.title}>{project.title}</Text>
          <Text style={styles.deleteButton} onPress={onDelete}>
            Delete
          </Text>
        </View>
        <Text style={styles.date}>{formattedDate}</Text>
        <Text style={styles.description}>{project.description}</Text>
      </ImageBackground>
      <Tasks
        onAdd={onAddTask}
        onDelete={onDeleteTask}
        tasks={tasks}
        moveUp={moveUp}
        moveDown={moveDown}
      />
      <History accomplishTasks={accomplishTasks} onRestore={onRestoreTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 8,
  },
  backgroundImage: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  deleteButton: {
    color: '#CCC',
  },
  date: {
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#CCC',
  },
  description: {
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#FFF',
    marginBottom: 8,
  },
});
