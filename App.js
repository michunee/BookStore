import { React } from "react";
import { NativeBaseProvider, StatusBar } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogBox } from "react-native";
import LoginScreen from "./src/Screens/LoginScreen";
import BottomNav from "./src/Navigations/BottomNav";
import RegisterScreen from "./src/Screens/RegisterScreen";
import ProductDetailScreen from "./src/Screens/ProductDetailScreen";
import CartScreen from "./src/Screens/CartScreen";
import CategoryDetailScreen from "./src/Screens/CategoryDetailScreen";
import store from "./src/redux/store";
import { Provider } from "react-redux";

const Stack = createNativeStackNavigator();

export default function App() {
  LogBox.ignoreAllLogs();
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <StatusBar hidden={true} />
          <Stack.Navigator
            initialRouteName="Bottom"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetailScreen}
            />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen
              name="CategoryDetail"
              component={CategoryDetailScreen}
            />
            <Stack.Screen name="Bottom" component={BottomNav} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}
