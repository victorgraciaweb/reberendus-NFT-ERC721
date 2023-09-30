import Web3 from 'web3';

const getWeb3 = async (): Promise<Web3 | null> => {
  if (typeof window !== 'undefined' && (window as any).ethereum) {
    const web3 = new Web3((window as any).ethereum);
    // const web3 = new Web3('http://127.0.0.1:8545/');
    try {
      // Request account access
      const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
      console.log('Accounts: ', accounts);
      return web3;
    } catch (error) {
      console.error('User denied account access', error);
      return null;
    }
  }
  console.error('Metamask not found');
  return null;
};

export default getWeb3;
