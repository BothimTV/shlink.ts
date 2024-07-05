const { readdirSync, writeFileSync } = require("fs")

const classFolders = ["ApiClient", "builder"]

const res = ["/* Auto generated */"]

for (const folder of classFolders) {
    res.push(`\n/* ${folder} */`)
    const files = readdirSync(`./src/${folder}`)
        .filter(file => file.endsWith(".ts"))
    for (const file of files) {
        res.push(`export { ${file.split(".")[0]} } from "./${folder}/${file.split(".")[0]}";`)
    }
}

res.push(`\n/* types */`)
const files = readdirSync(`./src/types`)
    .filter(file => file.endsWith(".ts"))
for (const file of files) {
    res.push(`export * from "./types/${file.split(".")[0]}";`)
}

writeFileSync("./src/index.ts", res.join("\n"))
console.log(`Successfully created ${res.length} exports`)