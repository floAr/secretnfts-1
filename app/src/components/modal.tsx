import React, { ReactNode } from 'react'; // we need this to make JSX compile
import cx from "classnames";
import { css } from '@emotion/css'
import Modal from "react-modal";
import closeIcon from '../images/icons/close.svg'
import Text, { SIZE } from './text'
import { ThemeContext } from '../contexts/ThemeContext';

type Props = { isOpen: boolean; onClose: Function; label?: string; title: string, children: ReactNode }

export default function ReactModal({
  isOpen,
  onClose,
  label = "Modal",
  title,
  children
}: Props) {

  const [theme] = React.useContext(ThemeContext)
  const isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;

  return <Modal
    isOpen={isOpen}
    onRequestClose={() => onClose()}
    shouldCloseOnEsc={true}
    shouldCloseOnOverlayClick={true}
    contentLabel={label}
    ariaHideApp={false}
    //@ts-ignore
    style={{
      overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        zIndex: 12,
        overflowY: "auto",
      },
      content: {
        backgroundImage: "linear-gradient(to top right, #242222, #151414 )",
        border: "none",
        padding: "0px",
        inset: 0,
        margin: "100px auto",
        overflow: "inherit",
        width: "min-content",
        height: "min-content",
        display: isFirefox ? "inline-table" : "flex",
      }
    }}
  >
    <div className={cx(css`
        display: flex;
        flex-direction: column;
        background-color:${theme.color.white};
        min-width: 350px;
        padding: 30px;
    `)}>
      <div className={cx(css`
        display: flex; 
        justify-content:space-between;
        align-items: center;
        color: #252525;
        font-size: 22px;
        margin-bottom: 30px;
      `)}>
        <Text gradientOne={theme.color.orange} gradientTwo={theme.color.pink} weight={600} size={"title"}>{title}</Text>
        <img className={cx(css`cursor: pointer;`)} width={15} alt="close modal" src={closeIcon} onClick={() => onClose()} />
      </div>
      {children}
    </div>
  </Modal>
}

