import { View, Text } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';
import { Dimensions } from 'react-native';
import { theme } from '../theme';

const {width , height} = Dimensions.get('window');
export default function Loading() {
  return (
    <View style={{height , width}} className=" absolute bg-neutral-800  flex-row justify-center items-center ">
        <Progress.CircleSnail  size={160} thickness={12} color={theme.background}   unfilledColor="#aaaa"  />
      
    </View>
  )
}