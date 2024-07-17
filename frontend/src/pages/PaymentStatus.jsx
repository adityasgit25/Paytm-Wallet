import { useLocation } from 'react-router-dom';

export function PaymentStatus() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const message = params.get('message');

  return (
    <div>
      <h1>Payment Status</h1>
      <p>{message}</p>
    </div>
  );
}
