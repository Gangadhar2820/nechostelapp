import React, { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

interface QrCodeScannerProps {
  onScanSuccess: (decodedText: string, decodedResult: any) => void;
  onScanFailure: (error: any) => void;
  visible: boolean;
}

const QrCodeScanner: React.FC<QrCodeScannerProps> = ({ onScanSuccess, onScanFailure, visible }) => {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    if (visible) {
      const html5QrcodeScanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: 250 },
        false // Set to true if you want verbose logging
      );

      html5QrcodeScanner.render(onScanSuccess, onScanFailure);
      scannerRef.current = html5QrcodeScanner;
    } else {
      if (scannerRef.current) {
        scannerRef.current.clear().catch((error) => console.error('Failed to clear Html5QrcodeScanner', error));
        scannerRef.current = null;
      }
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch((error) => console.error('Failed to clear Html5QrcodeScanner', error));
      }
    };
  }, [visible, onScanSuccess, onScanFailure]);

  return (
    <div>
      {visible && <div id="reader" style={{ width: "300px", height: "300px" }}></div>}
    </div>
  );
};

export default QrCodeScanner;
