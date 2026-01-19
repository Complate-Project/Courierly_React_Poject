import { useEffect, useState } from 'react';
import useTitle from '../../../Hooks/useTitle';
import usePagination from './hooks/usePagination';
import usePickupData from './hooks/usePickupData';
import { ITEMS_PER_PAGE } from './constants/pickupApi';
import PickupHeader from './components/PickupHeader';
import PickupTabs from './components/PickupTabs';
import PickupControls from './components/PickupControls';
import PickupTable from './components/PickupTable';
import AutoPickupTable from './components/AutoPickupTable';
import Pagination from './components/Pagination';
import Spinner from '../../../Shared/Spinier/Spinier';

const Pickup = () => {
  useTitle('Rider Dashboard | Pickup');

  const [activeTab, setActiveTab] = useState('pickup');
  const [searchText, setSearchText] = useState('');

  const { pickupData, autoPickupData, loading, fetchData } = usePickupData();

  // activeData
  const activeData = activeTab === 'pickup' ? pickupData : autoPickupData;

  // filteredData with tracking_id, customer_name, customer_phone
  const filteredData = activeData.filter(item => {
    const text = searchText.toLowerCase();
    return (
      item.tracking_id?.toLowerCase().includes(text) ||
      item.customer_name?.toLowerCase().includes(text) ||
      item.customer_phone?.toLowerCase().includes(text)
    );
  });

  // Reset page on search or tab change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, activeTab]);

  const { currentPage, setCurrentPage, totalPages, paginatedData } =
    usePagination(filteredData, ITEMS_PER_PAGE);

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  return (
    <>
      <div className="flex justify-between ">
        <PickupHeader />
        <PickupTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <PickupControls
        searchText={searchText}
        setSearchText={setSearchText}
        reload={() => fetchData(activeTab)}
        paginatedData={paginatedData}
      />

      {loading ? (
        <Spinner />
      ) : activeTab === 'pickup' ? (
        <PickupTable
          data={paginatedData}
          currentPage={currentPage}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      ) : (
        <AutoPickupTable data={paginatedData} />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default Pickup;
