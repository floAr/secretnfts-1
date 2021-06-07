import React from 'react';

import cx from "classnames";
import { css } from '@emotion/css'
import { Route, withRouter, RouteComponentProps, useHistory } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./containers/home/index";
import Splash from "./containers/splash/index";
import { WalletContext } from "./contexts/WalletContext";
import { ThemeContext } from './contexts/ThemeContext';
import { connect } from "./client";

require('dotenv').config()

function App() {

  const [wallet, setWallet] = React.useContext(WalletContext)
  const [theme] = React.useContext(ThemeContext)
  const [connected, setConnected] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    connect((result: any) => {
      setWallet({ ...wallet, price: result.scrtprice.USD })
      setConnected(true)
    })
  }, []);

  React.useEffect(() => {
    if (wallet.loadingCli) return
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [connected, wallet]);

  return (
    <div className={cx(css`
      background: ${theme.color.white};
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      color: ${theme.color.black};
    `)}>


      {loading && <Splash />}


      <div className={cx(css`
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 2;
          `)}>
        <Header
          links={[
            { text: "Why Secret NFTs", path: "/" },
            { text: "Join Prelisting", path: "/prelisting" },
            { text: "Roadmap", path: "/roadmap" },
          ]}
        />
      </div>


      <div className={cx(css`
          flex: 1;
        `)}>
        <Route exact path={"/"}><Home /></Route>
        <Route exact path={"/prelisting"}><div>prelisting</div></Route>
        <Route exact path={"/roadmap"}><div>roadmap</div></Route>
      </div>


      <Footer />

    </div>
  );
}
export default withRouter(App);
