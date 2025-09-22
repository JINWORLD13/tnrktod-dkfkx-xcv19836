import { useEffect } from "react";
import { useThree } from '@react-three/fiber';
export function WebGLMonitor() {
    const { gl } = useThree();
    useEffect(() => {
      function handleContextLost(event) {
        event.preventDefault();
        console.error('WebGL context lost');
      }
      function handleContextRestored() {
        console.log('WebGL context restored');
      }
      const canvas = gl.domElement;
      canvas.addEventListener('webglcontextlost', handleContextLost);
      canvas.addEventListener('webglcontextrestored', handleContextRestored);
      return () => {
        canvas.removeEventListener('webglcontextlost', handleContextLost);
        canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      };
    }, [gl]);
    return null;
  }
