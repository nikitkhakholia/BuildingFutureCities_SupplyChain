const fs = require("fs")
const { network } = require("hardhat")

const frontEndContractsFile = "../contractconstants/contractAddresses.json"
const frontEndAbiFile = "../contractconstants/abi.json"

module.exports = async () => {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Writing to front end...")
        // updateContractAddresses()
        // updateAbi()
        console.log("Front end written!")
    }
}

async function updateAbi() {
    const supplyChain = await ethers.getContract("SupplyChain")
    fs.writeFileSync(frontEndAbiFile, supplyChain.interface.format(ethers.utils.FormatTypes.json))
}

async function updateContractAddresses() {
    const supplyChain = await ethers.getContract("SupplyChain")
    const contractAddresses = JSON.parse(fs.readFileSync(frontEndContractsFile, "utf8"))
    if (network.config.chainId.toString() in contractAddresses) {
        if (!contractAddresses[network.config.chainId.toString()].includes(supplyChain.address)) {
            contractAddresses[network.config.chainId.toString()].push(supplyChain.address)
        }
    } else {
        contractAddresses[network.config.chainId.toString()] = [supplyChain.address]
    }
    fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses))
}
module.exports.tags = ["all", "frontend"]
