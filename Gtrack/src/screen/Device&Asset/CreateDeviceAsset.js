import React, { useState, useRef } from 'react';
import { View, StyleSheet,Text, Image,TouchableOpacity, Dimensions, TimePickerAndroid, ScrollView, TextInput} from 'react-native';
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from '../../component/FontSize';
import { SceneMap, TabView, TabBar } from 'react-native-tab-view'
import {
    
    FilledTextField,
    OutlinedTextField,
  } from '@ubaids/react-native-material-textfield'
import TextField from '../../component/TextField';
   

const CreateDeviceAsset = ({route, navigation}) => {

    const groupRef = useRef();
    const [group, setGroup]= useState();
 
    const Group = () => (
        <View style={styles.container}>
        <View style={styles.scene} >
            {/* <OutlinedTextField
                    label='Group Name*'
                    fontSize={FontSize.FontSize.small}
                    labelTextStyle={{ fontFamily: 'Montserrat-Regular' }}
                    labelFontSize={FontSize.FontSize.small}
                    contentInset={{ input: 10.45, label: 1.4 }}
                    formatText={handleInput}
                    value={value}
                    //renderRightAccessory={() => handleRightAccessory()}
                    //editable={false}
                    //inputContainerStyle={styles.inputContainer}
                    activeLineWidth={1}
                    //containerStyle={styles.inputButton}
                    //formatText={this.formatText}
                    //onSubmitEditing={this.onSubmit}
                    ref={groupRef}
                /> */}

                <TextField label='Group Name*' valueSet={setGroup.bind(this)} defaultvalue={group} />
                   
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={{borderRadius:6,borderWidth:1,borderColor:ColorConstant.BLUE,backgroundColor:ColorConstant.WHITE,width:'42%',height:hp(6),justifyContent:'center'}}>
                        <Text style={{textAlign:'center',color:ColorConstant.BLUE}}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity disabled={true} style={{borderRadius:6,backgroundColor:ColorConstant.BLUE,width:'42%',height:hp(6),justifyContent:'center'}}>
                        <Text style={{textAlign:'center',color:ColorConstant.WHITE}}>Next</Text>
                    </TouchableOpacity>
                </View>
           
        </View>
                <View style={{backgroundColor:ColorConstant.BLUE,height:hp(25),width:'100%',marginTop:hp(3)}}/>           
                
        </View>
       
    );
    
    const Asset = () => (
        <View style={styles.container}>
        <View style={styles.scene} >
           <OutlinedTextField
                    label='Name*'
                    tintColor={ColorConstant.GREY}
                    fontSize={FontSize.FontSize.small}
                    labelTextStyle={{ fontFamily: 'Montserrat-Regular' }}
                    labelFontSize={FontSize.FontSize.small}
                    contentInset={{ input: 10.45, label: 1.4 }}
                    formatText={handleInput}
                    //renderRightAccessory={() => handleRightAccessory()}
                    //editable={false}
                    //inputContainerStyle={styles.inputContainer}
                    activeLineWidth={1}
                    //containerStyle={styles.inputButton}
                    //formatText={this.formatText}
                    //onSubmitEditing={this.onSubmit}
                    //ref={this.fieldRef}
                />
                <View style={{marginTop:hp(2)}}>
                    <OutlinedTextField
                            label='Name*'
                            tintColor={ColorConstant.GREY}
                            fontSize={FontSize.FontSize.small}
                            labelTextStyle={{ fontFamily: 'Montserrat-Regular' }}
                            labelFontSize={FontSize.FontSize.small}
                            contentInset={{ input: 10.45, label: 1.4 }}
                            formatText={handleInput}
                            //renderRightAccessory={() => handleRightAccessory()}
                            //editable={false}
                            //inputContainerStyle={styles.inputContainer}
                            activeLineWidth={1}
                            //containerStyle={styles.inputButton}
                            //formatText={this.formatText}
                            //onSubmitEditing={this.onSubmit}
                            //ref={this.fieldRef}
                        /> 
                </View> 
                <View style={{height:hp(15),borderRadius:4,borderWidth:0.5,marginTop:hp(2),paddingLeft:hp(1)}}>
                    <TextInput style={{fontSize:FontSize.FontSize.small}} multiline={true} placeholder='Descrption'/>
                </View>  
                <View style={{marginTop:hp(3)}}>
                    <OutlinedTextField
                            label='Name*'
                            tintColor={ColorConstant.GREY}
                            fontSize={FontSize.FontSize.small}
                            labelTextStyle={{ fontFamily: 'Montserrat-Regular' }}
                            labelFontSize={FontSize.FontSize.small}
                            contentInset={{ input: 10.45, label: 1.4 }}
                            formatText={handleInput}
                            //renderRightAccessory={() => handleRightAccessory()}
                            //editable={false}
                            //inputContainerStyle={styles.inputContainer}
                            activeLineWidth={1}
                            //containerStyle={styles.inputButton}
                            //formatText={this.formatText}
                            //onSubmitEditing={this.onSubmit}
                            //ref={this.fieldRef}
                        /> 
                </View> 

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={{borderRadius:6,borderWidth:1,borderColor:ColorConstant.BLUE,backgroundColor:ColorConstant.WHITE,width:'42%',height:hp(6),justifyContent:'center'}}>
                        <Text style={{textAlign:'center',color:ColorConstant.BLUE}}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity  style={{borderRadius:6,backgroundColor:ColorConstant.BLUE,width:'42%',height:hp(6),justifyContent:'center'}}>
                        <Text style={{textAlign:'center',color:ColorConstant.WHITE}}>Save</Text>
                    </TouchableOpacity>
                </View>
                </View>
        </View>
       
    );
   
    const initialLayout = { width: Dimensions.get('window').width, height: Dimensions.get('window').height };
    
    const [index, setIndex] = useState(0);
    const [value,setValue]= useState()  

    const handleInput = text => {
        setValue(text)
        return text
        
    }  
    const [routes] = React.useState([
        { key: 'group', title: 'Group' },
        { key: 'asset', title: 'Asset' }
    ]);
    
    const renderScene = SceneMap({
        group: Group,
        asset: Asset
    });


    React.useLayoutEffect(() => {
    
        navigation.setOptions({
            headerTitle: () => (
                <Text style={{
                    color:ColorConstant.GREY,
                    fontSize: FontSize.FontSize.medium,
                    fontWeight: '500',
                    //letterSpacing: 0,
                    textAlign:'center' }}>
                    Device & Assest
                </Text>          
            ),
            headerLeft:() => (
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Image style={{marginLeft:hp(2)}} source={images.image.back}/>
                </TouchableOpacity>
            )
        });
      }, [navigation]);

return(
<View style={{flex:1}}>
    <TabView
        //style={{marginTop:hp(5)}}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={props => {
            console.log('props--------', props, index)
            return (
                <TabBar
                    {...props}
                    indicatorStyle={{ backgroundColor: ColorConstant.ORANGE, height: hp(7) }}
                    //labelStyle={{ color: ColorConstant.GREY, fontSize: hp(2.2), fontWeight: '600', textTransform: 'capitalize' }}
                    style={{ backgroundColor: ColorConstant.WHITE, height: hp(7), justifyContent: 'flex-end', }}
                    renderLabel={({ route, focused, color }) => (
                        <Text style={{ color: focused ? ColorConstant.WHITE : ColorConstant.BLUE, fontSize:FontSize.FontSize.medium, fontWeight: '900', }}>
                            {route.title}
                        </Text>
                    )}
                />)
        }}
        initialLayout={initialLayout} />
</View>
    )

}
const styles = StyleSheet.create({
    container:{
        width:Dimensions.get('window').width,alignItems:'center'
    },
    scene: {
        //flex: 1,
        //alignContent:'center',
        width:'85%',
        marginHorizontal:hp(3),
        marginVertical:hp(5),
      },	
      buttonContainer: {
        flexDirection:'row',
        justifyContent:'space-evenly',
        //width:'75%',
        //margin:hp(3),
        marginTop:hp(5),
        alignItems:'center'
    },
});

export default CreateDeviceAsset