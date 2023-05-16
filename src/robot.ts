import axios from "axios";
import { ActionCard } from "./message";
import * as core from "@actions/core";
export class Robot {
  constructor(
    public token: string,
    public body: ActionCard,
  ) {}

  send() {
    axios.post(`https://oapi.dingtalk.com/robot/send?access_token=${this.token}`, this.body).then(e=>{
      console.log("钉钉消息推送成功")
    }).catch(e=>{
      console.log("钉钉消息推送失败:",e)
    })
  }
}
