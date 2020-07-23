import React from "react";
import Graph from "./Graph";
import "../../styles/SkillPage.scss";
import { CSSTransition } from "react-transition-group";
const Fade = require("react-reveal/Fade");

interface Props {
  contributionsPromise: Promise<any>;
}
interface State {
  isGraphOpen: boolean;
}
const GraphBg = (props: any) => {
  if (props.is) {
    return <div className="graph__back-ground">{props.children}</div>;
  } else {
    return <div></div>;
  }
};
export default class SkillPage extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      isGraphOpen: true,
    };
  }
  render() {
    return (
      <div>
        <CSSTransition
          in={this.state.isGraphOpen}
          classNames="graph__back-ground"
          timeout={0}
        >
          <GraphBg is={true}>
            <Fade bottom>
              <div className="graph__wrapper">
                <Graph contributionsPromise={this.props.contributionsPromise} />
              </div>
              <div
                className="close__button"
                onClick={() => {
                  this.setState({ isGraphOpen: false });
                }}
              >
                Close
              </div>
            </Fade>
          </GraphBg>
        </CSSTransition>
        <div
          className="github__button"
          onClick={() => {
            this.setState({ isGraphOpen: true });
          }}
        ></div>
      </div>
    );
  }
}
