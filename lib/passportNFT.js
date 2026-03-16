import { ethers } from "ethers"

const contractAddress = "0xbA952386365668da9Cc2a39d0FBB36D94B2D3Ec1"

const abi = [
 "function mintPassport(address owner,string passportId,string metadataURI)"
]

export async function mintPassportNFT(passportId){

  if(!window.ethereum){
    alert("MetaMask required")
    return
  }

  await window.ethereum.request({
    method:"eth_requestAccounts"
  })

  const provider = new ethers.BrowserProvider(window.ethereum)

  const signer = await provider.getSigner()

  const contract = new ethers.Contract(
    contractAddress,
    abi,
    signer
  )

  const metadataURI = `https://circularchain.app/passport/${passportId}`

  const tx = await contract.mintPassport(
    await signer.getAddress(),
    passportId,
    metadataURI
  )

  await tx.wait()

  return tx.hash
}