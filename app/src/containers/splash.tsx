import React from 'react';
import cx from "classnames";
import { css } from '@emotion/css'
import Loader from '../components/loader'
import { ThemeContext } from '../contexts/ThemeContext';

export default function Splash() {
    const [theme] = React.useContext(ThemeContext)

    return (
        <div className={cx(css`
            background: linear-gradient(276.36deg, ${theme.color.orange} -8.84%, ${theme.color.green} 91.81%);
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height:100%;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10;
        `)}>
            <Loader />
        </div>
    )
}

