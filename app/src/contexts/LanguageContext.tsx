import React from 'react';
import { dictionary } from "../dictionary"


type LanguageParams = [any, Function];
const LanguageContext = React.createContext<LanguageParams>(["", () => { }]);


const LanguageProvider = (props: any) => {
    const [language, setLanguage] = React.useState<string>(localStorage.getItem('language') || "en");

    const changeLanguage = (ln: string) => {
        localStorage.setItem('language', JSON.stringify(ln))
        setLanguage(ln)
    }


    return (
        <LanguageContext.Provider value={[language, changeLanguage]}>
            {props.children}
        </LanguageContext.Provider>
    )
}

export { LanguageContext, LanguageProvider };


