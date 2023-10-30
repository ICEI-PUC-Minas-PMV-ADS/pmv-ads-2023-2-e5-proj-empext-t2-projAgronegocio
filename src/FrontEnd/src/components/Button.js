import react from 'react';
import {StyleSheet, View} from 'react-native';

const Container = ({children}) => {
  return <View style= {styles.button}>{children}</View>
};

const styles = StyleSheet.create({
   button:{
    flex:1,
    backgroundColor: '#FFF'
  },
});

export default Container;