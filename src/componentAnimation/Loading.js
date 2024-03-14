import React from "react";
import Lottie from "react-lottie";
import animationData from "../../../../assets/Animations/LoadingLogin.json";

export default class LoadingLogin extends Component {
  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };

    return <Lottie options={defaultOptions} height={180} width="100%" />;
  }
}