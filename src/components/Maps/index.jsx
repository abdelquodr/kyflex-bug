import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API;

const containerStyle = {
  width: '100%',
  height: '400px',
};

const Maps = ({ className, children, center, style }) => {
  return (
    <LoadScript googleMapsApiKey={GOOGLE_API_KEY}>
      <GoogleMap
        mapContainerClassName={className}
        mapContainerStyle={{ ...containerStyle, ...style }}
        center={center}
        zoom={15}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <>{children}</>
      </GoogleMap>
    </LoadScript>
  );
};

export default Maps;
