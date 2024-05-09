import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
import NewsScreen from "./screens/NewsScreen";
import DetailScreen from "./screens/DetailScreen";
import WeatherScreen from "./screens/WeatherScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const NewsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ニュース" component={NewsScreen} />
      <Stack.Screen name="詳細ページ" component={DetailScreen} />
    </Stack.Navigator>
  );
};

const WeatherStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="天気予報" component={WeatherScreen} />
    </Stack.Navigator>
  );
};

const screenOption = ({ route }) => ({
  tabBarIcon: ({ color, size }) => {
    let iconName;
    if (route.name === "ニュース一覧") {
      iconName = "newspaper-o";
    } else if (route.name === "天気予報一覧") {
      iconName = "sun-o";
    }

    // You can return any component that you like here!
    return <FontAwesome name={iconName} size={size} color={color} />;
  },
});

export default App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOption}>
        <Tab.Screen name="ニュース一覧" component={NewsStack} />
        <Tab.Screen name="天気予報一覧" component={WeatherStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
