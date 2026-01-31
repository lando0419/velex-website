# Section 07: Hero - 3D Integration

## Overview
**Phase**: Core
**Est. Lines**: 800-1000
**Day**: 5
**DEPENDENCY**: Blender hero renders needed

---

## Deliverables

- [ ] Three.js canvas setup
- [ ] React Three Fiber integration
- [ ] Blender model loader (GLTF)
- [ ] Stress visualization shader
- [ ] Model rotation animation
- [ ] Cursor interaction (parallax)
- [ ] Mobile fallback (video/image)

---

## Quality Constraints

1. **GPU-accelerated**: Use WebGL/WebGPU
2. **< 3 second load**: Progressive loading
3. **Memory cleanup**: Dispose on unmount
4. **Mobile fallback**: Image or video (no 3D)
5. **60fps**: No frame drops on desktop

---

## Three.js Setup

```typescript
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'

function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Environment preset="studio" />
      <LandingGearModel />
      <StressVisualization />
    </Canvas>
  )
}
```

---

## Model Loading

### GLTF Format
- Compressed with Draco
- LOD (Level of Detail) for performance
- Textures optimized (WebP, power-of-2)

### Loading States
- Show placeholder/skeleton
- Progressive reveal
- No layout shift

---

## Stress Visualization Shader

```glsl
// Fragment shader for stress gradient
uniform float stressValue; // 0.0 to 1.0
uniform sampler2D stressGradient; // Blue → Red

void main() {
  vec3 color = texture2D(stressGradient, vec2(stressValue, 0.5)).rgb;
  gl_FragColor = vec4(color, 1.0);
}
```

### Stress Colors
```
0.0 - #0066ff (Blue) - Min stress
0.2 - #00ffcc (Cyan)
0.4 - #00ff66 (Green)
0.6 - #ffff00 (Yellow)
0.8 - #ff6600 (Orange)
1.0 - #ff0000 (Red) - Max stress
```

---

## Rotation Animation

- Auto-rotate: slow, continuous
- Speed: ~10 seconds per rotation
- Pause on interaction
- Resume after idle

---

## Cursor Interaction

### Desktop
- Model tilts toward cursor
- Max tilt: 10 degrees
- Smooth with lerp
- Reset on mouse leave

### Implementation
```typescript
const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

useFrame(() => {
  mesh.rotation.x = lerp(mesh.rotation.x, mousePos.y * 0.1, 0.05)
  mesh.rotation.y = lerp(mesh.rotation.y, mousePos.x * 0.1, 0.05)
})
```

---

## Mobile Fallback

### Detection
```typescript
const isMobile = window.innerWidth < 768 ||
  /iPhone|iPad|Android/i.test(navigator.userAgent)
```

### Fallback Options
1. Static image (8K render)
2. Looping video (compressed MP4)
3. CSS-only animation

---

## Performance

### Optimizations
- Instanced geometry where possible
- Frustum culling
- Texture compression
- Conditional rendering (below fold = don't render)

### Cleanup
```typescript
useEffect(() => {
  return () => {
    // Dispose geometries
    // Dispose materials
    // Dispose textures
  }
}, [])
```

---

## Vision Check

- [ ] 3D is the wow factor
- [ ] Loads quickly (< 3s)
- [ ] Interaction feels natural
- [ ] Mobile doesn't suffer

---

## Notes for PC Claude

This is where the magic happens. The 3D model should feel alive - responding to the user, showing stress visualization. But NEVER sacrifice performance. If it's slow, it's wrong.
