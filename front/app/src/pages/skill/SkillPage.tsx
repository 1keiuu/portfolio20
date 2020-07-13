import React from "react";
import { ComponentProps, SFC } from "react";
import Graph from "./Graph";

interface Props {
  contributionsPromise: Promise<any>;
}
interface State {}
export default class SkillPage extends React.Component<Props, State> {
  render() {
    return (
      <div className="graph__wrapper">
        <Graph contributionsPromise={this.props.contributionsPromise} />
      </div>
    );
  }
}
