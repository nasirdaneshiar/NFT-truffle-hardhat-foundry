pragma solidity ^0.8.4;

import "forge-std/Test.sol";
import "../src/Spacebear.sol";

contract SpacebearTest is Test{
    Spacebear spacebear;

    function setUp() public {
        spacebear = new Spacebear();
    }

    function testName() public {
        assertEq(spacebear.name() , "Spacebear1");
    }

    function testMintingNfts() public {
        spacebear.safeMint(msg.sender);
        assertEq(spacebear.ownerOf(0),msg.sender);
        assertEq(spacebear.tokenURI(0),"https://ipfs.io/ipfs/QmU1CNuwJZTxc6FZqKLsUPVjPrR1Fg2U79sNDYQozpBj7w/genesis/1.json");
    }

    function testPurchaseNft() public {
        address purchaser = address(0x1);
        vm.expectRevert("Ownable: caller is not the owner");
        vm.startPrank(purchaser);
        spacebear.safeMint(purchaser);
        vm.stopPrank();
    }


}