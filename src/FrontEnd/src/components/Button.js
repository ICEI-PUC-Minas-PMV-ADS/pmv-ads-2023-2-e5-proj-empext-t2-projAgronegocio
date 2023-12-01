import React from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';

const Button = ({children}) => {
  return <View style={styles.button}>{children}</View>;
};

Button.propTypes = {
  children: PropTypes.node,
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

export default Button;
