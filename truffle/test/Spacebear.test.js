const Spacebear = artifacts.require("Spacebear");
const truffleAssert = require("truffle-assertions");

contract("Spacebear",(accounts) => {
    it("should credit an NFT to a specific account",async() => {
        const spacebearInstance = await Spacebear.deployed();
        let txResult =await spacebearInstance.safeMint(accounts[1],"4.json");
        truffleAssert.eventEmitted(txResult, "Transfer",{to : accounts[1],tokenId:web3.utils.toBN("0")})
        assert.equal(await spacebearInstance.ownerOf(0),accounts[1],"Owner of Token 1 is not equal account2");

    })
})