import React, {PureComponent} from 'react';
import {StyleSheet, Animated, TouchableOpacity, Text, View} from 'react-native';
import _ from 'lodash';

// import React, { Component } from 'react';
// import PropTypes from 'prop-types';

// import { StyleSheet, Text, View } from 'react-native';
const STAR_IMAGE = require( '../../assets/images/airbnb-star.png' );
const STAR_SELECTED_IMAGE = require( '../../assets/images/airbnb-star-selected.png' );
const STAR_SIZE = 40;

export class Star extends PureComponent {
  static defaultProps = {
    selectedColor: '#ff7f21'
  };

  constructor() {
    super();
    this.springValue = new Animated.Value( 1 );

    this.state = {
      selected: false
    };
  }

  spring() {
    const { position, starSelectedInPosition } = this.props;

    this.springValue.setValue( 1.2 );

    Animated.spring(
      this.springValue,
      {
        toValue: 1,
        friction: 2,
        tension: 1,
        useNativeDriver: true,
      }
    ).start();

    this.setState( { selected: !this.state.selected } );
    starSelectedInPosition( position );
  }

  render() {
    const { fill, size, selectedColor, isDisabled, starStyle } = this.props;
    const starSource = fill && selectedColor === null ? STAR_SELECTED_IMAGE : STAR_IMAGE;

    return (
      <TouchableOpacity activeOpacity={1} onPress={this.spring.bind( this )} disabled={isDisabled}>
        <Animated.Image
          source={starSource}
          style={[
            styles.starStyle,
            {
              tintColor: fill && selectedColor ? selectedColor : '#fef6f1',
              width: size || STAR_SIZE,
              height: size || STAR_SIZE,
              transform: [{ scale: this.springValue }]
            },
            starStyle
          ]}
        />
      </TouchableOpacity>
    );
  }
}

export default class StarRating extends React.Component{
    static defaultProps = {
        defaultRating: 3,
        count: 5,
        showRating: true,
        reviewColor: 'rgba(230, 196, 46, 1)',
        reviewSize: 25
      };
    
      static getDerivedStateFromProps(nextProps, prevState) {
        const { defaultRating } = nextProps;
    
        if (defaultRating !== prevState.defaultRating) {
          return {
            position: defaultRating,
            defaultRating
          }
        }
        return null;
      }
    
      constructor() {
        super()
    
        this.state = {
          position: 5
        }
      }
    
      componentDidMount() {
        const { defaultRating } = this.props
    
        this.setState({ position: defaultRating })
      }
    
      renderStars(rating_array) {
        return _.map(rating_array, (star, index) => {
          return star
        })
      }
    
      starSelectedInPosition(position) {
        const { onFinishRating } = this.props
    
        if (typeof onFinishRating === 'function') onFinishRating(position);
    
        this.setState({ position: position })
      }
    
      render() {
        const { position } = this.state
        const { count, reviews, showRating, reviewColor, reviewSize } = this.props
        const rating_array = []
        const starContainerStyle = [styles.starContainer]
    
        if (this.props.starContainerStyle) {
            starContainerStyle.push(this.props.starContainerStyle);
        }
    
        _.times(count, index => {
          rating_array.push(
            <Star
              key={index}
              position={index + 1}
              starSelectedInPosition={this.starSelectedInPosition.bind(this)}
              fill={position >= index + 1}
              {...this.props}
            />
          )
        })
    
        return (
          <View style={styles.ratingContainer}>
            <View style={starContainerStyle}>
              {this.renderStars(rating_array)}
            </View>
          </View>
        );
      }
}

const styles = StyleSheet.create( {
  starStyle: {
    margin: 3
  },
  ratingContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewText: {
    fontWeight: 'bold',
    margin: 10,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
} );
