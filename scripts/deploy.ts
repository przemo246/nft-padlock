// import { ethers } from "hardhat";
// import { ethers } from "hardhat";
// import { parseEther } from "ethers/lib/utils";
// import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
// import { BigNumber } from "ethers";

// import {
//     PadLock__factory,
//     PadLock,
//     VaultFactory__factory,
//     ERC1155NFT__factory,
//     ERC1155NFT,
//     WETHMock__factory,
//     WETHMock,
//     PoolProviderMock__factory,
//     PoolProviderMock,
//     PoolMock__factory,
//     PoolMock,
//     RewardsControllerStub__factory,
//     RewardsControllerStub,
//     PoolDataProviderMock__factory,
//     PoolDataProviderMock,
// } from "../typechain-types";

// async function main() {
//     let [deployer, bob, alice, executor] = await ethers.getSigners();

//         let weth = ""
//         let poolProvider = ""
//         let poolDataProviderMock = await new PoolDataProviderMock__factory(deployer).deploy();
//         let poolMock = await new PoolMock__factory(deployer).deploy(poolDataProviderMock.address);
//         let rewardsStub = await new RewardsControllerStub__factory(deployer).deploy();

//         await poolProviderMock.setPoolAddress(poolMock.address);

//         padlock = await new PadLock__factory(deployer).deploy(
//             executor.address,
//             wethMock.address,
//             minimalFee,
//             poolProviderMock.address,
//             poolDataProviderMock.address,
//             rewardsStub.address,
//         );

//         erc1155 = new ERC1155NFT__factory(deployer).attach(await padlock.erc1155());

//         await wethMock.transfer(alice.address, ethers.utils.parseEther("1"));
//         await wethMock.transfer(bob.address, ethers.utils.parseEther("1"));

//         await wethMock.connect(alice).approve(padlock.address, ethers.utils.parseEther("1"));
//         await wethMock.connect(bob).approve(padlock.address, ethers.utils.parseEther("1"));
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch(error => {
//     console.error(error);
//     process.exitCode = 1;
// });
