import React, { useState ,Component, useRef} from 'react';
import { View, StyleSheet,Text, Image,TouchableOpacity, Dimensions, TimePickerAndroid, ScrollView} from 'react-native';
import images from '../../constants/images';
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from '../../component/FontSize';
import TextField from '../../component/TextField';
import DropDown from '../../component/DropDown';
import Dialog from '../../component/Dialog';

const EditDeviceAsset = ({route, navigation}) => {
    const {id,title} = route.params;
    const nameRef = useRef();

    const [value,setValue] = useState();
    const [type,setType] = useState();
    const [group,setGroup] = useState();
    const [dialogVisible,setDialogVisible] = useState(false)
    const groupArray = ['Group 1','Group 2','Group 3'] ;
    const typeArray = ['Car','Truck','Tempo'] ;

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text style={{
                    color:ColorConstant.GREY,
                    fontSize: FontSize.FontSize.medium,
                    fontWeight: '500',
                    //letterSpacing: 0,
                    textAlign:'center' }}>
                    Edit Device & Asset
                </Text>          
            ),
            headerLeft:() => (
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Image style={{marginLeft:hp(2)}} source={images.image.back}/>
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    const clear = () => {
        setValue()
        nameRef.current.clear();
        setType('')
        setGroup('')        
    }

return (
    <View style={styles.container}>
        <View style={styles.subContainer}>
            <View style={styles.device}>
                <Image  style={{resizeMode:'stretch'}} source={images.image.usb}/>
                <Text style={styles.textStyle}>Device</Text>
            </View>
            <View style={styles.id}>
                <Text style={styles.idTitle}>Id</Text>
                <Text style={styles.idText}>{id}</Text>
            </View>

            <View style={styles.textField}>
                <TextField valueSet={setValue} label='Name*' ref={nameRef} />
            </View>
            <View style={styles.horizontalLine}/>

            <View style={[styles.device,{marginTop:hp(2)}]}>
                <Image  style={{resizeMode:'stretch'}} source={images.image.pickupcar}/>
                <Text style={styles.textStyle}>Asset</Text>
            </View>
            <View style={{marginTop:hp(2)}}>
            <DropDown label='Type' defaultValue={type} valueSet={setType} dataList={typeArray} />
            </View>

                <View style={styles.nameDesc}>
                    <View style={styles.column} >
                        <Text style={styles.nameDescText}>Name</Text>
                        <Text style={styles.name}>xyz</Text>              
                    </View>
                    <View style={styles.column} >
                        <Text style={styles.nameDescText}>Description (Optional)</Text>
                        <Text style={styles.name}>xyz</Text>         
                    </View>
                </View>
                <View style={styles.horizontalLine} />

                <View style={[styles.device,{marginTop:hp(2)}]}>
                    <Image  style={{resizeMode:'stretch'}} source={images.image.list}/>
                    <Text style={styles.textStyle}>Select Group</Text>
                </View>

                <View style={{marginTop:hp(2)}}>
                <DropDown label='Select Group' defaultValue={group} valueSet={setGroup} dataList={groupArray} />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={()=> clear()} style={[styles.button,{backgroundColor:ColorConstant.WHITE,borderColor:ColorConstant.BLUE,borderWidth:1}]}>
                        <Text style={[styles.buttonText,{color:ColorConstant.BLUE}]}>Clear</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>setDialogVisible(!dialogVisible)} style={styles.button}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>

                <Dialog 
                    heading="Are you sure ?"
                    message={"Do you really want to attach asset ?" + "\n \n" + "It will get detach from the current device."}
                    visible={dialogVisible}
                    onTouchOutside={() => setDialogVisible(false)}
                    positiveButtonName={"Save"}
                    negativeHandle={() => setDialogVisible(false)}
                    positiveHandle={() => setDialogVisible(false)}
                />        
        </View>     

    </View>
    
    )}

const Data=[
    {
        name:'Tom Smith',
        role:'Owner'
    },
    {
    name:'David Smith',
    role:'Regular'
    }
]  

const styles = StyleSheet.create({
container: {
height:Dimensions.get('window').height,
backgroundColor:ColorConstant.WHITE,
alignItems:'center'
},
subContainer: {
marginHorizontal:hp(3),
marginVertical:hp(5),
width:Dimensions.get('window').width-40
},
device: {
    flexDirection:'row',
    alignItems:'center'
},
textStyle: {
marginLeft:hp(2),
color:ColorConstant.BLUE,
fontSize:FontSize.FontSize.small,
fontWeight:'600'
},
id: {
flexDirection:'row',
marginTop:hp(2)
},
idTitle: {
color:ColorConstant.BLUE,
fontSize:FontSize.FontSize.small,
fontWeight:'600',
flex:1
},
idText: {
marginLeft:hp(1.5),
color:ColorConstant.BLACK,
fontSize:FontSize.FontSize.small,
fontWeight:'600',
flex:20
},
textField: {
width:'100%',
alignSelf:'center',
margin:hp(3)
},
horizontalLine: {
borderBottomColor:ColorConstant.GREY,
borderBottomWidth:0.3,
marginHorizontal:hp(2),
width:wp(95),
alignSelf:'center'
},
nameDesc: {
flexDirection:'row',
marginTop:hp(2),
marginBottom:hp(3)
},
column: {
flexDirection:'column',
flex:1
},
nameDescText: {
color:ColorConstant.BLUE,
fontSize:FontSize.FontSize.small
},
name: {
color:ColorConstant.BLACK,
fontSize:FontSize.FontSize.small,
marginTop:hp(1)
},
button: {
borderRadius:6,
backgroundColor:ColorConstant.BLUE,
width:'42%',
height:hp(6),
justifyContent:'center'
},
buttonText: {
textAlign:'center',
color:ColorConstant.WHITE
},
messageStyle: {
color:ColorConstant.BLACK, 
textAlign:'center',
fontSize:FontSize.FontSize.small
},
dialogButton: {
alignItems:'center',
marginBottom:hp(3)
},
buttonContainer: {
    flexDirection:'row',
    justifyContent:'space-evenly',
    //width:'75%',
    //margin:hp(3),
    marginTop:hp(5),
    alignItems:'center'
}	
});

export default EditDeviceAsset;