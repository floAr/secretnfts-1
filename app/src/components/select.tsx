import React, { ReactNode } from "react";
import cx from "classnames";
import { css } from '@emotion/css'
import { ThemeContext } from "../contexts/ThemeContext"
import Select, { components } from "react-select";
import Text from "./text"

type Props = {
    loading?: boolean;
    disabled?: boolean;
    style?: any;
    onChange: Function
    options: any[]
    value: any
    label?: string
}


export default function ReactSelect({
    disabled = false,
    onChange = Function,
    options,
    value,
    label
}: Props) {
    const [theme] = React.useContext(ThemeContext)

    const { Option } = components;
    const IconOption = (props: any) => (
        <Option {...props}>
            <div className={cx(css`
                display: flex; 
                flex-direction: row; 
                color: ${theme.color.black};
                align-items: center;
            `)}>
                {props.data.icon && <img
                    className={cx(css`margin-right: 15px; border-radius: 100%;`)}
                    src={props.data.icon}
                    style={{ width: 25 }}
                    alt={props.data.label}
                />}
                <span>{props.data.label}</span>
            </div>

        </Option>
    );

    const customStyles = {
        control: () => ({
            backgroundColor: '#F7F7FC',
            border: `1px solid ${theme.color.greylight}`,
            borderRadius: '16px',
            display: 'flex',
            height: '58px',
            padding: '0 20px'
        }),
        menuList: () => ({
            paddingBottom: '0px',
            paddingTop: '0px',
            maxHeight: '200px',
            overflow: 'auto'
        }),
        menu: () => ({
            marginTop: '5px',
            borderRadius: '5px',
            border: `1px solid ${theme.color.greylight}`,
            backgroundColor: '#F7F7FC',

        }),
        //@ts-ignore
        option: (styles: any, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                minHeight: '50px',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: isFocused || isSelected ? (isSelected ? theme.color.greylight : theme.color.white) : 'inherit',
                ':active': {
                    ...styles[':active'],
                    backgroundColor: theme.color.greylight
                },
            };
        },

    }

    return (
        <div className={cx(css`display: flex; flex-direction: column; width: 100%;`)}>
            <Text color={theme.color.black} weight={400} size={"label"} style={cx(css`margin-bottom: ${theme.spacing.small}px;`)}>{label}</Text>
            <Select
                menuPosition={"absolute"}
                styles={customStyles}
                value={value}
                isDisabled={disabled}
                defaultValue={options[0]}
                options={options}
                onChange={(v) => onChange(v)}
                components={{ Option: IconOption }}
            />
        </div>

    );
}
