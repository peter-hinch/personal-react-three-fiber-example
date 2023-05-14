import React, { useRef } from 'react';

const BodyStyleSquarebackParts: React.FC<{
  nodes;
  materials;
  settings: Settings;
}> = ({ nodes, materials, settings }) => {
  const bodyStyleSquareParts = useRef();

  return (
    <group ref={bodyStyleSquareParts} dispose={null}>
      <mesh
        geometry={nodes.roof_skin_square.geometry}
        material={materials.paint}
      />
      <mesh
        geometry={nodes.rear_windows_square.geometry}
        material={materials.paint}
      />
      <mesh geometry={nodes.boot_square.geometry} material={materials.paint} />
    </group>
  );
};

export default BodyStyleSquarebackParts;