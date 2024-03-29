// Based on the example provided in the react-three fiber documentation.
// Reference: https://docs.pmnd.rs/react-three-fiber/getting-started/examples
// Reference: https://codesandbox.io/s/q48jgy
// Reference: https://codesandbox.io/s/9b56t

import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  PresentationControls,
  Stage,
  MeshReflectorMaterial
} from '@react-three/drei';

// @ts-ignore
import Car from './Car.tsx';
// @ts-ignore
import Controls from './ui/Controls.tsx';
import { vehicleData } from './data/vehicleData.js';

const App: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    bodyStyle: vehicleData.bodyStyles[0],
    paintColour: vehicleData.paintColours[0],
    wheel: vehicleData.wheels[0],
    rideHeight: 0
  });

  const handleSettings = (
    key: keyof Settings,
    value:
      | Settings['bodyStyle']
      | Settings['paintColour']
      | Settings['wheel']
      | Settings['rideHeight']
  ) => {
    let newSetting = value;
    if (key !== 'rideHeight') {
      newSetting = vehicleData[`${key}s`].find(
        (setting) => value === setting?.id
      );
    }
    setSettings((prevState) => ({
      ...prevState,
      [key]: newSetting
    }));
  };

  return (
    <>
      <Controls settings={settings} handleSettings={handleSettings} />
      <Canvas dpr={[1, 2]} shadows camera={{ fov: 45 }}>
        <color attach="background" args={['#101010']} />
        <fog attach="fog" args={['#101010', 10, 20]} />
        <Suspense fallback={null}>
          <PresentationControls
            speed={1.5}
            global
            zoom={0.7}
            polar={[-0.1, Math.PI / 4]}
          >
            <Stage>
              <Car
                settings={settings}
                position={[0, 0, 0]}
                scale={1}
                rotation-y={-Math.PI / 4}
              />
            </Stage>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.72, 0]}>
              <planeGeometry args={[170, 170]} />
              <MeshReflectorMaterial
                blur={[300, 100]}
                mirror={0.5}
                resolution={2048}
                mixBlur={1}
                mixStrength={40}
                roughness={1}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#101010"
                metalness={0.5}
              />
            </mesh>
          </PresentationControls>
        </Suspense>
      </Canvas>
    </>
  );
};

export default App;
