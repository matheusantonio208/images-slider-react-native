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
  {
    image:
      'https://cdn.dribbble.com/users/5438117/screenshots/16359789/media/8db00b10fc21042219498628f620a55b.jpg?compress=1&resize=1200x900',
    title: 'Little Goat',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam viverra mauris eu auctor euismod. Suspendisse elit enim, posuere non volutpat non, venenatis sed ligula.',
  },
  {
    image:
      'https://cdn.dribbble.com/users/5438117/screenshots/16031875/media/8056f478f4ba3299ec29b98515049b55.jpg?compress=1&resize=1200x900',
    title: 'Café',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam viverra mauris eu auctor euismod. Suspendisse elit enim, posuere non volutpat non, venenatis sed ligula.',
  },
  {
    image:
      'https://cdn.dribbble.com/users/5438117/screenshots/16001836/media/8352b32189a286e0b1dd5e89e3abef19.jpg?compress=1&resize=1200x900',
    title: 'Morning routines',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam viverra mauris eu auctor euismod. Suspendisse elit enim, posuere non volutpat non, venenatis sed ligula.',
  },
  {
    image:
      'https://cdn.dribbble.com/users/5438117/screenshots/15890234/media/6e1e54ae3918acbf88515d622d513597.jpg?compress=1&resize=1200x900',
    title: 'Goose',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam viverra mauris eu auctor euismod. Suspendisse elit enim, posuere non volutpat non, venenatis sed ligula.',
  },
  {
    image:
      'https://cdn.dribbble.com/users/5438117/screenshots/15518374/media/a4aa1b77cbbaf699a46b6d8e70931398.jpg?compress=1&resize=1200x900',
    title: 'Flowerbed',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam viverra mauris eu auctor euismod. Suspendisse elit enim, posuere non volutpat non, venenatis sed ligula.',
  },
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
              source={{uri: image.image}}
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
            <View>
              <Image
                source={{uri: item.image}}
                style={{
                  width: imageW,
                  height: imageH,
                  resizeMode: 'cover',
                  borderRadius: 16,
                }}
              />
              <View style={{width: imageW}}>
                <Text
                  style={{
                    fontFamily: 'Roboto-Black',
                    fontSize: 36,
                    textAlign: 'left',
                    textTransform: 'uppercase',
                    color: '#fff',
                    marginTop: 20,
                  }}>
                  {item.title}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Roboto-Regular',
                    fontSize: 16,
                    textAlign: 'left',
                    color: '#fff',
                    marginTop: 15,
                  }}>
                  {item.text}
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};
