import { ethers } from "ethers"

const contractAddress = "0x7772D43cf27f307E279652619a67fc1858aA1ee4"

const abi = [
  "function registerCertificate(string assetId, string certificateHash)"
]

export async function registerOnBlockchain(assetId, hash){

  if(!window.ethereum){
    alert("MetaMask required")
    return
  }

  const provider = new ethers.BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()

  const contract = new ethers.Contract(
    contractAddress,
    abi,
    signer
  )

  const tx = await contract.registerCertificate(
    assetId,
    hash
  )

  await tx.wait()

  return tx.hash
}