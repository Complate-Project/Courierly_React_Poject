import { useState } from 'react';
import useDeliveryData from './hooks/useDeliveryData';
import usePagination from './hooks/usePagination';

import DeliveryHeader from './components/DeliveryHeader';
import DeliveryTable from './components/DeliveryTable';
import MobileCard from './components/MobileCard';
import Pagination from './components/Pagination';
import Controls from '../../../Shared/TableControler/Controls';

const RiderDeliveryParcel = () => {
  const [isGridView, setIsGridView] = useState(false);

  const { data, loading } = useDeliveryData();
  const {
    paginatedData,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    totalPages,
  } = usePagination(data);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <DeliveryHeader />

      <Controls
        isGridView={isGridView}
        setIsGridView={setIsGridView}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />

      {isGridView ? (
        paginatedData.map(item => <MobileCard key={item.id} item={item} />)
      ) : (
        <DeliveryTable
          data={paginatedData}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
        />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default RiderDeliveryParcel;
