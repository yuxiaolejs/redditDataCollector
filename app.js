const axios = require("axios")
const fs = require("fs")

const dataSetName = "test"

function collectData(sort, limit, after) {
    if (sort != "") sort = `/${sort}`
    if (limit > 100) limit = 100
    return axios({
        method: "get",
        url: `https://www.reddit.com/r/AmItheAsshole${sort}.json?t=all`,
        params: {
            limit: limit,
            after
        }
    })
}

let dataRes = []

let next = ""

// Recover progress from json file
if (fs.existsSync(`./data/${dataSetName}.json`)) {
    dataRes = JSON.parse(fs.readFileSync(`./data/${dataSetName}.json`))
    console.log("Recovered", dataRes.length)
    next = dataRes[dataRes.length - 1].data.name
}


function collectDataRecursive(sort, limit, after) {
    return new Promise((resolve, reject) => {
        collectData(sort, limit, after).then((res) => {
            dataRes = dataRes.concat(res.data.data.children)
            console.log("Finished", res.data.data.after, res.data.data.children.length)
            fs.writeFileSync(`./data/${dataSetName}.json`, JSON.stringify(dataRes, null, 2))
            if (!res.data.data.after) {
                console.log("ALERT: No more data")
                resolve(res)
                return;
            }
            if (limit > 100)
                collectDataRecursive(sort, limit - 100, res.data.data.after).then(res => {
                    resolve(res)
                })
            else {
                resolve(dataRes)
            }
        })
    })
}

collectDataRecursive("", 1000, next).then(res => {
    fs.writeFileSync(`./data/${dataSetName}.json`, JSON.stringify(dataRes, null, 2))
})