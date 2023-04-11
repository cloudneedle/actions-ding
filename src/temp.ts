import {ActionCard} from "./message";

export function getActionCard(opt: {
    runId: string, // 运行ID
    ref: string, // 分支
    jobName: string, // 任务名称
    commitMsg: string, // 提交信息
    commitAuthor: string, // 提交人
    btnOrientation: "0" | "1", // 0: 按钮竖直排列, 1: 按钮横向排列
    serverUrl: string, // 服务器地址
    repository: string, // 仓库名称
    result: string, // 执行结果
    isStart: string, // 是否是开始
    startAt: string, // 开始时间, 时间戳(秒)
}): ActionCard {
    const repoUrl = `${opt.serverUrl}/${opt.repository}`;
    const jobUrl = `${repoUrl}/actions/runs/${opt.runId}`;
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
任务ID：**${opt.runId}**<br/>
任务名：**${opt.jobName}**<br/>
仓库名：**${opt.repository}**<br/>
提交信息：**${opt.commitMsg}**<br/>
提交分支：**${branch}**<br/>
提交人：**${opt.commitAuthor}**<br/>
    `

    const startText = `**CI任务<font color=#FF9900>启动</font>通知**<br/>`
    const resultText = opt.result === 'success' ?
        `**CI任务<font color=#33CC00>执行成功</font>通知**<br/>` :
        `**CI任务<font color=#FF3333>执行失败</font>通知**<br/>`
    let title = ''
    if (opt.isStart === "true") {
        title = 'CI任务启动通知'
        commonText = startText + commonText
    } else {
        title = opt.result === 'success' ? 'CI任务执行成功通知' : 'CI任务执行失败通知'
        commonText = resultText + commonText
        // 计算耗时：00分00秒
        const startAt = parseInt(opt.startAt);
        const endAt = Math.floor(Date.now() / 1000);
        const diff = endAt - startAt;
        const min = Math.floor(diff / 60);
        const sec = diff % 60;
        commonText += `耗时：**${min}分${sec}秒**<br/>`
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