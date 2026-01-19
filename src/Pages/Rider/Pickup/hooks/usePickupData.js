import { useState } from 'react';
import axios from 'axios';
import { PICKUP_API, AUTO_PICKUP_API } from '../constants/pickupApi';

const usePickupData = () => {
  const [pickupData, setPickupData] = useState([]);
  console.log(pickupData);
  const [autoPickupData, setAutoPickupData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async type => {
    setLoading(true);
    const token = localStorage.getItem('token');

    try {
      const url = type === 'pickup' ? PICKUP_API : AUTO_PICKUP_API;
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (type === 'pickup') setPickupData(res.data || []);
      else setAutoPickupData(res.data || []);
    } catch (err) {
      console.error(err);
      if (type === 'pickup') setPickupData([]);
      else setAutoPickupData([]);
    } finally {
      setLoading(false);
    }
  };

  return { pickupData, autoPickupData, loading, fetchData };
};

export default usePickupData;
