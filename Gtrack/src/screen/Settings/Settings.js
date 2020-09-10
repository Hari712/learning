import React from 'react'
import { View, Image, StyleSheet, Text, ImageBackground, Dimensions, TouchableOpacity, TextInput} from 'react-native'
import images from '../../constants/images'
import { ColorConstant } from '../../constants/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSize from '../../component/FontSize'
import NavigationService from '../../navigation/NavigationService'
import { EditText } from '../../component'

const Settings = ({navigation}) => {

  const [listData, setListData] = useState(SETTINGS_MENU)

  React.useLayoutEffect(() => {

    navigation.setOptions({
      headerLeft:()=>(null),
    });
  });

  return(
    <View>
      {listData.map((item, index) =>
        <View>

        </View>
      )
      }
    </View>
  )
}

export default Settings; 
  
const styles = StyleSheet.create({
    
});

const SETTINGS_MENU = [
  {
    title: 'Profile',
    icon: images.image.settings.profile
  },
  {
    title: 'Subscription',
    icon: images.image.settings.subscription
  },
  {
    title: 'Payment Settings',
    icon: images.image.settings.paymentSettings
  },
  {
    title: 'Permission',
    icon: images.image.settings.permission
  },
  {
    title: 'About',
    icon: images.image.settings.about
  },
  {
    title: 'Rate Us',
    icon: images.image.settings.rateUs
  },
  {
    title: 'Feedback',
    icon: images.image.settings.feedback
  },
  {
    title: 'Logout',
    icon: images.image.settings.logout
  }
]