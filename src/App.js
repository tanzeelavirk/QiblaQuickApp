import React, { useState } from 'react';
import logo from './logo.webp';
import './App.css';

function App() {
  const [bearing, setBearing] = useState(null); // Qibla bearing
  const [heading, setHeading] = useState(0);    // Device heading
  const [error, setError] = useState('');
  const [enabled, setEnabled] = useState(false);

  // Function to calculate Qibla direction using spherical trigonometry
  function calculateQibla(lat, lon) {
    const kaabaLat = 21.422510 * Math.PI / 180;
    const kaabaLon = 39.82606 * Math.PI / 180;
    const userLat = lat * Math.PI / 180;
    const userLon = lon * Math.PI / 180;

    const dLon = kaabaLon - userLon;
    const x = Math.sin(dLon) * Math.cos(kaabaLat);
    const y =
      Math.cos(userLat) * Math.sin(kaabaLat) -
      Math.sin(userLat) * Math.cos(kaabaLat) * Math.cos(dLon);

    const brng = Math.atan2(x, y) * 180 / Math.PI;
    return (brng + 360) % 360;
  }

  const requestPermissions = async () => {
    setError('');

    // Request location
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const qibla = calculateQibla(latitude, longitude);
        setBearing(qibla);
      },
      (err) => {
        setError('Location permission denied.');
        console.error(err);
      }
    );

    // Handle device orientation
    const handleOrientation = (e) => {
      if (e.alpha !== null) {
        // Use webkitCompassHeading on iOS; otherwise invert alpha for Android
        const compassHeading = e.webkitCompassHeading !== undefined
          ? e.webkitCompassHeading
          : (360 - e.alpha);

        setHeading(compassHeading);
      }
    };

    // Request permission for iOS 13+ devices
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function'
    ) {
      try {
        const response = await DeviceOrientationEvent.requestPermission();
        if (response === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation);
        } else {
          setError('Motion/compass permission denied.');
        }
      } catch (err) {
        console.error(err);
        setError('Error requesting motion permission.');
      }
    } else {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    setEnabled(true);
  };

  // Calculate rotation
  let rotateAngle = 0;
  if (bearing !== null) {
    rotateAngle = ((bearing - heading) + 360) % 360;
  }

  // Show a success message if aligned within 5 degrees
  const isAligned =
    Math.abs(rotateAngle) < 5 || Math.abs(rotateAngle - 360) < 5;

  return (
    <div className="App">
      <header className="App-header">
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {!enabled ? (
          <>
            <p>
              Sick and tired of ads when trying to pray? <br /> Welcome to Qibla Quick
            </p>
            <button
              onClick={requestPermissions}
              style={{ padding: '10px 20px', fontSize: '16px' }}
            >
              Enable Compass
            </button>
          </>
        ) : (
          <>
            <img
              src={logo}
              className="App-logo"
              alt="compass"
              style={{
                transform: `rotate(${rotateAngle}deg)`,
                filter: isAligned
                  ? 'drop-shadow(0 0 10px lime)'
                  : 'none'
              }}
            />

            {bearing !== null ? (
              <>
                <p>Qibla direction: {bearing.toFixed(2)}° from North</p>
                {isAligned && (
                  <p
                    style={{
                      color: 'lightgreen',
                      fontWeight: 'bold',
                      fontSize: '18px'
                    }}
                  >
                    You are facing the Qibla!
                  </p>
                )}
              </>
            ) : (
              <p>Locating...</p>
            )}
          </>
        )}
      </header>
    </div>
  );
}

export default App;
