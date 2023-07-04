const hre = require("hardhat");

(async () => {
    try {
        const SpacebearInstance = await hre.ethers.deployContract("Spacebear"); 

        await SpacebearInstance.waitForDeployment();

        const contractAddress = await SpacebearInstance.getAddress();

        console.log(`Deploy Contract at ${contractAddress}`);
    } catch(e) {
        console.log("Oh no!!!!!!!!!!!!!!!!!!!!!!!!");
        console.error(e);
        process.exitCode = 1;
    }
})()