import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet,Text, Image,TouchableOpacity, Dimensions, TimePickerAndroid, ScrollView, TextInput} from 'react-native';
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { FontSize, TextField,DropDown, MultiSelect } from '../../component';
import { SceneMap, TabView, TabBar } from 'react-native-tab-view'

const devicesList = [
    'TrackPort International', 
    'TrackPort International1', 
    'TrackPort International2', 
    'TrackPort International3', 
    'TrackPort International4'
 ]

const CreateDeviceAsset = ({route, navigation}) => {

    const [group, setGroup]= useState(); 
    const [detailsToggle, setDetailsToggle] = useState(false);
    const [type, setType] = useState();
    const [device, setDevice] = useState();
    const [description, setDescrption] = useState();
    const [selectedDevices, setSelectedDevices] = useState([]);
    
    useEffect(()=>{
        group? null : setDetailsToggle(false)
    }, [group])
 
    const Group = () => (
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
            <View style={styles.container}>

            <View style={styles.scene} >
                <TextField valueSet={setGroup} label='Group Name*' defaultValue={group} />
            </View>

            {detailsToggle?
                <View style={styles.detailsToggle}>
                    <MultiSelect 
                        label='Select Device' 
                        allText='Select All' 
                        dataList={devicesList} 
                        valueSet={setSelectedDevices} 
                        textStyle={{color:ColorConstant.BLUE,fontSize:12,paddingVertical:hp(1),fontFamily:'Nunito-Regular'}} 
                        selectedData={selectedDevices} 
                    />                   
                </View>
            :null}  

            <View style={styles.scene} >
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonStyle}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity disabled={!group} onPress={()=>{detailsToggle ? console.log("Saved") : setDetailsToggle(true) }} style={[styles.nextButton,{backgroundColor:group?ColorConstant.BLUE:ColorConstant.GREY,}]}>
                        <Text style={styles.saveText}> {detailsToggle ? 'Save' : 'Next'} </Text>
                    </TouchableOpacity>
                </View>
            </View>
    
            </View>
        </ScrollView>     
    );
    
    const Asset = () => (
        <View style={styles.container}>
            <View style={styles.scene} >

                <TextField valueSet={setValue} defaultValue={value} label='Name*' /> 

                <DropDown label='Type' defaultValue={type} valueSet={setType} dataList={['Group 1','Group 2','Group 3']} outerStyle={styles.outerStyle} /> 

                <TextField valueSet={setDescrption} defaultValue={description} label='Description (Optional)'  multiline={true} outerStyle={styles.outerStyle} />

                <DropDown defaultValue={device} label='Select Device' valueSet={setDevice} dataList={['Group 1','Group 2','Group 3']} outerStyle={styles.outerStyle} />
                
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonStyle}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity  style={[styles.buttonStyle,{backgroundColor:ColorConstant.BLUE}]}>
                        <Text style={styles.saveText}>Save</Text>
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
                    indicatorStyle={{ backgroundColor: ColorConstant.ORANGE, height: hp(5) }}
                    //labelStyle={{ color: ColorConstant.GREY, fontSize: hp(2.2), fontWeight: '600', textTransform: 'capitalize' }}
                    style={{ backgroundColor: ColorConstant.WHITE, height: hp(5), justifyContent: 'center', }}
                    renderLabel={({ route, focused, color }) => (
                        <Text style={{ color: focused ? ColorConstant.WHITE : ColorConstant.BLUE, fontSize:FontSize.FontSize.medium, fontWeight: '300', }}>
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
    contentContainerStyle: {
        height: Dimensions.get('window').height,
        backgroundColor:ColorConstant.WHITE 
    },    
    container:{
        height: Dimensions.get('window').height,
        alignItems:'center',
        backgroundColor:ColorConstant.WHITE
    },
    scene: {
        //flex: 1,
        //alignContent:'center',
        width:'85%',
        marginHorizontal:hp(5),
        //marginVertical:hp(1),
        marginTop:hp(5)
      },
        detailsToggle: {
            backgroundColor:ColorConstant.PINK,
            paddingVertical:10,
            width:'100%',
            paddingHorizontal:'7.5%'
        },	
      buttonContainer: {
        flexDirection:'row',
        justifyContent:'space-evenly',
        //width:'75%',
        //margin:hp(3),
        marginTop:hp(3),
        alignItems:'center'
    },
      buttonStyle: {
        borderRadius:6,
        borderWidth:1,
        borderColor:ColorConstant.BLUE,
        backgroundColor:ColorConstant.WHITE,
        width:'42%',
        height:hp(6),
        justifyContent:'center'
     },
    nextButton: {
        borderRadius:6,
        backgroundColor:ColorConstant.WHITE,
        width:'42%',
        height:hp(6),
        justifyContent:'center'
        },
     cancelText: {
        textAlign:'center',
        color:ColorConstant.BLUE
     },
     saveText: {
        textAlign:'center',
        color:ColorConstant.WHITE
     },
    
     
});

export default CreateDeviceAsset