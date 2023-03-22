import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = () => {
  const DEFAULT_SCREEN_WIDTH = window !== undefined ? window.innerWidth : 0;

  const [screenWidth, setScreenWidth] = useState(DEFAULT_SCREEN_WIDTH);
  const [scale, setScale] = useState(0.75);
  const [ position, setPosition ] = useState([0, -3.25, -1.5]);
  
  const computer = useGLTF("./desktop_pc/scene.gltf");

  const getScreenWidth = () => {
    if (window.innerWidth !== screenWidth) {
      setScreenWidth(window.innerWidth);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", getScreenWidth);

    return () => {
      window.removeEventListener("resize", getScreenWidth);
    };
  }, []);

  useEffect(() => {
    if (screenWidth < 475) {
      setScale(0.2);
      setPosition([0, -.2, -.5]);
    } else if (screenWidth < 600) {
      setPosition([0, -1, -.5]);
    } else if (screenWidth < 700) {
      setScale(0.3);
      setPosition([0, -1.7, -.75]);
    } else if (screenWidth < 850) {
      setScale(0.3);
      setPosition([0, -1.2, -.75]);
    } else if (screenWidth < 1000) {
      setScale(0.4);
      setPosition([0, -1, -.75]);
    } else if (screenWidth < 1200) {
      setScale(0.5);
      setPosition([0, -1.5, -1]);
    } else if (screenWidth < 1300) {
      setScale(0.6);
      setPosition([0, -2, -1]);
    } else if (screenWidth < 1440) {
      setScale(0.7);
      setPosition([0, -3, -1.25]);
    } 
  }, [screenWidth]);

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="Black" />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={scale}
        position={position}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 600px)");

    setISMobile(mediaQuery.matches);

    const handleMediaQueryChange = (e) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};
export default ComputersCanvas;
