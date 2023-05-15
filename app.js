const axios = require("axios")
const fs = require("fs")

const dataSetName = "controversialAll1000"

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


function collectDataRecursive(sort, limit, after) {
    return new Promise((resolve, reject) => {
        collectData(sort, limit, after).then((res) => {
            console.log("Finished", res.data.data.after)
            if(!res.data.data.after){
                console.log("ALERT: No more data")
                resolve(res)
                return;
            }
            dataRes = dataRes.concat(res.data.data.children)
            if (limit > 100)
                collectDataRecursive(sort, limit - 100, res.data.data.after).then(res => {
                    resolve(res)
                })
            else{
                resolve(dataRes)
            }
        })
    })
}

collectDataRecursive("controversial", 1000, "").then(res => {
    fs.writeFileSync(`./data/${dataSetName}.json`, JSON.stringify(dataRes, null, 2))
})