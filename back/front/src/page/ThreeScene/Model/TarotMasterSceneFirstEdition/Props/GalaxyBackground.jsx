import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'
export default function GalaxyBackground() {
  const ref = useRef()
  const stars = random.inSphere(new Float32Array(5000), { radius: 100 })
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10
    ref.current.rotation.y -= delta / 15
  })
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={stars} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.2}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  )
}
