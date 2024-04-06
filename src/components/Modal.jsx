import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Modal, View, Button} from 'react-native';

const MyModal = forwardRef(({children, buttonCaption}, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    open() {
      setIsVisible(true);
    },
    close() {
      setIsVisible(false);
    },
  }));

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            padding: 20,
            borderRadius: 8,
            width: '80%',
          }}>
          {children}
          <Button title={buttonCaption} onPress={() => setIsVisible(false)} />
        </View>
      </View>
    </Modal>
  );
});

export default MyModal;
