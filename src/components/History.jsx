import {Button, FlatList, Text, View} from 'react-native';
import React from 'react';

export default function History({accomplishTasks, onRestore}) {
  return (
    <View>
      <View>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#555'}}>
          Accomplished tasks
        </Text>
      </View>
      <View>
        {accomplishTasks.length === 0 ? (
          <Text style={{fontSize: 16, color: '#888', marginTop: 10}}>
            This project does not have any accomplished task
          </Text>
        ) : (
          <FlatList
            style={{padding: 16, marginTop: 8, backgroundColor: '#f0f0f0'}}
            data={accomplishTasks}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}>
                <Text
                  style={{
                    textDecorationLine: 'line-through',
                    fontSize: 16,
                    color: '#333',
                  }}>
                  {item.text}
                </Text>
                <Button
                  title="Restore"
                  onPress={() => onRestore(item.id)}
                  color="#007bff"
                />
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}
