import React from 'react'

interface Color {
  purple: string
  purpledark: string
  purplelight: string
  blue: string
  white: string
  black: string
  pink: string
  orange: string
  green: string
  grey: string
  greylight: string
  blacklight: string
  offwhite: string
  warning: string
  error: string
}

interface Spacing {
  xxsmall: number
  xsmall: number
  small: number
  medium: number
  large: number
  xlarge: number
  xxlarge: number
}

interface BorderRadius {
  medium: number
}

interface Breakpoint {
  mobileS: number
  mobileM: number
  tablet: number
}

export interface Theme {
  color: Color
  spacing: Spacing
  borderRadius: BorderRadius
  breakpoint: Breakpoint
}

const theme: Theme = {
  color: {
    purple: '#28144B',
    purpledark: '#190E2C;',
    purplelight: '#9210FF',
    blue: '#5762FD',
    white: '#FCFCFC',
    black: '#1a1919',
    pink: '#A568EF',
    orange: '#FF9191',
    green: '#A5FFC4',
    grey: '#6E7191',
    greylight: '#D9DBE9',
    blacklight: '#222222',
    offwhite: '#F7F7FC',
    warning: '#d8e430',
    error: '#d84040',
  },
  spacing: {
    xxsmall: 4,
    xsmall: 8,
    small: 12,
    medium: 18,
    large: 32,
    xlarge: 40,
    xxlarge: 48,
  },
  borderRadius: {
    medium: 16,
  },
  breakpoint: {
    mobileS: 375,
    mobileM: 425,
    tablet: 768,
  },
}

type ThemeParams = [Theme, boolean, Function]
const ThemeContext = React.createContext<ThemeParams>([theme, false, () => { }])

const ThemeProvider = (props: any) => {
  const [dark, setDark] = React.useState<boolean>(false)

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

export { ThemeContext, ThemeProvider }
