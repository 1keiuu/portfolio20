import React, { useEffect, useState } from "react";
import "../styles/loading.scss";
import { CSSTransition } from "react-transition-group";

import { useRef } from "react";
import { Canvas, useFrame } from "react-three-fiber";

interface Props {
  isLoaded: boolean;
}

const Thing = () => {
  const ref = useRef<any>();

  useFrame(({ clock }) => {
    if (ref !== undefined) {
      // ref!.current.position.x += Math.cos(clock.getElapsedTime()) * 3;
      // ref!.current.position.y += Math.sin(clock.getElapsedTime()) * 3;
      ref!.current.position.z += clock.getElapsedTime() * 6;
      // ref!.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry attach="geometry" args={[30, 30, 30]} />
      <meshStandardMaterial attach="material" color="#FFF" />
    </mesh>
  );
};

const Loading: React.FC<Props> = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, [props.isLoaded]);
  return (
    <div className="loading__wrapper">
      <Canvas camera={{ position: [0, 0, 1000] }}>
        <pointLight color="#FFFFFF" intensity={1} position={[0, 1000, 1000]} />
        <Thing />
      </Canvas>
    </div>
    // <CSSTransition in={isLoaded} classNames="loading__wrapper" timeout={0}>
    //   <div className="loading__wrapper">
    //     {/* <img
    //       className="loading"
    //       src="https://1keiu-portfolio20.s3-ap-northeast-1.amazonaws.com/icon_loader_a_ww_01_s1.gif"
    //     ></img> */}
    //     <div className="circle circle1"></div>
    //     <div className="circle circle2"></div>
    //     <div className="circle circle3"></div>
    //     <div className="circle circle4"></div>
    //     <div className="circle circle5"></div>
    //     <div className="circle circle6"></div>

    //     <div className="loading__inner">
    //       <div className="loading"></div>
    //     </div>
    //   </div>
    // </CSSTransition>
  );
};

export default Loading;
