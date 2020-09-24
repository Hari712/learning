import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Platform } from 'react-native';
import images from '../constants/images';
import { ColorConstant } from '../constants/ColorConstants'
import { FontSize } from './FontSize'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import BottomSheet from "react-native-raw-bottom-sheet";
import SlidingUpPanel from 'rn-sliding-up-panel';


const isAndroid = Platform.OS === 'android'

const Map = Platform.select({
	ios: () => require('react-native-maps'),
	android: () => require('@react-native-mapbox-gl/maps')
})();

const TrackingDetails = () => {

    //const refRBSheet = useRef();
    const _panel = useRef();
    
    React.useEffect(()=>{
        //refRBSheet.current.open()
       _panel.current.show()
    },[])

	function renderMapBox() {
		console.log("android")
		return (
			<View style={{ flex: 1 }}>
				<Map.default.MapView style={{ flex: 1 }}>
					<Map.default.UserLocation
						renderMode='normal'
						visible={true}
						showsUserHeadingIndicator={true}
					/>
				</Map.default.MapView>
			</View>
		)
	};

	function renderApppleMap() {
        console.log("apple")
        
		return (
            <View style={styles.container}>
                <View style={StyleSheet.absoluteFillObject}>
                    <Map.default style={StyleSheet.absoluteFillObject} showsUserLocation={true}>
                        {/* {<Map.Marker
                            coordinate={coordinate}
                            title={selectedRoute.shipmentName}
                        />} */}
                    </Map.default>
                    <View style={{ position: 'absolute', top: 100, left: 50 }} />
                </View>

                
            </View>
        )
	}

	return (
		<View style={styles.container}>
			{isAndroid ? renderMapBox() : renderApppleMap()}

            <SlidingUpPanel 
                ref={_panel}
                draggableRange={{top:hp(60),bottom:55}}
                height={hp(60)}
                //backdropOpacity={2}
                containerStyle={{backgroundColor:ColorConstant.WHITE,borderRadius:20,borderWidth:1}}
                >    

            {/* <BottomSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                minClosingHeight={20}
                height={hp(50)}
                keyboardAvoidingViewEnabled={true}        
                customStyles={{
                    wrapper: {
                        backgroundColor: "transparent",
                        // width:'98%',
                        // borderColor:'red',
                        // borderWidth:1,
                        // alignSelf:'center'
                
                    },                    
                    // draggableIcon: {
                    //     backgroundColor: ColorConstant.ORANGE
                    // }
                }}> */}

                <View style={{width:'100%',alignItems:'center',marginTop:hp(2)}}>
                    <Text>Tracking Details</Text>
                    <View style={{flexDirection:'row',marginHorizontal:hp(4),marginTop:hp(4) ,alignItems:'center',borderBottomColor:ColorConstant.GREY,borderBottomWidth:0.5}}>
                        <Text style={{flex:1,color:ColorConstant.GREY,fontSize:hp(1.5),fontWeight:'bold',marginBottom:hp(1)}}>Address</Text>
                        <Image style={{marginBottom:hp(1)}} source={images.dashBoard.pin}/>
                    </View> 
                    <View style={{width:'20%',alignSelf:'flex-start',marginHorizontal:hp(4),marginTop:hp(1)}}>
                        <Text style={{fontSize:hp(1)}}>900 Dufferian Street,Toronto MG L40 1V6 Canada</Text>
                    </View>
                    <View style={{flexDirection:'row',marginHorizontal:hp(4),marginTop:hp(4) ,alignItems:'center',borderBottomColor:ColorConstant.GREY,borderBottomWidth:0.5}}>
                        <Text style={{flex:1,color:ColorConstant.GREY,fontSize:hp(1.5),fontWeight:'bold',marginBottom:hp(1)}}>Date & Time</Text>
                        <Image style={{marginBottom:hp(1)}} source={images.dashBoard.calender}/>
                    </View> 
                    <View style={{alignSelf:'flex-start',marginHorizontal:hp(4),marginTop:hp(1),flexDirection:'row'}}>
                        <Text style={{fontSize:hp(1),flex:0.8}}>21/07/2020</Text>
                        <Text style={{fontSize:hp(1),flex:1}}>02:00:04</Text>
                    </View> 
                    <View style={{flexDirection:'row',marginHorizontal:hp(4),marginTop:hp(4) ,alignItems:'center',borderBottomColor:ColorConstant.GREY,borderBottomWidth:0.5}}>
                        <Text style={{flex:1,color:ColorConstant.GREY,fontSize:hp(1.5),fontWeight:'bold',marginBottom:hp(1)}}>Date & Time</Text>
                        <Image style={{marginBottom:hp(1)}} source={images.dashBoard.list}/>
                    </View> 
                    <View style={{alignSelf:'flex-start',marginHorizontal:hp(4),marginTop:hp(1),flexDirection:'row'}}>
                        <View style={{flex:1}}>
                            <Text style={{color:ColorConstant.GREY,fontSize:hp(1.2),marginBottom:hp(1)}}>Duration</Text>
                            <Text style={{color:ColorConstant.BLACK,fontSize:hp(1.2),marginBottom:hp(1)}}>12m 8s</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{color:ColorConstant.GREY,fontSize:hp(1.2),marginBottom:hp(1)}}>Distance</Text>
                            <Text style={{color:ColorConstant.BLACK,fontSize:hp(1.2),marginBottom:hp(1)}}>16.47mi</Text>
                        </View>
                        <View style={{flex:0.3}}>
                            <Text style={{color:ColorConstant.GREY,fontSize:hp(1.2),marginBottom:hp(1)}}>Speed</Text>
                            <Text style={{color:ColorConstant.BLACK,fontSize:hp(1.2),marginBottom:hp(1)}}>66mph</Text>
                        </View>    
                    </View>         
                </View>
                </SlidingUpPanel>
            {/* </BottomSheet> */}

			{/* <Mapbox.MapView
				styleURL={Mapbox.StyleURL.Street}
				zoomLevel={15}
				onTouchStart={() => { setIsLineClick(false) }}
				centerCoordinate={[11.256, 43.77]}
				style={styles.container}>
				
				{renderAnnotations()}

			</Mapbox.MapView> */}

		</View>
	);
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	subContainer: {
		position: 'absolute', flex: 1, right: 20, top: 20, width: hp(7.5)
	},
	bellIconStyle: {
		borderRadius: 13,
		height: hp(7.3),
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%', backgroundColor: ColorConstant.WHITE
	},
	lineIconStyle: {
		borderRadius: 13, height: hp(7.3), marginTop: hp(2), justifyContent: 'center', alignItems: 'center', width: '100%', backgroundColor: ColorConstant.WHITE
	},
	lineContainer: {
		backgroundColor: 'white',
		padding: 5,
		paddingVertical: hp(1.5),
		right: wp(18),
		borderRadius: 16,
		width: '300%',
		top: hp(9.5),
		justifyContent: 'space-between',
		position: 'absolute',
		shadowColor: ColorConstant.GREY,
		shadowOffset: { height: 0, width: 0 },
		shadowOpacity: 1,
		elevation: 10,
		shadowRadius: 3
	},
	textStyle: {
		margin: hp(0.5),
		color: ColorConstant.BLUE,
		textAlignVertical: 'center',
		paddingLeft: hp(0.5)
	},
	horizontalLine: {
		borderBottomWidth: 0.5, borderBottomColor: ColorConstant.GREY, margin: hp(0.7)
	},
	map: {
		height: 400,
		marginTop: 80
	},
	annotationContainer: {
		width: 30,
		height: 30,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white',
		borderRadius: 15
	},
	annotationFill: {
		width: 30,
		height: 30,
		borderRadius: 15,
		backgroundColor: 'blue',
		transform: [{ scale: 0.6 }]
	}
});

export default TrackingDetails;