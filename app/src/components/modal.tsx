import React, { ReactNode } from 'react'; // we need this to make JSX compile
import cx from "classnames";
import { css } from '@emotion/css'
import Modal from "react-modal";
import closeIcon from '../images/icons/close.svg'
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

  return <Modal
    isOpen={isOpen}
    onRequestClose={() => onClose()}
    shouldCloseOnEsc={true}
    shouldCloseOnOverlayClick={true}
    contentLabel={label}
    ariaHideApp={false}
    //@ts-ignore
    style={theme.modal}
  >
    <div className={cx(css`
        display: flex;
        flex-direction: column;
        background-color: #ebebeb;
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
        <span>{title}</span>
        <img className={cx(css`cursor: pointer;`)} width={10} alt="close modal" src={closeIcon} onClick={() => onClose()} />
      </div>
      {children}
    </div>
  </Modal>
}

