import React from 'react';

import cx from "classnames";
import { css } from '@emotion/css'
import { Route, Switch, withRouter } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import NotFound from "./components/notfound";
import Home from "./containers/home/index";
import Marketplace from "./containers/marketplace/index";
import Inventory from "./containers/inventory/index";
import Collection from "./containers/collection/index";
import Asset from "./containers/asset/index";
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
    if (wallet.loadingWallet) return
    setLoading(false)
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
            z-index: 5;
          `)}>
        <Header
          links={[
            { text: "Why Secret NFTs", path: "/#why" },
            { text: "Create a Secret NFT", path: "/#create" },
            { text: "Marketplace", path: "/marketplace" },
          ]}
        />
      </div>


      <div className={cx(css`
          flex: 1;
          margin-top: 70px;
      `)}>
        <Switch>
          <Route exact path={"/"} component={Home} />
          <Route exact path={"/marketplace"} component={Marketplace} />
          <Route exact path={"/inventory/:address"} component={Inventory} />
          <Route exact path={"/collection/:address"} component={Collection} />
          <Route exact path={"/asset/:contract/:token_id"} component={Asset} />
          <Route component={NotFound} />
        </Switch>
      </div>


      <Footer />

    </div>
  );
}
export default withRouter(App);
