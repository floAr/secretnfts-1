import React from 'react'
import cx from "classnames";
import { css } from '@emotion/css'
import { ThemeContext } from '../contexts/ThemeContext';
type Props = { size?: number, color?: string; checked: boolean; onClick?: Function }


export default function Checkmark({
  size = 30,
  color,
  checked,
  onClick = () => { }
}: Props) {
  const [theme] = React.useContext(ThemeContext)

  return <div onClick={() => onClick()} className={cx(css`
    width: ${size}px; 
    height: ${size}px; 
    border-radius: 100%;
    border: 3px solid ${color || theme.color.purple};
    cursor: pointer;
    display: flex; 
    align-items: center;
    justify-content: center;
    padding: 5px;
    box-sizing: border-box;
  `)}>

    {checked && <div className={cx(css`background-color: ${color};  border-radius: 100%; flex: 1; height: 100%;`)}></div>}
  </div>
}



