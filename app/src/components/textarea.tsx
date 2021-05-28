import React from 'react'; // we need this to make JSX compile
import cx from "classnames";
import { css } from '@emotion/css'
import { ThemeContext } from '../contexts/ThemeContext';

type Props = { label: string; value: any; required?: boolean; disabled?: boolean; onChange: Function; style?: any; note?: string;[x: string]: any, colorPlaceholder?: any, color?: any, bgColor?: any, bgColorFocus?: any, resize?: boolean }


export default function Textarea({
  label,
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
  resize,
  ...props
}: Props) {
  const [theme] = React.useContext(ThemeContext)


  return (
    <div className={cx(css`display: flex; flex-direction: column; width: 100%;`)}>
      <textarea
        required={required}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        disabled={disabled}
        placeholder={label}
        className={cx([css`
          border: 1px solid ${theme.color.purple};
          box-sizing: border-box;
          min-width: 200px;
          min-height: 100px;
          padding: 10px;
          background-color:${bgColor || `rgba(0, 0, 0, .1)`};
          border-radius: 3px;
          color: ${color || `white`};
          outline: none;
          resize: ${resize ? 'resize' : 'none'};
          transition: 0.5s ease;
          font-family: 'Poppins';
          ::placeholder { 
            color: ${colorPlaceholder || theme.color.black};
            opacity: 0.9;
          }
          :focus { 
            border: 1px solid ${theme.color.pink};
            background-color:${bgColorFocus || `rgba(0, 0, 0, .2)`};
          }
      `, style])}
        {...props}
      />

    </div>)
}

