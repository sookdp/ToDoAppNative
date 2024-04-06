import React, {useState} from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import NewTask from './NewTask.jsx';
import SearchBar from './SearchBar.jsx';

export default function Tasks({tasks, onAdd, onDelete, moveUp, moveDown}) {
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  const handleSearch = searchText => {
    const filtered = tasks.filter(task =>
      task.text.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredTasks(filtered);
  };

  return (
    <View>
      <Text style={{fontSize: 24, fontWeight: 'bold', color: '#555'}}>
        Tasks
      </Text>
      <NewTask onAdd={onAdd} />
      <SearchBar onSearch={handleSearch} />
      {filteredTasks.length === 0 && (
        <Text style={{color: '#888', marginTop: 8}}>
          This task does not exist....
        </Text>
      )}
      {tasks.length === 0 && (
        <Text style={{color: '#888', marginTop: 8}}>
          This project does not have any task
        </Text>
      )}
      {tasks.length > 0 && (
        <FlatList
          data={filteredTasks}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 4,
              }}>
              <Image
                source={require('../assets/upArrow.png')}
                style={{width: 20, height: 20, marginRight: 4}}
              />
              <Image
                source={require('../assets/downArrow.png')}
                style={{width: 20, height: 20, marginRight: 4}}
              />
              <View style={{flex: 1}}>
                <Text>{item.text}</Text>
              </View>
              <Text
                onPress={() => onDelete(item.id)}
                style={{color: '#f00', marginRight: 8}}>
                Clear
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
