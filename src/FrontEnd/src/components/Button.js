import react from 'react';
import {StyleSheet, View} from 'react-native';

const Button = ({children}) => {
  return <View style= {styles.button}>{children}</View>
};

const styles = StyleSheet.create({
   button:{
    flex:1,
    backgroundColor: '#FFF'
  },
});

export default Button;