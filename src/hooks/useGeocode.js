import { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API;

export function useGeocode(initialAddress) {
  const [coordinates, setCoordinates] = useState(null);
  const [address, setAddress] = useState(initialAddress);
  const [{ data, error }, refetch] = useAxios(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_API_KEY}`
  );
  useEffect(() => {
    console.log('data', data);
    if (data && data.status === 'OK' && data.results.length) {
      setCoordinates(data.results[0].geometry.location);
    }
  }, [data]);
  useEffect(() => {
    if (address) {
      refetch();
    }
  }, [address, refetch]);
  return { coordinates, setAddress, error };
}
