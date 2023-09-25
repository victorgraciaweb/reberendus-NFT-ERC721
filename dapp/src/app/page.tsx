"use client"
import styles from './page.module.css'
import React, { useEffect, useState } from 'react'
import getWeb3 from '../utils/web3Config'
import Web3 from 'web3';


export default function Home() {
  const [web3, setWeb3] = useState<Web3 | null>(null);

  const [domLoaded, setDomLoaded] = useState(false);

  const initializeWeb3 = async () => {
    try {
      const web3Instance = await getWeb3();
      setWeb3(web3Instance);
    } catch (error) {
      console.error('Error initializing web3:', error);
    }
  };

  useEffect(() => {
    setDomLoaded(true);
    initializeWeb3();
  }, []);
  return (
    <>
      { domLoaded && (<main className={styles.main}>
        <div className="container">
          <h1 className="my-4">My Bootstrap Component</h1>
          <button className="btn btn-primary">Click me</button>
          <h1>Web3.js in Next.js with TypeScript</h1>
          {web3 ? (
            <div>
              <p>Web3 instance is ready!</p>
              
              <p>test: {web3.config.defaultBlock.toString()}</p>
            </div>
          ) : (
            <p>Loading web3...</p>
          )}
        </div>
      </main>)}
    </>
  )
}



/* async componentDidMount() {
  // 1. Carga de Web3
  await this.loadWeb3()
  // 2. Carga de datos de la Blockchain
  await this.loadBlockchainData()
}

// 1. Carga de Web3
async loadWeb3() {
  if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log('Accounts: ', accounts)
  }
  else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
  }
  else {
      window.alert('¡Deberías considerar usar Metamask!')
  }
}

// 2. Carga de datos de la Blockchain
async loadBlockchainData() {
  const web3 = window.web3
  const accounts = await web3.eth.getAccounts()
  this.setState({ account: accounts[0] })
  // Ganache -> 5777, Rinkeby -> 4, BSC -> 97
  const networkId = await web3.eth.net.getId()
  console.log('networkid:', networkId)
  const networkData = smart_contract.networks[networkId]
  console.log('NetworkData:', networkData)

  if (networkData) {
      const abi = smart_contract.abi
      console.log('abi', abi)
      const address = networkData.address
      console.log('address:', address)
      const contract = new web3.eth.Contract(abi, address)
      this.setState({ contract })
  } else {
      window.alert('¡El Smart Contract no se ha desplegado en la red!')
  }
}

constructor(props) {
  super(props)
  this.state = {
      account: '0x0',
      loading: true,
      contract: null,
      errorMessage: ""
  }
}

_generarGanador = async () => {
  try {
      console.log("Generacion del ganador en ejecucion...")
      await this.state.contract.methods.generarGanador().send({
          from: this.state.account
      })
      await this.mostrarAlerta(
          'success',
          '¡Ganador generado correctamente!',
          'Revisa el ganador del sorteo',
      )
  } catch (err) {
      this.setState({ errorMessage: err })
  } finally {
      this.setState({ loading: false })
  }
}

_ganador = async () => {
  try {
      console.log("Visualizacion del ganador en ejecucion...")
      const winner = await this.state.contract.methods.ganador().call()

      if(winner !== '0x0000000000000000000000000000000000000000'){
          await this.mostrarAlerta(
              'info',
              'El ganador de la Lotería es:',
              `${winner}`,
          )
      }else {
          await this.mostrarAlerta(
              'error',
              'Error',
              `El sorteo aun no ha sido realizado`,
          )
      }

  } catch (err) {
      this.setState({ errorMessage: err })
      await this.mostrarAlerta(
          'error',
          'Error',
          'Error, inténtalo de nuevo',
      )
  } finally {
      this.setState({ loading: false })
  }
}

mostrarAlerta = async (icon, title, text) => {
  Swal.fire({
      icon: icon,
      title: title,
      width: 800,
      padding: '3em',
      text: text,
      backdrop: `
      rgba(15, 238, 168, 0.2)
      left top
      no-repeat
    `
  })
} */
