import React, {Component} from 'react'
import { View, Image, StyleSheet, Text, ImageBackground, Dimensions, TouchableOpacity, TextInput} from 'react-native'
import images from '../../constants/images'
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from '../../component/FontSize'
import NavigationService from '../../navigation/NavigationService'
import { EditText } from '../../component'

export default class Dashboard extends React.Component {
  
    constructor(props) {
      super(props)
      this.state = {
      
      }
    }
  

    render() {
      return (
      
        <Text>Dashboard Screen</Text>
                 
    );
    }
  } 
    
  
  const styles = StyleSheet.create({
    
  });