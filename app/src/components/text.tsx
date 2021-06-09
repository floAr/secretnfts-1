import React, { ReactNode } from "react";
import cx from "classnames";
import { css } from "@emotion/css";
import { ThemeContext } from "../contexts/ThemeContext";

export enum SIZE {
  note = `12px`,
  normal = `14px`,
  label = `16px`,
  title = `24px`,
  section = `40px`,
  header = `96px`,
}

type Props = {
  size?: SIZE;
  weight?: string | number;
  spacing?: string,
  lineHeight?: string | number,
  color?: string;
  gradientOne?: string;
  gradientTwo?: string;
  style?: any;
  children?: ReactNode;
};

export default function Text({
  size,
  color,
  weight,
  spacing,
  lineHeight,
  gradientOne,
  gradientTwo,
  style,
  children,
  ...props
}: Props) {
  const [theme] = React.useContext(ThemeContext);

  const withGradient = gradientOne || gradientTwo;
  return (
    <div
      className={cx([
        css`
          width: fit-content;
          color: ${color || theme.color.white};
          font-size: ${size || SIZE.normal};
          font-weight: ${weight || 500};
          letter-spacing: ${spacing || `normal`};
          line-height: ${lineHeight || `normal`};
          background: ${withGradient
            ? `linear-gradient(to right, ${gradientOne}, ${gradientTwo})`
            : `transparent`};

          ${withGradient && `-webkit-background-clip: text;`}
          ${withGradient && `-webkit-text-fill-color: transparent;`}
                
                display: inline-block;
        `,
        style,
      ])}
      {...props}
    >
      {children}
    </div>
  );
}
