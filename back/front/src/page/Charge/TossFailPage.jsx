import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
export default function FailPage() {
  const [searchParams] = useSearchParams();
  return (
    <div className="result wrapper">
      <div className="box_section">
        <h2>Failure</h2>
        <p>{`Error code: ${searchParams.get('code')}`}</p>
        <p>{`Reason: ${searchParams.get('message')}`}</p>
      </div>
    </div>
  );
}
