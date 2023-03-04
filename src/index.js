import { Contract, providers, BigNumber } from "ethers";
import tokenAbi from "../artifacts/contracts/MetroToken.sol/MetroTokenUpgradeable.json";

var provider, signer;

var tokenAddress = "0xD1BD53f3159702a53D41D4DFF085dFEc618905d5";
var tokenContract;


function initSmartContract(){

    if( !window.ethereum ) throw Error("Mentamask no instalado");

    provider = new providers.Web3Provider(window.ethereum);
    tokenContract = new Contract(tokenAddress,tokenAbi.abi,provider);

}


function connectToMetaMask(){

    console.log("entro...");
    var btn = document.getElementById("btnConnect");
    

    btn.addEventListener("click", async function(){
        var [account] = await ethereum.request({ method: 'eth_requestAccounts' });
        signer = provider.getSigner(account);
        console.log("signer", signer);
    });

}


function setSmartContractMethods(){
    var bttn = document.getElementById("approveButton");
    bttn.addEventListener("click", async function(){
        var valueRaw = document.getElementById("approveAmount").value;
        var value = BigNumber.from(`${valueRaw}000000000000000000`);
        var adm_add = "0x428F108012822507Fe410eeB98904206B07f652D";

        var tx = await tokenContract.connect(signer).mint(adm_add, value);
        console.log(tx);
        var response = await tx.await();

        console.log( response.transactionHash);

    })
}


function setUp(){

    initSmartContract();
    console.log("entrandoo...");
    connectToMetaMask();
    setSmartContractMethods();
}

setUp();