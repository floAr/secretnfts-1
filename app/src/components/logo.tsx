import React from 'react'; // we need this to make JSX compile
import cx from "classnames";
import { css } from '@emotion/css'
import { ThemeContext } from '../contexts/ThemeContext';
import logoIcon from '../images/icons/logo.svg';
import logoWhiteIcon from '../images/icons/logo_white.svg';

type Props = { width?: number, white?: boolean }

export default function Logo({ width, white }: Props) {

  const [theme] = React.useContext(ThemeContext)


  return <div className={cx(css`display: flex; font-size: 22px;`)}>
    <img src={white ? logoWhiteIcon : logoIcon} width={width || 40} />
  </div>
}



