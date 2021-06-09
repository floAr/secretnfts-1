import React from "react";
import cx from "classnames";
import { css } from "@emotion/css";
import { ThemeContext } from "../../contexts/ThemeContext";
import { LanguageContext } from "../../contexts/LanguageContext";
import Button from "../../components/button";
import Text from "../../components/text";
import { SIZE } from "../../components/text";
import Tabs from "../../components/tabs";
import { dictionary } from "../../dictionary"

import gamingIcon from "../../images/other/gaming.jpg";
import artIcon from "../../images/other/art.jpg";
import digitalIcon from "../../images/other/digital.jpg";
import ticketsIcon from "../../images/other/tickets.jpg";


export default function MyTabs() {
    const [language] = React.useContext(LanguageContext);
    const [theme] = React.useContext(ThemeContext);
    const [selectedTab, setTab] = React.useState<number>(0);
    const [selectedInfo, setInfo] = React.useState<number>(0);

    React.useEffect(() => {
        setInfo(0)
    }, [selectedTab]);


    const renderTabSectionInfo = (title: string, info: string, index: number) => {
        const selected = true
        return <div className={cx(css`
                padding: ${theme.spacing.small}px;
                display: flex; 
                flex-direction: column; 

            `)}
        >
            <Text
                size={SIZE.label}
                spacing={"0.04em"}
                gradientOne={selected ? theme.color.orange : theme.color.grey}
                gradientTwo={selected ? theme.color.pink : theme.color.grey}>{title}</Text>
            <Text
                style={css`margin-top: ${theme.spacing.small}px;`}
                size={SIZE.normal}
                lineHeight={"18px"}
                spacing={"0.07em"}

                color={selected ? theme.color.black : theme.color.grey}>{info}
            </Text>
        </div>;
    };

    const renderTab = (sections: Array<any>, image: any) => {
        return <div className={cx(css`display: flex; box-sizing: border-box; width: 100%;justify-content: space-between;`)}>
            <div className={cx(css`
                display: flex; 
                flex-direction: column; 
                width: 30%; 
                min-width: 350px;
                min-height: 474px;
                & > * {
                margin-bottom: ${theme.spacing.large}px;
                }
            `)}>
                {sections.map((section, index) => <div key={index}>
                    {renderTabSectionInfo(section.title, section.text, index)}
                </div>)}
            </div>
            <img className={cx(css`height: 400px; padding-left: ${theme.spacing.large}px;`)} src={image} alt={`${selectedInfo}image`} />
        </div>
    }

    const renderArtTab = () => {
        return renderTab([{
            title: dictionary.PRIVATE_GALLERIES_TITLE[language],
            text: dictionary.PRIVATE_GALLERIES_INFO[language],
        },
        {
            title: dictionary.FINANCIAL_PRIVACY_TITLE[language],
            text: dictionary.FINANCIAL_PRIVACY_INFO[language],
        },
        {
            title: dictionary.SEALED_AUCTIONS_TITLE[language],
            text: dictionary.SEALED_AUCTIONS_INFO[language],
        }], artIcon);
    };

    const renderGameTab = () => {
        return renderTab([{
            title: dictionary.HIDDEN_LOOT_TITLE[language],
            text: dictionary.HIDDEN_LOOT_INFO[language],
        },
        {
            title: dictionary.PLAYABLE_TITLE[language],
            text: dictionary.PLAYABLE_INFO[language],
        },
        {
            title: dictionary.SKILLS_CRAFTING_TITLE[language],
            text: dictionary.SKILLS_CRAFTING_INFO[language],
        }], gamingIcon);
    };

    const renderLifeTab = () => {
        return renderTab([{
            title: dictionary.IDS_TITLE[language],
            text: dictionary.IDS_INFO[language],
        },
        {
            title: dictionary.LUXURY_TITLE[language],
            text: dictionary.LUXURY_INFO[language],
        },
        {
            title: dictionary.TICKETS_TITLE[language],
            text: dictionary.TICKETS_INFO[language],
        }], ticketsIcon);
    };


    const renderDigitalTab = () => {
        return renderTab([{
            title: dictionary.EXCLUSIVE_CONTENT_TITLE[language],
            text: dictionary.EXCLUSIVE_CONTENT_INFO[language],
        },
        {
            title: dictionary.WATERMARKET_TITLE[language],
            text: dictionary.WATERMARKET_INFO[language],
        },
        {
            title: dictionary.ADULT_CONTENT_TITLE[language],
            text: dictionary.ADULT_CONTENT_INFO[language],
        }], digitalIcon);
    };

    return (
        <div className={cx(css`
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          padding: 100px 50px;
          max-width: 1200px;
          box-sizing: border-box;
        `)}
        >
            <span
                className={cx(css`
                height: 3px;
                width: 35px;
                margin-bottom: ${theme.spacing.medium}px;
                background: linear-gradient(
                  to right,
                  ${theme.color.orange},
                  ${theme.color.pink}
                );
              `)}
            ></span>
            <Text
                weight={"500"}
                gradientOne={theme.color.orange}
                gradientTwo={theme.color.pink}
                size={SIZE.section}
                style={css(`margin-bottom: 50px`)}
            >
                {dictionary.WHY_NFT[language]}
            </Text>
            <Tabs
                selectedIndex={selectedTab}
                tabs={[
                    { name: dictionary.ART_COLLECTIBLES_TITLE[language], children: renderArtTab() },
                    { name: dictionary.GAMING_TITLE[language], children: renderGameTab() },
                    { name: dictionary.REAL_LIFE_TITLE[language], children: renderLifeTab() },
                    { name: dictionary.DIGITAL_MEDIA_TITLE[language], children: renderDigitalTab() },
                ]}
                onChange={(index: number) => setTab(index)}
            />

            <Button onClick={() =>
                window.open('https://www.binance.com/en/trade/SCRT_BTC?type=spot', '_blank')
            }>{dictionary.BUY_SCRT[language]}</Button>
        </div>
    );
}
