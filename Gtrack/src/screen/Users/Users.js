import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, RefreshControl, FlatList, ScrollView, Text, ActivityIndicator, Dimensions } from 'react-native';
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { getLoginState, getSubuserState } from '../Selector'
import { useDispatch, useSelector } from 'react-redux';
import * as UsersActions from './Users.Action'
import AppManager from '../../constants/AppManager';
import { translate } from '../../../App';
import { SCREEN_CONSTANTS } from '../../constants/AppConstants';
import { UserAddIcon, FilterIcon, FilterIconClicked, NoRecordFoundImage } from '../../component/SvgComponent';
import UsersList from './UsersList';
import UsersFilterDialog from '../../component/UsersFilterDialog';
import isEmpty from 'lodash/isEmpty'
import { useIsFocused } from '@react-navigation/native';
import { uniqBy } from 'lodash';
import { SceneMap, TabView, TabBar, ScrollPager } from 'react-native-tab-view'
import TrackerUserList from './TrackerUserList';
import MobileUserList from './MobileUserList';
import { FontSize } from '../../component';
const IS_ANDROID = Platform.OS === 'android'

const Users = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (null)
    });
  }, [navigation]);

  const initialLayout = { width: Dimensions.get('window').width, height: Dimensions.get('window').height };

  const [index, setIndex] = useState(0);

  const [routes] = React.useState([
    { key: 'tracker', title: 'Tracker User' },
    { key: 'mobile', title: 'Mobile User' }
  ]);

  const renderScene = SceneMap({
    tracker: TrackerUserList,
    mobile: MobileUserList
  });

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <TabView
          //style={{marginTop:hp(5)}}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          lazy
          renderTabBar={props => {
            console.log('props--------', props, index)
            return (
              <TabBar
                {...props}
                indicatorStyle={{ backgroundColor: ColorConstant.ORANGE, height: hp(5) }}
                //labelStyle={{ color: ColorConstant.GREY, fontSize: hp(2.2), fontWeight: '600', textTransform: 'capitalize' }}
                style={{ backgroundColor: ColorConstant.WHITE, height: hp(5), justifyContent: 'center', }}
                renderLabel={({ route, focused, color }) => (
                  <Text style={{ color: focused ? ColorConstant.WHITE : ColorConstant.BLUE, fontSize: FontSize.FontSize.medium, fontWeight: '300', }}>
                    {translate(route.title)}
                  </Text>
                )}
              />)
          }}
          renderPager={
            IS_ANDROID ? undefined : (props) => <ScrollPager {...props} />
          }
          swipeEnabled={true}
          initialLayout={initialLayout} />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  searchContainer: {
    width: '90%',
    // alignItems:'center',
    alignSelf: 'center'
    //marginVertical:hp(0.1)
  },
  search: {
    paddingHorizontal: hp(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '68%',
    height: hp(6),
    borderRadius: 12,
    marginTop: hp(4),
    marginBottom: hp(2),
    elevation: 4,
    shadowColor: ColorConstant.GREY,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 3,
    shadowOpacity: 0.5,
    backgroundColor: ColorConstant.WHITE
  },
  addButton: {
    //paddingHorizontal:hp(2),
    //marginHorizontal:hp(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '14%',
    height: hp(6),
    borderRadius: 12,
    marginTop: hp(4),
    //marginBottom:hp(2),
    elevation: 4,
    shadowColor: ColorConstant.GREY,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 3,
    shadowOpacity: 0.5,
    backgroundColor: ColorConstant.WHITE

  },
  searchText: {
    //fontSize:FontSize.FontSize.small,
    flex: 0.9,
    fontSize: 14,
    color: ColorConstant.BLACK,
    fontFamily: 'Nunito-LightItalic',
  },
  searchSubContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  noRecords: {
    // marginVertical: hp(38),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noRecordsText: {
    fontFamily: "Nunito-Regular",
    fontSize: hp(2),
    color: ColorConstant.DARK_GREY,
    marginTop: hp(1),
  },
  activityIndicator: {
    color: "#000",
    marginTop: '2%'
  }
});


export default Users;