import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import styles from '../Home.module.css'

const Header = () => {
  return (
    <header>
      <div className="top-bar">
        <div className="icon">&#x2194;</div>
        {/* <button className="connect-wallet">connect Wallet</button> */}
        <div className={styles.AppHeader}>
          <WalletMultiButton />
        </div>
      </div>
    </header>
  );
}

export default Header;
