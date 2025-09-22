import { useEffect, useRef } from "react";
export const AudioVisualizer = ({ audioContext }) => {
  const canvasRef = useRef(null);
  const analyserRef = useRef(null);
  useEffect(() => {
    if (!audioContext) return;
    const analyser = audioContext?.createAnalyser();
    analyser.fftSize = 256;
    analyserRef.current = analyser;
    const source = audioContext.createMediaStreamSource || audioContext.createAnalyser;
    drawVisualization();
  }, [audioContext]);
  const drawVisualization = () => {
    const canvas = canvasRef.current;
    if (!canvas || !analyserRef.current) return;
    const ctx = canvas.getContext('2d');
    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const draw = () => {
      requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);
      ctx.fillStyle = 'rgba(0, 0, 30, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2;
        const hue = (i / bufferLength) * 60 + 270; 
        ctx.fillStyle = `hsl(${hue}, 70%, 50%)`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }
    };
    draw();
  };
  return (
    <canvas 
      ref={canvasRef} 
      width={800} 
      height={200} 
      className="audio-visualizer"
      style={{
        background: 'linear-gradient(135deg, #1e1e2e, #2d1b69)',
        borderRadius: '10px',
        border: '2px solid gold'
      }}
    />
  );
};
