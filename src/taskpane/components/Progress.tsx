import * as React from "react";
import { Spinner, SpinnerSize } from "@fluentui/react";

export interface Props {
  logo: string;
  message: string;
  title: string;
}

const Progress: React.FC<Props> = ({ logo, message, title }) => {
  return (
    <section className="ms-welcome__progress ms-u-fadeIn500">
      <img width="90" height="90" src={logo} alt={title} title={title} />
      <h1 className="ms-fontSize-su ms-fontWeight-light ms-fontColor-neutralPrimary">{title}</h1>
      <Spinner size={SpinnerSize.large} label={message} />
    </section>
  );
};

export default Progress;
