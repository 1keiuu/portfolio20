import React from "react";
import Graph from "./Graph";

interface Props {}
interface State {}
export default class SkillPage extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  render() {
    return <Graph />;
  }
}
