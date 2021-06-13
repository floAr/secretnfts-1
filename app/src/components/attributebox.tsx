import React, { ReactNode } from 'react';
import cx from "classnames";
import { css } from '@emotion/css'
import { ThemeContext } from '../contexts/ThemeContext';
import Text from "./text";

interface Props {
    icon: any,
    title: string,
    children: ReactNode,
    [x: string]: any
}
export default function MyBox({ icon, title, children, ...props }: Props) {
    const [theme] = React.useContext(ThemeContext)

    return (
        <div className={cx(css`display: flex; flex-direction: column;`)} {...props}>
            <div className={cx(css`
                display: flex; 
                align-items: center; 
                padding: 15px;
                border-radius: 5px 5px 0 0;
                border: 1px solid ${theme.color.greylight};
                overflow: hidden;
            `)}>
                <img src={icon} width={30} className={cx(css`margin-right: ${theme.spacing.small}px;`)} />
                <Text color={theme.color.black} size="normal">{title}</Text>
            </div>
            <div className={cx(css`
                display: flex; 
                align-items: center; 
                border-radius:  0 0 5px 5px;
                padding: 10px 15px;
                border: 1px solid ${theme.color.greylight};
                border-top: none;
                background-color: ${theme.color.offwhite};
                min-height: 60px;
            `)}>
                {children}
            </div>
        </div>
    )
}

