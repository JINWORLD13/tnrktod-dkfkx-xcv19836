import { useEffect, useCallback } from 'react';
import { useThree } from '@react-three/fiber';
import { Cache } from 'three';
function disposeTexture(texture) {
  if (!texture) return;
  if (Array.isArray(texture)) {
    texture.forEach((elem, index) => {
      if (elem?.isTexture) {
        elem.dispose();
        if (elem.source?.data) {
          elem.source.data = null;
        }
      }
    });
    return;
  }
  if (texture && typeof texture === 'object' && !texture.isTexture) {
    Object.values(texture).forEach((elem, index) => {
      if (elem?.isTexture) {
        elem.dispose();
        if (elem.source?.data) {
          elem.source.data = null;
        }
      }
    });
    return;
  }
  if (texture.isTexture) {
    texture.dispose();
    if (texture.source?.data) {
      console.log('Clearing source.data for single texture');
      texture.source.data = null;
    }
  }
}
function disposeMaterial(material) {
  if (!material) return;
  const texturesToDispose = [
    'map',
    'lightMap',
    'bumpMap',
    'normalMap',
    'specularMap',
    'envMap',
    'aoMap',
    'displacementMap',
    'emissiveMap',
    'metalnessMap',
    'roughnessMap',
    'alphaMap',
    'gradientMap',
    'transmission',
    'AmbientLight',
    'Bone',
    'AnimationMixer',
    'AddOperation',
    'AddEquation',
    'AnimationClip',
  ];
  texturesToDispose.forEach(prop => {
    if (material[prop]) {
      material[prop].dispose();
      material[prop] = null;
    }
  });
  texturesToDispose.forEach(mapType => {
    if (material[mapType]) {
      disposeTexture(material[mapType]);
    } else {
      disposeTexture(material);
    }
  });
  if (material.uniforms) {
    Object.values(material.uniforms).forEach(uniform => {
      if (uniform?.value?.isTexture) {
        disposeTexture(uniform.value);
      }
    });
  }
  if (material.isShaderMaterial) {
    material.uniformsGroups.forEach(group => {
      group.dispose();
    });
  }
  material.dispose();
}
function disposeGeometry(geometry) {
  if (!geometry) return;
  for (const attribute of Object.values(geometry.attributes)) {
    if (attribute.buffer) attribute.buffer.dispose();
  }
  if (geometry.morphAttributes) {
    for (const morphAttr of Object.values(geometry.morphAttributes)) {
      for (const attribute of morphAttr) {
        attribute.buffer.dispose();
      }
    }
  }
  geometry.dispose();
}
function disposeMesh(mesh) {
  if (!mesh) return;
  if (mesh.geometry) {
    disposeGeometry(mesh.geometry);
  }
  if (Array.isArray(mesh.material)) {
    mesh.material.forEach(disposeMaterial);
  } else if (mesh.material) {
    disposeMaterial(mesh.material);
  }
  if (mesh.skeleton) {
    mesh.skeleton.dispose();
  }
  if (mesh.morphTargetDictionary) mesh.morphTargetDictionary = null;
  if (mesh.morphTargetInfluences) mesh.morphTargetInfluences = null;
  if (mesh.mixer) {
    mesh.mixer.stopAllAction();
    mesh.mixer.uncacheRoot(mesh);
  }
}
function cleanupScene(scene) {
  if (!scene) return;
  scene.traverse(object => {
    if (object.isMesh && !object.isPersistent) {
      disposeMesh(object);
    }
    if (object.isLight && object.shadow?.map) {
      object.shadow.map.dispose();
    }
    if (object.isCamera) {
      object.clear();
    }
  });
  scene.clear();
}
function cleanupRenderer(renderer, gl) {
  if (renderer) {
    renderer?.dispose();
    renderer?.forceContextLoss();
    renderer?.renderLists.dispose();
    renderer?.info.reset();
    renderer?.clear();
  }
  gl?.dispose();
  Cache.clear();
}
function cleanupCamera(camera) {
  if (camera) {
    camera.clear();
  }
}
export function SceneResourceCleanUp({
  isWaiting,
  isAnswered,
  isReadyToShowDurumagi,
  userInfo,
  cleanUp,
  ...props
}) {
  const { scene, gl, renderer, camera } = useThree();
  const handleContextLost = useCallback(event => {
    event.preventDefault();
    console.log('WebGL context lost');
  }, []);
  const handleContextRestored = useCallback(() => {
    console.log('WebGL context restored');
  }, []);
   useEffect(() => {
      return () => {
        scene.traverse(object => {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(mat => {
                if (mat.material.dispose) mat.material.dispose();
                mat.dispose();
              });
            } else {
              object.material.dispose();
            }
          }
        });
      };
    }, [scene]);
  useEffect(() => {
    if (!gl?.domElement) return;
    if (typeof window !== 'undefined') gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    gl.setClearColor('#000000');
    gl.domElement.addEventListener('webglcontextlost', handleContextLost);
    gl.domElement.addEventListener(
      'webglcontextrestored',
      handleContextRestored
    );
    console.log('Initial setup complete');
    return () => {
      console.log('Starting cleanup...');
      gl.domElement.removeEventListener('webglcontextlost', handleContextLost);
      gl.domElement.removeEventListener(
        'webglcontextrestored',
        handleContextRestored
      );
      try {
        cleanupScene(scene);
        cleanupRenderer(renderer, gl);
        cleanupCamera(camera);
        console.log('Cleanup complete');
      } catch (error) {
        console.error('Cleanup error:', error);
      }
    };
  }, [
  ]);
  return null;
}
