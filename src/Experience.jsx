import {
  Center,
  OrbitControls,
  Text3D,
  useMatcapTexture,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32);
const material = new THREE.MeshMatcapMaterial();

export default function Experience() {
  const donutGroup = useRef();
  const [matcapTexture] = useMatcapTexture("7B5254_E9DCC7_B19986_C8AC91", 256);

  const tempArray = [...Array(100)];

  useEffect(() => {
    matcapTexture.encoding = THREE.sRGBEncoding;
    matcapTexture.needsUpdate = THREE.sRGBEncoding;
    material.matcap = matcapTexture;
    material.needsUpdate = true;
  }, []);

  useFrame((state, delta) => {
    for (const donut of donutGroup.current.children) {
      donut.rotation.y += 0.1;
    }
  });

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <Center>
        <Text3D
          font="./fonts/helvetiker_regular.typeface.json"
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          dilhancodes.dev
          <meshMatcapMaterial matcap={matcapTexture} />
        </Text3D>
      </Center>

      <group ref={donutGroup}>
        {[...Array(100)].map((value, index) => (
          <mesh
            key={index}
            material={material}
            geometry={torusGeometry}
            position={[
              (Math.random() - 0.5) *
                (Math.random() - 0.5) *
                (Math.random() - 0.5) *
                0,
            ]}
            scale={0.2 + Math.random() * 0.2}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
          />
        ))}
      </group>
    </>
  );
}
