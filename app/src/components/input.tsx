import React, { ReactElement } from 'react'; // we need this to make JSX compile
import cx from "classnames";
import { css } from '@emotion/css'
import { ThemeContext } from '../contexts/ThemeContext';

type Props = { label?: string, plaveholder?: string; value: any; required?: boolean; disabled?: boolean; onChange: Function; style?: any; note?: string;[x: string]: any, colorPlaceholder?: any, color?: any, bgColor?: any, bgColorFocus?: any }


export default function Input({
  label,
  plaveholder = "",
  required,
  value,
  onChange,
  disabled,
  note,
  style,
  color,
  colorPlaceholder,
  bgColor,
  bgColorFocus,
  ...props
}: Props) {

  const [theme] = React.useContext(ThemeContext)

  return (
    <div className={cx([css`
      display: flex; 
      flex-direction: row; 
      width: 100%; 
      border-bottom: 1px solid ${theme.color.purple};
      background-color:${bgColor || `rgba(0, 0, 0, .1)`};
      align-items: center;
      padding: 5px;

    `, style])}>
      <input
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={plaveholder}
        className={cx([css`
          border: none;
          box-sizing: border-box;
          min-width: 200px;
          height: 40px;
          width: 100%;
          padding: 0px 10px;
          
          border-radius: 3px;
          color: ${color || `white`};
          outline: none;
          transition: 0.5s ease;
          font-family: 'inherit';
          font-size: 24px;
          background-color:${bgColor || `rgba(0, 0, 0, .1)`};
          
          ::placeholder { 
            color: ${colorPlaceholder || theme.color.black};
            opacity: 0.9;
          }
          :focus { 
            background-color:${bgColorFocus || `rgba(0, 0, 0, .4)`};
          }

          ::-webkit-outer-spin-button,
          ::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }

          [type=number] {
            -moz-appearance: textfield;
          }

      `])}
        {...props}
      />
      <div className={cx(css`font-size: 16px; color: ${theme.color.black};`)}>{label}</div>
    </div>)
}

