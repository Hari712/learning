import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet,Text, Image,TouchableOpacity, Dimensions, TimePickerAndroid, ScrollView, TextInput} from 'react-native';
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from '../../component/FontSize';
import { SceneMap, TabView, TabBar } from 'react-native-tab-view'
import TextField from '../../component/TextField';
import DropDown from '../../component/DropDown';
   

const CreateDeviceAsset = ({route, navigation}) => {

    const [group, setGroup]= useState(); 
    const [detailsToggle, setDetailsToggle] = useState(false);
    const [type, setType] = useState();
    const [device, setDevice] = useState();
   
    // const handleInput = text => {
    //     setGroup(text)
    //     console.log("Group Value:", group)
    //     return text
        
    // }  
    useEffect(()=>{
        group? null : setDetailsToggle(false)
    }, [group])
 
    const Group = () => (
        <View style={styles.container}>
            <View style={styles.scene} >
                <TextField valueSet={setGroup} label='Group Name*' defaultValue={group} />
            </View>

            {detailsToggle?
                <View style={{backgroundColor:ColorConstant.PINK,height:hp(25),width:'100%'}}>
                </View>
            :null}  

            <View style={[styles.scene]} >
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={{borderRadius:6,borderWidth:1,borderColor:ColorConstant.BLUE,backgroundColor:ColorConstant.WHITE,width:'42%',height:hp(6),justifyContent:'center'}}>
                        <Text style={{textAlign:'center',color:ColorConstant.BLUE}}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity disabled={!group} onPress={()=>{detailsToggle ? console.log("Saved") : setDetailsToggle(true) }} style={{borderRadius:6,backgroundColor:group?ColorConstant.BLUE:ColorConstant.GREY,width:'42%',height:hp(6),justifyContent:'center'}}>
                        <Text style={{textAlign:'center',color:ColorConstant.WHITE}}> {detailsToggle ? 'Save' : 'Next'} </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
       
    );
    
    const Asset = () => (
        <View style={styles.container}>
            <View style={styles.scene} >

                <TextField valueSet={setValue} defaultValue={value} label='Name*' /> 

                <DropDown label='Type' defaultValue={type} valueSet={setType} dataList={['Group 1','Group 2','Group 3']} outerStyle={{marginTop:hp(3)}} /> 

                <TextField valueSet={setValue} defaultValue={value} label='Description (Optional)'  multiline={true} outerStyle={{marginTop:hp(3)}} />

                <DropDown defaultValue={device} label='Select Device' valueSet={setDevice} dataList={['Group 1','Group 2','Group 3']} outerStyle={{marginTop:hp(3)}} />
                
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
        width:Dimensions.get('window').width,
        alignItems:'center'
    },
    scene: {
        //flex: 1,
        //alignContent:'center',
        width:'85%',
        marginHorizontal:hp(5),
        //marginVertical:hp(1),
        marginTop:hp(5)
      },	
      buttonContainer: {
        flexDirection:'row',
        justifyContent:'space-evenly',
        //width:'75%',
        //margin:hp(3),
        marginTop:hp(3),
        alignItems:'center'
    },
});

export default CreateDeviceAsset