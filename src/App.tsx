import { useState, useRef, ComponentPropsWithRef } from "react";
import { Mesh } from 'three'
import { Canvas, useFrame, Vector3 } from "@react-three/fiber";
import { Box, PresentationControls, GizmoViewport, GizmoHelper, Grid } from "@react-three/drei";

// [width, depth]
type Dimension = [number, number]
type Layer = {
  name: string
  dimensions: Dimension
  layer: number
}

const Scene = ({ data }: { data: Layer[] }) => {

  const [activeLayer, setActiveLayer] = useState("layer2");

  const activeRef = useRef<typeof Mesh | null>(null);


  return (
    <>
      {data.map(({ name, dimensions, layer }) => <Layer
        key={name}
        dimensions={dimensions}
        active={activeLayer === name}
        layer={layer}
        onClick={() => { setActiveLayer(name) }}
      />)}

      <ambientLight />
    </>
  );
};

type LayerProps = {
  dimensions: Dimension,
  active: boolean,
  layer: number
} & ComponentPropsWithRef<typeof Box>
const Layer = ({
  dimensions: [x, y],
  active,
  layer,
  ...rest
}: LayerProps) => (
  <Box
    args={[5, 0.1, 5]}
    position={[0, (layer * 5) + 1, 0]}
    
    {...rest}
  >
    <meshNormalMaterial
      transparent={true}
      opacity={active ? 1 : 0.5}
      side={"bothsides"}

    />

  </Box>
)

const App = () => {
  const data: Layer[] = [
    {
      name: 'layer1',
      dimensions: [5, 5],
      layer: 1
    },
    {
      name: 'layer2',
      dimensions: [5, 5],
      layer: 2
    },
  ]
  return (
    <Canvas camera={{ position: [0, 0, 20] }}>
      <PresentationControls
        enabled={true}
        global
        snap={false}
        rotation={[0.7, 0.5, 0]}
        polar={[0, 0.7]}
      >
        <Scene data={data} />

        <Grid cellColor="red" args={[100, 100]} />

      </PresentationControls>

    </Canvas >
  );
};

export default App;
