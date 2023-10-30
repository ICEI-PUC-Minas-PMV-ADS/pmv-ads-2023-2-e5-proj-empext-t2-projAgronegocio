import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = ({ goBack }) => {
  const handleGoBack = () => {
    if (goBack) {
      // Faça alguma ação quando o ícone for pressionado
      goBack();
    }
  };

  return (
    <View style={styles.header}>
      <Image
        source={require('../assets/LogoAgroTradeMonitor2.jpg')}
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
  header: {
    width: '100%', 
    height: 111, 
    backgroundColor: 'rgba(57, 191, 129, 0.74)',
    zIndex: 1,
  },
  image: { 
    width: 147,
    height: 101,
    alignSelf: 'center',
    marginTop: 11,
  },
  iconContainer: {
    position: 'absolute',
    top: 70, // Ajuste este valor para posicionar o ícone mais abaixo
    left: 20,
  },
  icon: {
    color: 'black',
  },
});

export default Header;
