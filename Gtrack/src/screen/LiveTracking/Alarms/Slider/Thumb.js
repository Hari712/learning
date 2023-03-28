import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';
import { ColorConstant } from '../../../../constants/ColorConstants';

const THUMB_RADIUS_LOW = 8;
const THUMB_RADIUS_HIGH = 12;

const Thumb = ({name}) => {
  return <View style={name === 'high' ? styles.rootHigh : styles.rootLow} />;
};

const styles = StyleSheet.create({
  rootLow: {
    width: THUMB_RADIUS_LOW * 2,
    height: THUMB_RADIUS_LOW * 2,
    borderRadius: THUMB_RADIUS_LOW,
    backgroundColor: ColorConstant.ORANGE,
  },
  rootHigh: {
    width: THUMB_RADIUS_HIGH * 2,
    height: THUMB_RADIUS_HIGH * 2,
    borderRadius: THUMB_RADIUS_HIGH,
    backgroundColor: ColorConstant.ORANGE,
  },
});

export default memo(Thumb);
