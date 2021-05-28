import cx from "classnames";
import { css } from '@emotion/css'
import logoIcon from "../images/icons/logo.svg"

export default function Loader({ rotateSpeed = 0.8, rotateAnimation = "ease-in-out", size = 50 }) {
    return (
        <div className={cx(css`
        width: ${size};
        height: ${size};
                animation: rotation ${rotateSpeed}s infinite ${rotateAnimation};
                @keyframes rotation {from {transform: rotate(0deg);}to {transform: rotate(359deg);}}
        `)}>
            {<img src={logoIcon} />}
        </div>

    );
}
