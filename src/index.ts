import axios from "axios";

function getApi() {
  axios.get('http://t.weather.sojson.com/api/weather/city/101030100').then(e=>{
    console.log("请求成功：",e)
  }).catch(e=>{
    console.log("请求失败：",e)
    })
}

getApi()