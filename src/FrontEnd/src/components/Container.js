import React from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';

const Container = ({children}) => {
  return <View style={styles.container}>{children}</View>;
};

Container.propTypes = {
  children: PropTypes.node,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

export default Container;
