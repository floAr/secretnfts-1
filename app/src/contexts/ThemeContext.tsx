import React from 'react';

interface Color {
    purple: string,
    purpledark: string;
    purplelight: string,
    blue: string,
    white: string,
    black: string,
    pink: string,
    orange: string,
    green: string
    grey: string;
};

interface Spacing {
    xxmsall: number,
    xsmall: number,
    small: number,
    medium: number,
    large: number
};


interface Theme {
    color: Color,
    spacing: Spacing,
};

const theme: Theme = {
    color: {
        purple: "#28144B",
        purpledark: "#190E2C;",
        purplelight: "#9210FF",
        blue: "#5762FD",
        white: "#FCFCFC",
        black: "#1a1919",
        pink: "#A568EF",
        orange: "#FF9191",
        green: "#A5FFC4",
        grey: "#6E7191"
    },
    spacing: {
        xxmsall: 4,
        xsmall: 8,
        small: 12,
        medium: 18,
        large: 32
    },
};


type ThemeParams = [Theme, boolean, Function];
const ThemeContext = React.createContext<ThemeParams>([theme, false, () => { }]);


const ThemeProvider = (props: any) => {
    const [dark, setDark] = React.useState<boolean>(false);

    React.useEffect(() => {
        const isDark = localStorage.getItem('dark') === 'true'
        setDark(isDark)
    }, [dark])

    const toggle = () => {
        const isDark = !dark
        localStorage.setItem('dark', JSON.stringify(isDark))
        setDark(isDark)
    }

    return (
        <ThemeContext.Provider value={[theme, dark, toggle]}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export { ThemeContext, ThemeProvider };


