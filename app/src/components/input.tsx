import React, { ReactElement } from 'react'; // we need this to make JSX compile
import cx from "classnames";
import { css } from '@emotion/css'
import { ThemeContext } from '../contexts/ThemeContext';
import Text, { SIZE } from './text'

type Props = { label?: string, placeholder?: string; value: any; required?: boolean; disabled?: boolean; onChange: Function; style?: any; note?: string;[x: string]: any, colorPlaceholder?: any, color?: any, bgColor?: any, bgColorFocus?: any, transform?: string }


export default function Input({
  label,
  placeholder = "",
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
  transform,
  ...props
}: Props) {

  const [theme] = React.useContext(ThemeContext)

  return (
    <div className={cx([css`
      display: flex; 
      flex-direction: column; 
      width: 100%; 

    `, style])}>
      {label && <Text color={theme.color.black} weight={400} size={"label"} style={cx(css`margin-bottom: ${theme.spacing.small}px;`)}>{label}</Text>}

      <input
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        className={cx([css`
          box-sizing: border-box;
          min-width: 200px;
          height: 40px;
          width: 100%;
          padding: 0 20px;
          text-transform: ${transform || 'none'};
          color: ${color || theme.color.black};
          outline: none;
          transition: 0.5s ease;
          font-family: 'Graphik';
          font-size: 16px;
          height: 60px;
          background-color: ${bgColor || `#F7F7FC`}; 
          border: 1px solid ${theme.color.greylight}; 
          border-radius: 16px;
          :disabled{
            opacity: .6; 
          }
          ::placeholder { 
            color: ${colorPlaceholder || theme.color.black};
            opacity: 0.6;
          }
          :focus { 
            background-color:${bgColorFocus || `rgba(0, 0, 0, .05)`};
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
    </div>)
}

