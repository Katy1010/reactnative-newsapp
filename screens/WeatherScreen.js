import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, SafeAreaView } from "react-native";
import WeatherItem from "../components/WeatherItem";
import axios from "axios";
import Config from "react-native-config";
// app.jsonにAPIキーを直接入れるときはこっちを使う
import Constants from "expo-constants";

//各地域のAPI情報
const Hokkaido = {
  name: "北海道",
  uri: `http://api.openweathermap.org/data/2.5/weather?q=Asahikawa&lang=ja&exclude=hourly,minutely&units=metric&APPID=${Config.WEATHER_API_KEY}`,
};
const Touhoku = {
  name: "東北",
  uri: `http://api.openweathermap.org/data/2.5/weather?q=Yamagata&lang=ja&exclude=hourly,minutely&units=metric&&APPID=${Config.WEATHER_API_KEY}`,
};
const Kantou = {
  name: "関東",
  uri: `http://api.openweathermap.org/data/2.5/weather?q=Tokyo&lang=ja&exclude=hourly,minutely&units=metric&&APPID=${Config.WEATHER_API_KEY}`,
};
const Hokuriku = {
  name: "北陸",
  uri: `http://api.openweathermap.org/data/2.5/weather?q=Nagano&lang=ja&exclude=hourly,minutely&units=metric&&APPID=${Config.WEATHER_API_KEY}`,
};
const Toukai = {
  name: "東海",
  uri: `http://api.openweathermap.org/data/2.5/weather?q=Nagoya&lang=ja&exclude=hourly,minutely&units=metric&&APPID=${Config.WEATHER_API_KEY}`,
};
const Kinnki = {
  name: "近畿",
  uri: `http://api.openweathermap.org/data/2.5/weather?q=Osaka&lang=ja&exclude=hourly,minutely&units=metric&&APPID=${Config.WEATHER_API_KEY}`,
};
const Tyugoku = {
  name: "中国",
  uri: `http://api.openweathermap.org/data/2.5/weather?q=Hiroshima&lang=ja&exclude=hourly,minutely&units=metric&&APPID=${Config.WEATHER_API_KEY}`,
};
const sikoku = {
  name: "四国",
  uri: `http://api.openweathermap.org/data/2.5/weather?q=Matsuyama&lang=ja&exclude=hourly,minutely&units=metric&&APPID=${Config.WEATHER_API_KEY}`,
};
const Kyusyu = {
  name: "九州",
  uri: `http://api.openweathermap.org/data/2.5/weather?q=Ozu&lang=ja&exclude=hourly,minutely&units=metric&&APPID=${Config.WEATHER_API_KEY}`,
};
const Okinawa = {
  name: "沖縄",
  uri: `http://api.openweathermap.org/data/2.5/weather?q=Okinawa&lang=ja&exclude=hourly,minutely&units=metric&&APPID=${Config.WEATHER_API_KEY}`,
};
//各地域のAPI情報を配列に格納
const TotalUri = [
  Hokkaido,
  Touhoku,
  Kantou,
  Hokuriku,
  Toukai,
  Kinnki,
  Tyugoku,
  sikoku,
  Kyusyu,
  Okinawa,
];

export default function WeatherScreen() {
  const [weather, setWeathers] = useState([]);

  useEffect(() => {
    const getWeathers = async () => {
      const requests = TotalUri.map((info) => axios.get(info.uri)); // 各地域のリクエストを作成
      const responses = await Promise.all(requests); // すべてのリクエストを並行して実行

      const weathers = responses.map((response, index) => {
        const uriData = response.data.weather[0]; // APIのレスポンス構造に基づく
        return {
          ...uriData,
          name: TotalUri[index].name, // 地域名を追加
        };
      });

      setWeathers(weathers);
    };
    getWeathers();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={weather}
        renderItem={({ item }) => (
          <WeatherItem
            description={item.description}
            icon={item.icon}
            name={item.name}
          />
        )}
        keyExtractor={(contact, index) => index.String()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
