
const { expect } = require("chai");
const { upgrades } = require("hardhat");

describe("MetroToken", function () {
  let MetroToken;
  let token;
  let owner;
  let addr1;
  let addr2;

  // beforeEach(async function () {
  //   [owner, addr1, addr2] = await ethers.getSigners(); 
    
  //   // var tx = await token.deployed();

  // });

  describe("Set Up", function () {
      
    it("Publicar Contratos", async function () {
        
      MetroToken = await hre.ethers.getContractFactory("MetroToken");
      token = await hre.upgrades.deployProxy(MetroToken,{
        kind:"uups",
      });

      var implementationAddress = await upgrades.erc1967.getImplementationAddress(token.address);
      console.log("Proxy Address:", token.address);
      console.log("Implementation Address:", implementationAddress);

    });


    it("Actualizar Contratos", async function () { 

      MetroTokenUpgradeable = await hre.ethers.getContractFactory("MetroTokenUpgradeable");

      var token2 = await hre.upgrades.upgradeProxy( token, MetroTokenUpgradeable);

      var implementationAddress = await upgrades.erc1967.getImplementationAddress(token2.address);
      console.log("Proxy Address:", token.address);
      console.log("Implementation Address:", implementationAddress);

    });

  });


  // describe("Funciones de Metadatos", function () {
  //   it("Debe devolver el nombre del token", async function () {
  //     expect(await token.name()).to.equal("Metro Token");
  //   });

  //   it("Debe devolver el símbolo del token", async function () {
  //     expect(await token.symbol()).to.equal("METROTKN");
  //   });

  //   it("Debe devolver el número de decimales del token", async function () {
  //     expect(await token.decimals()).to.equal(18);
  //   });
  // });

  // describe("Funciones de Transferencia", function () {
  //   it("Debe transferir tokens correctamente", async function () {
  //     await token.transfer(addr1.address, ethers.utils.parseUnits("1000", 18));
  //     expect(await token.balanceOf(addr1.address)).to.equal(ethers.utils.parseUnits("1000", 18));
  //   });

  //   it("Debe fallar al transferir más tokens de los que se tienen", async function () {
  //     const initialBalance = await token.balanceOf(owner.address);
  //     await expect(token.transfer(addr1.address, initialBalance.add(1))).to.be.revertedWith("ERC20: transfer amount exceeds balance");
  //   });

  //   it("Debe permitir la transferencia de tokens por parte de un tercero", async function () {
  //     await token.transfer(addr1.address, ethers.utils.parseUnits("1000", 18));
  //     await token.connect(addr1).transfer(addr2.address, ethers.utils.parseUnits("500", 18));
  //     expect(await token.balanceOf(addr1.address)).to.equal(ethers.utils.parseUnits("500", 18));
  //     expect(await token.balanceOf(addr2.address)).to.equal(ethers.utils.parseUnits("500", 18));
  //   });


  // });

});