import React, { memo } from 'react';
import {StyleSheet, View} from 'react-native';
import { ColorConstant } from '../../../../constants/ColorConstants';

const RailSelected = () => {
  return (
    <View style={styles.root}/>
  );
};

export default memo(RailSelected);

const styles = StyleSheet.create({
  root: {
    height: 4,
    backgroundColor: ColorConstant.ORANGE,
    borderRadius: 2,
  },
});
