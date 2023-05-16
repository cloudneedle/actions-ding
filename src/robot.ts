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
      const serverUrl = core.getInput('serverUrl')
      const evt = core.getInput('evt')
      console.log("serverUrl:",serverUrl);
      console.log("evt:",evt);
      if (evt === "start") {
        core.setOutput('startAt', Math.floor(Date.now() / 1000).toString())
      }
    }).catch(e=>{
      console.log("钉钉消息推送失败:",e)
    })
  }
}
