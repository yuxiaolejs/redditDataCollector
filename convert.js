const fs = require("fs")

const dataSetName = "topAll1000"
const data1 = require(`./data/${dataSetName}.json`)
console.log(data1[0])
const output = []
for (let i = 0; i < data1.length; i++) {
    output.push({
        title: data1[i].data.title,
        // text: data1[i].data.selftext,
        pwls: data1[i].data.pwls,
        author: data1[i].data.author,
        upvote_ratio: data1[i].data.upvote_ratio,
        score: data1[i].data.score,
        up: data1[i].data.ups,
        wls: data1[i].data.wls,
        comments: data1[i].data.num_comments,
        created: data1[i].data.created_utc,
        flair: data1[i].data.link_flair_text,
        id: data1[i].data.name,
        link: data1[i].data.permalink,
        edited: data1[i].data.edited,
    })
}
console.log(output[0])
// Convert to CSV
let csv = ""
let keys = Object.keys(output[0])
for (let j = 0; j < keys.length; j++) {
    csv += JSON.stringify(keys[j])
    if (j != keys.length - 1)
        csv += ","
}
csv += "\n"
for (let i = 0; i < output.length; i++) {
    let keys = Object.keys(output[i])
    for (let j = 0; j < keys.length; j++) {
        if (typeof output[i][keys[j]] == "string")
            csv += JSON.stringify(output[i][keys[j]].replace(/\"/g,"“"))
        else
            csv += output[i][keys[j]]
        if (j != keys.length - 1)
            csv += ","
    }
    csv += "\n"
}

fs.writeFileSync(`./data/${dataSetName}.csv`, csv)