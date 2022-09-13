import ipfsClient from 'ipfs-http-client';

const projectId =
  process.env.IPFS_PROJECT_ID !== undefined
    ? process.env.IPFS_PROJECT_ID
    : '1zPRnySCqLoxlmzKBs0RBh4hUif';
const projectSecret =
  process.env.IPFS_PROJECT_SECRET !== undefined
    ? process.env.IPFS_PROJECT_SECRET
    : '2acaf522ec503e283226c1fc20b35be8';

let auth;
if (process.env.IPFS === 'infura')
  auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
else auth = process.env.IPFS_AUTH;

const client = ipfsClient.create({
  host:
    process.env.IPFS === 'infura' ? 'ipfs.infura.io' : process.env.IPFS_HOST,
  port: process.env.IPFS === 'infura' ? 5001 : process.env.IPFS_PORT,
  protocol: process.env.IPFS === 'local' ? 'http' : 'https',
  headers: {
    authorization: auth,
  },
});

async function addFileAndPin(filePath) {
  console.log(await client.isOnline());
  let hash;
  await client.add(filePath).then(res => {
    hash = res.path;
    client.pin.add(res.cid).then();
  });
  return hash;
}

client.addFileAndPin = addFileAndPin;
client.remove = client.pin.rm;

client.addFileAndPin('/app/metadata/2.json').then(result => {
  console.log(result);
  client.remove(result).then(res => console.log('removed: ', res));
});

module.exports = {
  ipfsClient: client,
};