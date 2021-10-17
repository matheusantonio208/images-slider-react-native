import * as React from 'react';
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const {width, height} = Dimensions.get('screen');

const data = [
  'https://cdn.dribbble.com/users/5438117/screenshots/16359789/media/8db00b10fc21042219498628f620a55b.jpg?compress=1&resize=1200x900',
  'https://cdn.dribbble.com/users/5438117/screenshots/16031875/media/8056f478f4ba3299ec29b98515049b55.jpg?compress=1&resize=1200x900',
  'https://cdn.dribbble.com/users/5438117/screenshots/16001836/media/8352b32189a286e0b1dd5e89e3abef19.jpg?compress=1&resize=1200x900',
  'https://cdn.dribbble.com/users/5438117/screenshots/15890234/media/6e1e54ae3918acbf88515d622d513597.jpg?compress=1&resize=1200x900',
  'https://cdn.dribbble.com/users/5438117/screenshots/15518374/media/a4aa1b77cbbaf699a46b6d8e70931398.jpg?compress=1&resize=1200x900',
  'https://cdn.dribbble.com/users/5438117/screenshots/15308776/media/cfc5a5f17eeac77f5a39e2be371b19ab.jpg?compress=1&resize=1200x900',
  'https://cdn.dribbble.com/users/5438117/screenshots/13992828/media/bd87e71bf7770c808e391082d16820f7.jpeg?compress=1&resize=800x600',
];

const imageW = width * 0.7;
const imageH = imageW * 1.54;

export default () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <StatusBar hidden />
      <View style={StyleSheet.absoluteFillObject}>
        {data.map((image, index) => {
          const opacity = scrollX.interpolate({
            inputRange: [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ],
            outputRange: [0, 1, 0],
          });
          return (
            <Animated.Image
              key={`image-${index}`}
              source={{uri: image}}
              style={[StyleSheet.absoluteFillObject, {opacity}]}
              blurRadius={50}
            />
          );
        })}
      </View>
      <Animated.FlatList
        data={data}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        renderItem={({item}) => (
          <View
            style={{
              width,
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOpacity: 1,
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowRadius: 20,
            }}>
            <Image
              source={{uri: item}}
              style={{
                width: imageW,
                height: imageH,
                resizeMode: 'cover',
                borderRadius: 16,
              }}
            />
          </View>
        )}
      />
    </View>
  );
};
