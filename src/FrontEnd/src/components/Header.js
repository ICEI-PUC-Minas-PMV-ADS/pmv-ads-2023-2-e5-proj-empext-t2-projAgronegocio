import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

const Header = ({goBack}) => {
  const handleGoBack = () => {
    if (goBack) {
      goBack();
    }
  };

  return (
    <View style={styles.header}>
      <Image
        source={require('../assets/LogoAgroTradeMonitor4.jpg')}
        style={styles.image}
      />
      {goBack && (
        <TouchableOpacity style={styles.iconContainer} onPress={handleGoBack}>
          <Icon name="chevron-left" size={20} style={styles.icon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

Header.propTypes = {
  goBack: PropTypes.func,
};

const styles = StyleSheet.create({

  image: {
    width: 417,
    height: 109,
    alignSelf: 'center',
  },


  icon: {
    color: 'black',
    marginLeft: 40,


  },
});

export default Header;
