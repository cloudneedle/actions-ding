import {ActionCard} from "./message";
import * as core from "@actions/core";

export function getActionCard(opt: {
    runId: string, // 运行ID
    ref: string, // 分支
    jobName: string, // 任务名称
    commitMsg: string, // 提交信息
    commitAuthor: string, // 提交人
    btnOrientation: "0" | "1", // 0: 按钮竖直排列, 1: 按钮横向排列
    serverUrl: string, // 服务器地址
    repository: string, // 仓库名称
    jobStatus: string, // 执行结果: success, failure
    event: string, // 事件: start, end
    startTime: string, // 开始时间, 时间戳(秒)
}): ActionCard {
    const baseUrl = `${opt.serverUrl}/${opt.repository}`;
    const repoUrl = `dingtalk://dingtalkclient/page/link?url=${encodeURI(baseUrl)}&pc_slide=false`;
    const jobBaseUrl = `${baseUrl}/actions/runs/${opt.runId}`;
    const jobUrl = `dingtalk://dingtalkclient/page/link?url=${encodeURI(jobBaseUrl)}&pc_slide=false`;
    const btns = [
        {
            title: "查看项目",
            actionURL: repoUrl,
        },
        {
            title: "查看任务",
            actionURL: jobUrl,
        },
    ];

    const branch = opt.ref.replace('refs/heads/', '');
    let commonText = `
任务ID：**${opt.runId}**\n  
任务名：**${opt.jobName}**\n  
仓库名：**${opt.repository}**\n  
提交信息：**${opt.commitMsg}**\n  
提交分支：**${branch}**\n  
提交人：**${opt.commitAuthor}**\n  
`

    const startText = `**CI任务<font color=#FF9900>启动</font>通知**\n  `
    const resultText = opt.jobStatus === 'success' ?
        `**CI任务<font color=#33CC00>执行成功</font>通知**\n  ` :
        `**CI任务<font color=#FF3333>执行失败</font>通知**\n  `
    let title = ''
    if (opt.event === "start") {
        title = 'CI任务启动通知'
        commonText = startText + commonText
        core.setOutput('startAt', Math.floor(Date.now() / 1000).toString())
    } else {
        title = opt.jobStatus === 'success' ? 'CI任务执行成功通知' : 'CI任务执行失败通知'
        commonText = resultText + commonText
        // 计算耗时：00分00秒
        if (opt.startTime) {
            const startAt = parseInt(opt.startTime);
            const endAt = Math.floor(Date.now() / 1000);
            const diff = endAt - startAt;
            const min = Math.floor(diff / 60);
            const sec = diff % 60;
            commonText += `耗时：**${min}分${sec}秒**`
        }
    }

    return {
        msgtype: "actionCard",
        actionCard: {
            title: title,
            text: commonText,
            btnOrientation: opt.btnOrientation,
            btns,
        },
    };
}