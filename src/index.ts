import {Robot} from "./robot";
import {getActionCard} from "./temp";
import * as core from '@actions/core'

function run() {
    const dingToken = core.getInput('dingToken', {required: true})
    const runId = core.getInput('runId', {required: true})
    const ref = core.getInput('ref', {required: true})
    const job = core.getInput('job', {required: true})
    const jobStatus = core.getInput('jobStatus',{required: true})
    const commitMsg = core.getInput('commitMsg', {required: true})
    const commitAuthor = core.getInput('commitAuthor', {required: true})
    const serverUrl = core.getInput('serverUrl')
    const repository = core.getInput('repo')
    const isStart = core.getInput('isStart')
    const startAt = core.getInput('startAt')

    const msg = new Robot(dingToken, getActionCard({
        runId: runId,
        ref: ref,
        jobName: job,
        commitMsg: commitMsg,
        commitAuthor: commitAuthor,
        btnOrientation: "1",
        serverUrl: serverUrl,
        repository: repository,
        jobStatus: jobStatus,
        isStart: isStart,
        startAt: startAt,
    }))

    msg.send()
}

run()
