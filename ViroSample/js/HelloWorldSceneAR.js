'use strict';

import React, { Component } from 'react';

import { StyleSheet, View, Button, Text } from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroImage,
  ViroARPlaneSelector,
  ViroNode
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {
  // Set initial state here
  state = {
    text: 'Initial...',
    scale: [2.5, 2.5, 2.5]
  };

  render() {
    return (
      <ViroARScene>
        <ViroText
          text={this.state.text}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -1]}
        />
        <ViroARImageMarker target={'targetOne'}>
          <ViroNode
            dragType="FixedToWorld"
            onDrag={() => {}}
            onPinch={this._onPinch.bind(this)}
            scale={[0.6, 0.6, 0.6]}
          >
            <ViroImage
              height={1}
              width={1}
              placeholderSource={require('../images/platform.jpg')}
              source={require('../images/platform.jpg')}
              rotation={[-10, 0, 0]}
              position={[0, 2, 0]}
              ref={this._setARNodeRef.bind(this)}
              // scale={[0.2, 0.2, 0.2]}
            />
          </ViroNode>
        </ViroARImageMarker>
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: 'Hello Mate!'
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  _setARNodeRef(component) {
    this.arNodeRef = component;
  }

  _onPinch(pinchState, scaleFactor, source) {
    let newScale = this.state.scale.map(vector => {
      return vector * scaleFactor;
    });

    if (pinchState == 3) {
      this.setState({
        scale: newScale
        // text: '!!!'
        // scale: [2.5, 2.5, 2.5]
      });
      // update scale of obj by multiplying by scaleFactor  when pinch ends.
      return;
    }

    this.arNodeRef.setNativeProps({ scale: newScale });
    //set scale using native props to reflect pinch.
  }
}

ViroARTrackingTargets.createTargets({
  targetOne: {
    source: require('../images/bird.jpg'),
    orientation: 'Up',
    physicalWidth: 0.25 // real world width in meters
  }
});

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center'
  }
});

module.exports = HelloWorldSceneAR;
