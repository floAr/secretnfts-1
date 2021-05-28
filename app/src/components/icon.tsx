import React from 'react'; // we need this to make JSX compile
import cx from "classnames";
import { css } from '@emotion/css'

type Props = { color: string; icon: string; href: string; blank: boolean }

export default function Icon({
  color,
  icon,
  href,
  blank
}: Props) {
  return <a
    href={href}
    target={blank ? "_blank" : ""}
    className={cx(css`
    border-radius: 100%;
    width: 40px; 
    height: 40px; 
    background-color: rgba(0,0,0,.6); 
    transition: all .2s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
    :hover{
      background-color: ${color}; 
    }
`)}>
    <img src={icon} width="20px" height="20px" alt={href} />
  </a>
}
