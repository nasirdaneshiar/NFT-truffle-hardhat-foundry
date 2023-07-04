const {expect} =  require("chai");
const hre = require("hardhat");
const {loadFixture,} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("Spacebear", function(){
    async function deploySpacebearAndMintTokenFixture(){
        const SpacebearInstance = await hre.ethers.deployContract("Spacebear"); 
        await SpacebearInstance.waitForDeployment();
        const [owner, otherAccount] = await ethers.getSigners();
        await SpacebearInstance.safeMint(otherAccount.address);
        return {SpacebearInstance};
    }

    it("is possible to mint a token", async() => {
        const {SpacebearInstance} = await loadFixture(deploySpacebearAndMintTokenFixture)

        const [owner, otherAccount] = await ethers.getSigners();
        
        expect(await SpacebearInstance.ownerOf(0)).to.equal(otherAccount.address);
    })

    it("fails to transfer tokens from wrong address",async ()=>{
        const {SpacebearInstance}= await loadFixture(deploySpacebearAndMintTokenFixture);
        const [owner, otherAccount,notTheNftOwner] = await ethers.getSigners();
        
        expect(await SpacebearInstance.ownerOf(0)).to.equal(otherAccount.address);

        await expect(SpacebearInstance.connect(notTheNftOwner).transferFrom(otherAccount.address, notTheNftOwner.address, 0)).to.be.revertedWith("ERC721: caller is not token owner or approved");
    })
})