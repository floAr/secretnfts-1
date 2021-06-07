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
}

interface Spacing {
  xxmsall: number
  xsmall: number
  small: number
  medium: number
  large: number
}

interface BorderRadii {
  medium: number
}

interface Theme {
  color: Color
  spacing: Spacing
  borderRadii: BorderRadii
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
  },
  spacing: {
    xxmsall: 4,
    xsmall: 8,
    small: 12,
    medium: 18,
    large: 32,
  },
  borderRadii: {
    medium: 16,
  },
}

type ThemeParams = [Theme, boolean, Function]
const ThemeContext = React.createContext<ThemeParams>([theme, false, () => {}])

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
