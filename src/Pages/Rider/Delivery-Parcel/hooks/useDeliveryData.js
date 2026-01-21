import { useEffect, useState } from 'react';
import axios from 'axios';
import { DELIVERY_API } from '../constants/deliveryApi';

const useDeliveryData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}${DELIVERY_API}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const mapped = res.data.map(item => ({
          id: item.id,
          trackingId: item.tracking_id,
          merchantName: item.shop,
          merchantPhone: item.mobile,
          customerName: item.customer_name,
          customerNumber: item.customer_phone,
          customerAddress: item.customer_address,
          type: item.type,
          partial: item.isPartial === 1 ? 'Yes' : 'No',
          invoiceValue: `৳${item.collection}`,
        }));

        setData(mapped);
      } catch (e) {
        console.error('Delivery fetch error', e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading };
};

export default useDeliveryData;
