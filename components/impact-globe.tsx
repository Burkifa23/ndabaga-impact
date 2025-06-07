"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, Sphere, OrbitControls } from "@react-three/drei"
import type { Group } from "three"

// Text positioned around the sphere
function ImpactText({ position, children, fontSize = 0.2, color = "white" }) {
  const textRef = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (textRef.current) {
      // Make text always face the camera
      textRef.current.lookAt(0, 0, 5)
    }
  })

  return (
    <group position={position} ref={textRef}>
      <Text
        fontSize={fontSize}
        color={color}
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
        textAlign="center"
        font="/fonts/Inter_Bold.json"
      >
        {children}
      </Text>
    </group>
  )
}

// Rotating sphere with impact statistics
function ImpactSphere() {
  const sphereRef = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (sphereRef.current) {
      // Continuous rotation
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.15
    }
  })

  return (
    <group ref={sphereRef}>
      {/* Semi-transparent sphere */}
      <Sphere args={[2, 64, 64]}>
        <meshPhongMaterial color="#000000" transparent opacity={0.7} wireframe />
      </Sphere>

      {/* Main statistic */}
      <ImpactText position={[0, 0, 2.2]} fontSize={0.4}>
        500+{"\n"}Youth Trained
      </ImpactText>

      {/* Other statistics positioned around the sphere */}
      <ImpactText position={[2.2, 0, 0]}>50+{"\n"}Communities</ImpactText>

      <ImpactText position={[-2.2, 0, 0]}>25+{"\n"}Projects</ImpactText>

      <ImpactText position={[0, 2.2, 0]}>7{"\n"}Key Pillars</ImpactText>

      <ImpactText position={[0, -2.2, 0]}>Impact{"\n"}Since 2020</ImpactText>

      <ImpactText position={[1.5, 1.5, 1.5]}>Digital{"\n"}Skills</ImpactText>

      <ImpactText position={[-1.5, 1.5, -1.5]}>Youth{"\n"}Leadership</ImpactText>
    </group>
  )
}

export default function ImpactGlobe() {
  const [mounted, setMounted] = useState(false)

  // Prevent hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="aspect-square w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <ImpactSphere />
        <OrbitControls enableZoom={false} autoRotate={false} />
      </Canvas>
    </div>
  )
}
