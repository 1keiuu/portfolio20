import React, { useEffect } from "react";
import * as H from "history";
import { RouteComponentProps, withRouter } from "react-router-dom";
const Fade = require("react-reveal/Fade");

interface Props extends RouteComponentProps<{}> {
  history: H.History;
}
const ContactPage: React.FC<Props> = (props) => {
  const handleWheel = (e: any) => {
    // 縦スクロールイベント
    var current_pos = e.deltaY;
    var start_pos = 0;
    if (current_pos < start_pos) {
      if (start_pos - current_pos > 15) props.history.push("/product");
    }
    start_pos = current_pos;
  };
  useEffect(() => {
    window.addEventListener("wheel", handleWheel);
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <Fade bottom delay={500}>
      <div>Contact</div>
    </Fade>
  );
};
export default withRouter(ContactPage);
