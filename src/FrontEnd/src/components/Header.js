import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = ({ goBack }) => {
  const handleGoBack = () => {
    if (goBack) {
      goBack();
    }
  };

  return (    
    <View style={styles.header} testID="header-component">
      <Image
        source={require('../assets/LogoAgroTradeMonitor4.jpg')}
        style={styles.image}
      />
      {goBack && (
        <TouchableOpacity style={styles.iconContainer} onPress={goBack}>
          <Icon name="chevron-left" size={20} style={styles.icon} />
        </TouchableOpacity>
      )}
    </View> 
  );
};

const styles = StyleSheet.create({

  image: { 
    width: 417,
    height: 109,
    alignSelf: 'center',
  },
         
  
  icon: {
    color: 'black',
   marginLeft:40,


   
  },
});

export default Header;
