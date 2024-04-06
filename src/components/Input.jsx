import {TextInput, View, Text} from 'react-native';
import {forwardRef} from 'react';

const Input = forwardRef(({multiline, label, ...props}, ref) => {
  return (
    <View style={{marginVertical: 8}}>
      <Text style={{fontSize: 14, fontWeight: 'bold', color: '#555'}}>
        {label}
      </Text>
      {multiline ? (
        <TextInput
          ref={ref}
          multiline={true}
          numberOfLines={4} // vous pouvez modifier le nombre de lignes selon vos besoins
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 4,
            padding: 8,
            marginTop: 4,
            backgroundColor: '#f0f0f0',
          }}
          {...props}
        />
      ) : (
        <TextInput
          ref={ref}
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 4,
            padding: 8,
            marginTop: 4,
            backgroundColor: '#f0f0f0',
          }}
          {...props}
        />
      )}
    </View>
  );
});

export default Input;
