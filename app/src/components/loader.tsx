import cx from "classnames";
import { css } from '@emotion/css'
import logoIcon from "../images/icons/logo.svg"
import logowhiteIcon from "../images/icons/logo_white.svg"

interface LOADER {
    rotateSpeed?: number,
    rotateAnimation?: string,
    size?: number,
    white?: boolean

}

export default function Loader({ rotateSpeed = 0.8, rotateAnimation = "ease-in-out", size = 50, white = false }) {
    return (
        <div className={cx(css`
        width: ${size}px;
        height: ${size}px;
                animation: rotation ${rotateSpeed}s infinite ${rotateAnimation};
                @keyframes rotation {from {transform: rotate(0deg);}to {transform: rotate(359deg);}}
        `)}>
            {<img src={white ? logowhiteIcon : logoIcon} width={'100%'} />}
        </div>

    );
}
