import React, { useState, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
const CanvasMetrics = ({ onMetricsUpdate }) => {
  const { gl } = useThree();
  const prevTimeRef = React.useRef(performance.now());
  useFrame(() => {
    const info = gl.info;
    const currentTime = performance.now();
    const frameTime = currentTime - prevTimeRef.current;
    onMetricsUpdate({
      drawCalls: info.render.calls,
      triangles: info.render.triangles,
      frameTime: frameTime,
    });
    prevTimeRef.current = currentTime;
  });
  return null;
};
const CanvasPerformanceWrapper = ({ children, id }) => {
  const [canvasMetrics, setCanvasMetrics] = useState({
    drawCalls: 0,
    triangles: 0,
    frameTime: 0,
  });
  const handleMetricsUpdate = newMetrics => {
    setCanvasMetrics(newMetrics);
  };
  return (
    <PerformanceWrapper id={id}>
      {React.Children.map(children, child =>
        React.cloneElement(child, {
          children: (
            <>
              {child.props.children}
              <CanvasMetrics onMetricsUpdate={handleMetricsUpdate} />
            </>
          ),
        })
      )}
      <div
        style={{
          position: 'fixed',
          bottom: 10,
          right: 10,
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: 10,
          borderRadius: 5,
          zIndex: 1000,
        }}
      >
        <h4>Canvas Metrics</h4>
        <p>Draw Calls: {canvasMetrics.drawCalls}</p>
        <p>Triangles: {canvasMetrics.triangles}</p>
        <p>Frame Time: {canvasMetrics.frameTime.toFixed(2)} ms</p>
      </div>
    </PerformanceWrapper>
  );
};
export default CanvasPerformanceWrapper;
