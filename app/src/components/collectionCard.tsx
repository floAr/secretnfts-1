import React from 'react'; // we need this to make JSX compile
import cx from "classnames";
import { css } from '@emotion/css'
import Text from "./text"
import { ThemeContext } from '../contexts/ThemeContext';
import { COLLECTION } from '../constants';
import collectionIcon from "../images/icons/collection.svg"
import ContentLoader from 'react-content-loader'
type CollectionCardProps = { collection: COLLECTION, loader?: boolean }

function CollectionCard({
    collection,
    loader
}: CollectionCardProps) {
    const [theme] = React.useContext(ThemeContext)

    const renderLoader = () => {
        return (
            <ContentLoader>
                <rect x="0" y="0" rx="5" ry="5" width="130" height="100" />
                <rect x="0" y="114" rx="3" ry="3" width="120" height="5" />
                <rect x="0" y="105" rx="3" ry="3" width="120" height="5" />
                <rect x="0" y="123" rx="3" ry="3" width="100" height="5" />
            </ContentLoader>
        )
    }

    if (loader) return renderLoader()

    return (
        <div className={cx(css`
            display: flex; 
            border: 1px solid ${theme.color.greylight}; 
            padding: 13px 20px;
            transition: background-color .5s;
            box-sizing: border-box;
            &:hover {
                cursor: pointer;
                background-color: ${theme.color.greylight};
            }
        `)}>
            <img src={collectionIcon} width={40} />
            <div className={cx(css`display: flex; flex-direction: column; margin-left: ${theme.spacing.medium}px;`)}>
                <div className={cx(css`display: flex;`)}>
                    <Text
                        size={"label"}
                        gradientOne={theme.color.pink}
                        gradientTwo={theme.color.orange}
                    >
                        {`$${collection.symbol} `}
                    </Text>

                    <Text
                        style={css`margin-left: ${theme.spacing.xxsmall}px;`}
                        weight={400}
                        size={"label"}
                        color={theme.color.black}
                    >
                        {` ${collection.name}`}
                    </Text>
                </div>

                <div className={cx(css`display: flex; margin-top: ${theme.spacing.xxsmall}px;`)}>

                    <Text
                        weight={400}
                        size={"normal"}
                        color={theme.color.grey}
                    >
                        {collection.nfts.length} NFTs
                    </Text>


                </div>
            </div>

        </div>
    )
}

export default React.memo(CollectionCard)


