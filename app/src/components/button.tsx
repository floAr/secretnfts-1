import React, { ReactNode } from "react";
import cx from "classnames";
import { css } from '@emotion/css'
import { ThemeContext } from '../contexts/ThemeContext';


type Props = {
    loading?: boolean;
    disabled?: boolean;
    style?: any;
    color?: string;
    bgcolor?: string;
    border?: string;
    children?: ReactNode;
    full?: boolean;
    onClick: Function
}

export default function Button({
    loading = false,
    disabled = false,
    style = null,
    color,
    bgcolor,
    full = true,
    border = "none",
    onClick = function () { },
    children,

    ...props
}: Props) {
    const [theme] = React.useContext(ThemeContext)

    return (
        <button
            disabled={disabled || loading}
            className={cx([
                css`
                box-sizing: border-box;
                color: ${theme.color.white || color};
                font-size: 16px;
                letter-spacing: 1px;
                text-decoration: none;
                cursor: pointer;
                width: fit-content;
                transition: all 150ms;
                outline: none;
                text-align: center;
                padding: 15px 25px;
                font-weight: 600;
                min-height: 40px;
                min-width: 160px;
                background: linear-gradient(276.36deg, ${theme.color.blue} -8.84%, ${theme.color.purplelight} 91.81%);
                background-clip: ${full ? `none` : `text`};
                -webkit-background-clip: ${full ? `none` : `text`};
                -moz-background-clip: ${full ? `none` : `text`};
                -moz-text-fill-color: ${full ? `inherit` : `transparent`};
                -webkit-text-fill-color: ${full ? `inherit` : `transparent`};
                display: inline-block;

                border-radius: 32px;
                border: ${full ? `none` : `1px solid ${theme.color.purplelight}`};
                `,
                style,
                (disabled || loading) && css`
                    cursor: not-allowed; 
                    border-color:transparent;
                    color: #acabab;
                `,
            ])}
            onClick={() => onClick()}
            {...props}
        >
            {children}
        </button>
    );
}
