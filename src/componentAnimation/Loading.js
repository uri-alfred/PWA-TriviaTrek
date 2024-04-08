import React, { Component } from "react";
import Lottie from "react-lottie";
import animationData from "../../src/assets/AnikiHamster.json"; // Asegúrate de que la ruta sea correcta

export default class LoadingLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStopped: false,
      isPaused: false
    };
    this.animation = React.createRef();
  }

  componentDidMount() {
    this.animation.current.play();
  }

  render() {
    const defaultOptions = {
      loop: true,
      autoplay: false,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };

    return (
      <div>
        <Lottie
          ref={this.animation}
          options={defaultOptions}
          height={180}
          width="100%"
          isStopped={this.state.isStopped}
          isPaused={this.state.isPaused}
        />
      </div>
    );
  }
}
