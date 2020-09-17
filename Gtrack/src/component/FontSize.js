import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const FontSize = {
  extraSmall: hp(1),
  small: hp(1.6), //12
  medium: hp(2.0), //14
  regular: hp(2.5), //18
  large: hp(3.5),
  extraLarge: hp(5),
  tow: hp(2)
   // hp(1.4)=10  
  // hp(3)=21 
  // hp(2.8)=20 
  // hp(2.2)=16
}

export default {
  FontSize
}