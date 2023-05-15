const data1 = require("./controversialAll1000.json")
const data2 = require("./topAll1000.json")
let num = 0;
let sum = 0;
for (i = 0; i < data1.length; i++) {
    num++;
    // console.log(data1[i].data.num_comments)
    sum += data1[i].data.num_comments
}
let avg = sum / num

let std = 0

for (i = 0; i < data1.length; i++) {
    std += Math.pow(avg - data1[i].data.num_comments,2)
}
console.log(avg, Math.sqrt(std))

num = 0;
sum = 0;
for (i = 0; i < data2.length; i++) {
    num++
    // console.log(data2[i].data.num_comments)
    sum += data2[i].data.num_comments
}
avg = sum / num
std = 0
for (i = 0; i < data1.length; i++) {
    std += Math.pow(avg - data2[i].data.num_comments,2)
}
console.log(avg, Math.sqrt(std))
