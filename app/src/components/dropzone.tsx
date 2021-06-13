import React, { ReactNode } from 'react'; // we need this to make JSX compile
import cx from "classnames";
import { css } from '@emotion/css'
import { ThemeContext } from '../contexts/ThemeContext';
import { useDropzone } from "react-dropzone";
import Text from "../components/text";
import { SIZE } from "../components/text";

import uploadIcon from "../images/icons/upload.svg";

type Props = { file: any, onChange?: Function, message?: string, note?: string, style?: any }

export default function Dropzone({ file, onChange = () => { }, message, note, style }: Props) {

  const [theme] = React.useContext(ThemeContext)


  const onDrop = (acceptedFile: Array<any>) => {
    const file = acceptedFile[0];
    if (!file) return
    Object.assign(file, {
      preview: URL.createObjectURL(file),
    });
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      //@ts-ignore
      const buffer = await Buffer.from(reader.result);

      onChange({ file, buffer })
    };
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: 'image/jpg, image/jpeg, image/png, image/gif'
  });
  return <div className={cx([css`
    width: 100%;     
    background-color: ${file ? theme.color.greylight : `#F7F7FC`};
    border: 1px solid ${theme.color.greylight}; 
    border-radius: 16px;
    overflow: hidden;
  `, style])}>
    <div
      {...getRootProps()}
      className={cx(css`
        width: 100%;
        height: 100%;
        cursor: pointer;
    `)}>
      <input {...getInputProps()} accept="image/*" />
      {!file ? (
        <div className={cx(css`
          display: flex;
          align-items: center;
          flex-direction: column;
        `)}>
          <div className={cx(css`
            display: flex;
            align-items: center;
            flex-direction: column;
            padding: 30px;
            opacity: .5;
          `)}>
            <img src={uploadIcon} width={150} />
            <Text lineHeight={"30px"} style={css`text-align:center;`} size={"title"} color={theme.color.grey}>{message}</Text>
            <Text weight={"400"} style={css`margin-top: ${theme.spacing.medium}px;`} size={"label"} color={theme.color.grey}>{note}</Text>
          </div>
        </div>
      ) : (
        <div className={cx(css`
            height: 100%;
            width: 100%;
            background: url(${file.preview}) no-repeat center center; 
            -webkit-background-size: contain;
            -moz-background-size: contain;
            -o-background-size: contain;
            background-size: contain;
      `)}>

        </div>

      )}
    </div>
  </div>
}



