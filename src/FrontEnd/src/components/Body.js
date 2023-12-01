import React from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';

const Body = ({children}) => {
  return <View style={styles.body}>{children}</View>;
};

Body.propTypes = {
  children: PropTypes.node,
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#FFF',
    margin: 8,
  },
});

export default Body;
