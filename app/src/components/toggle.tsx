import React, { ReactElement } from 'react'; // we need this to make JSX compile
import cx from "classnames";
import { css } from '@emotion/css'
import { ThemeContext } from '../contexts/ThemeContext';
import Text, { SIZE } from './text'
import "react-toggle/style.css"
import Toggle from 'react-toggle'
import shieldIcon from '../images/icons/shieldfull.svg'

type Props = {
  label?: string,
  value: any;
  disabled?: boolean;
  onChange: Function;
  style?: any;
  color?: any,
  bgColor?: any,
  bgColorAtive?: any,
  activeIcon?: any,
}


export default function MyToggle({
  label,
  value,
  onChange,
  disabled,
  style,
  color,
  bgColor,
  bgColorAtive,
  activeIcon,
}: Props) {

  const [theme] = React.useContext(ThemeContext)


  return (
    <div className={cx([css`
      display: flex; 
      padding: 5px;
      width: fit-content;
      align-items: center;

      .react-toggle .react-toggle-track{
        background-color: ${theme.color.grey}d5;
      }

      .react-toggle-track-check{
        height: 14px;
      }

      .react-toggle--checked .react-toggle-track{
        background-color: ${bgColorAtive || theme.color.orange}d5;
      }

      

      .react-toggle:hover:not(.react-toggle--disabled) .react-toggle-track{
        background-color: ${theme.color.grey};
      }

      .react-toggle--checked:hover:not(.react-toggle--disabled) .react-toggle-track{
        background-color: ${bgColorAtive || theme.color.orange};
      }

      .react-toggle--checked .react-toggle-thumb {
        border-color: ${theme.color.orange};
      }

      .react-toggle--focus .react-toggle-thumb {
        box-shadow: none;
      }

    `, style])}>


      <Toggle
        defaultChecked={value}
        aria-label='No label tag'
        className='custom-classname'
        icons={{
          checked: <img src={activeIcon || shieldIcon} height={14} />,
        }}
        onChange={(e: any) => onChange(e)}
      />

      {label &&
        <Text
          color={theme.color.black}
          weight={500} size={SIZE.normal}
          style={cx(css`margin-left: ${theme.spacing.small}px; margin-top: 2px;`)}>{label}
        </Text>}
    </div>)
}

