import React from "react-native";

let {
  Navigator,
  View,
  Text
} = React;

class Scene extends React.Component {
  renderScene(route, navigator) {
    const Component = route.component;
    return (
      <View style={{flex: 1}}>
        
        <Text>Test</Text>
      </View>
    );
  }
  render() {
    return (
      <View style={{flex: 1}}>
        
        <Text>Test</Text>
      </View>
    );
  }
}

export default Scene;
