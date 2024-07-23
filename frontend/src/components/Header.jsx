import React from 'react';
// import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
// import styles from '../Home.module.css'
import logo from '../assets/Logo_nobg.png';

const Header = () => {
  return (
    <header>
      <div className="top-bar">
        {/* <div className="icon">&#x2194;</div> */}
        <div><img src={logo} style={{ width: '30%', height: '30%', margin: '4%' }}></img></div>
        <button className="connect-wallet">connect Wallet</button>
        {/* <div className={styles.AppHeader}>
          <WalletMultiButton />
        </div> */}
      </div>
    </header>
  );
}

export default Header;
