import React, {View} from "react-native";
import { Provider } from "react-redux/native";
import configureStore from "../redux/store/configure-store";


const store = configureStore();

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View>Test App</View>
      </Provider>
    );
  }
}

export default Root;
