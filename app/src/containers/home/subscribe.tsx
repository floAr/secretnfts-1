import { css } from '@emotion/css'
import cx from 'classnames'
import { memo, useContext, useState } from 'react'

import Button from '../../components/button'
import Input from '../../components/input'
import { ThemeContext } from '../../contexts/ThemeContext'

const Subscribe = () => {
  const [theme] = useContext(ThemeContext)
  const [email, setEmail] = useState('')

  const onClickSubscribe = () => {}

  return (
    <div
      className={cx(css`
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        padding: 100px 50px;
        max-width: 1200px;
        position: relative;

        @media only screen and (max-width: ${theme.breakpoint.tablet}px) {
          padding: 100px 20px;
        }

        @media only screen and (max-width: ${theme.breakpoint.mobileM}px) {
          padding: 100px 10px;
        }
      `)}
    >
      <h1
        className={cx(css`
          color: ${theme.color.black};
          font-size: 36px;
          font-weight: 500;
          margin: 0;

          @media only screen and (max-width: ${theme.breakpoint.tablet}px) {
            font-size: 30px;
          }

          @media only screen and (max-width: ${theme.breakpoint.mobileM}px) {
            font-size: 24px;
          }
        `)}
      >
        Find out more 🎉
      </h1>
      <p
        className={cx(css`
          color: ${theme.color.black};
          font-size: 16px;
          max-width: 400px;
          margin: ${theme.spacing.medium}px 0;
          text-align: center;
          width: 90%;

          @media only screen and (max-width: ${theme.breakpoint.tablet}px) {
            font-size: 14px;
          }

          @media only screen and (max-width: ${theme.breakpoint.mobileM}px) {
            font-size: 12px;
          }
        `)}
      >
        Subscribe to the newsletter to hear about Secret NFTs updates and
        events.
      </p>
      <Input
        placeholder="Email"
        value={email}
        onChange={setEmail}
        style={css`
          max-width: 450px;
          width: 95%;
        `}
      />
      <Button
        onClick={onClickSubscribe}
        style={css`
          margin-top: ${theme.spacing.medium}px;
        `}
      >
        Discover SNFTs
      </Button>
    </div>
  )
}
export default memo(Subscribe)
