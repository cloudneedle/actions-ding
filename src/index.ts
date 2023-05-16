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
    const serverUrl = process.env.GITHUB_SERVER_URL
    const repository = core.getInput('repo')
    const event = core.getInput('event')
    const startTime = core.getInput('startTime')

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
        event: event,
        startTime: startTime,
    }))
    msg.send()
}

run()
