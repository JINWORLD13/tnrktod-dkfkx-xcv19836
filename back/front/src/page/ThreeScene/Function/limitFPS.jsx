export function limitFPS(callback, FPS = 20) {
  return (state, delta) => {
    if (delta < 1 / FPS) {
      callback(state, delta);
    }
  };
}
