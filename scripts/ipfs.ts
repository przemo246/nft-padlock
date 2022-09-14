import { File, Web3Storage, getFilesFromPath } from 'web3.storage'

function makeStorageClient () {
  return new Web3Storage({ token: process.env.WEB3_STORAGE!! })
}

function makeFileObjects (relationshipId: string){
  /// TODO: how metadata should like
  const obj = { realtionshipId: relationshipId, tier: 1 }
  const buffer = Buffer.from(JSON.stringify(obj))

  const files = [
    new File([buffer], 'metadata.json')
  ]
  return files
}

async function storeFiles (relationshipId: string) {
  let metadata = makeFileObjects(relationshipId)
  const client = makeStorageClient()
  const file = await getFilesFromPath("scripts/padlock.jpg")

  const cid_metadata = await client.put(metadata)
  const cid_jpg = await client.put(file)
  
  console.log('Metadata files with cid:', cid_metadata)
  console.log('Padlock tier:1 with cid:', cid_jpg)

  console.log("Metadata IPFS: ", `https://${cid_metadata}.ipfs.dweb.link/metadata.json`)
  console.log("Padlock IPFS: ", `https://${cid_jpg}.ipfs.w3s.link/padlock.jpg`)
}

async function main() {
  await storeFiles('test1');
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
