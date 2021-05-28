import React from 'react'; // we need this to make JSX compile
import cx from "classnames";
import { css } from '@emotion/css'
import { truncateAddressString } from '../utils'
import { CreateNotification } from "../contexts/HeaderContext";

type Props = { address: string; charactersNumber?: number; toCopy?: boolean }

export default function Address({
  address,
  charactersNumber = 7,
  toCopy = true
}: Props) {


  return <div
    className={cx(css`cursor: ${toCopy ? 'pointer' : 'default'};`)}
    onClick={() => {
      if (!toCopy) return
      navigator.clipboard.writeText(address)
      CreateNotification('Copied!', '')
    }}
  >
    {truncateAddressString(address, charactersNumber)}
  </div>
}

