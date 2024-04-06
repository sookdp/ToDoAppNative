import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

export default function MyButton({children, ...props}) {
  return (
    <TouchableOpacity
      style={{
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: '#2c3e50', // Couleur de fond du bouton
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10, // Marge supérieure du bouton
        ...props.style, // Permet de passer des styles supplémentaires depuis l'appelant
      }}
      {...props}>
      <Text style={{ color: '#ecf0f1', fontSize: 14 }}>{children}</Text>
    </TouchableOpacity>
  );
}
