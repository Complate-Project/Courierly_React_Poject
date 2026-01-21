import { useEffect, useState } from 'react';
import useTitle from '../../../Hooks/useTitle';
import usePagination from './hooks/usePagination';
import usePickupData from './hooks/usePickupData';
import { ITEMS_PER_PAGE } from './constants/pickupApi';
import PickupHeader from './components/PickupHeader';
import PickupTabs from './components/PickupTabs';
import PickupTable from './components/PickupTable';
import AutoPickupTable from './components/AutoPickupTable';
import Pagination from './components/Pagination';
import Spinner from '../../../Shared/Spinier/Spinier';
import Controls from '../../../Shared/TableControler/Controls';
import { PickupCardView } from './components/PickupCardView';

const Pickup = () => {
  useTitle('Rider Dashboard | Pickup');

  const [activeTab, setActiveTab] = useState('pickup');
  const [searchText, setSearchText] = useState('');

  const { pickupData, autoPickupData, loading, fetchData } = usePickupData();

  // activeData
  const activeData = activeTab === 'pickup' ? pickupData : autoPickupData;
  const [view, setView] = useState('list'); // 'list' | 'grid'

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

  const {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData,
    rowsPerPage,
    setRowsPerPage,
  } = usePagination(filteredData, ITEMS_PER_PAGE);

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  return (
    <>
      <div className="flex justify-between ">
        <PickupHeader />
        <PickupTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <Controls
        searchText={searchText}
        setSearchText={setSearchText}
        reload={() => fetchData(activeTab)}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        view={view}
        setView={setView}
      />

      {loading ? (
        <Spinner />
      ) : view === 'list' ? (
        activeTab === 'pickup' ? (
          <PickupTable
            data={paginatedData}
            currentPage={currentPage}
            itemsPerPage={
              rowsPerPage === 'All' ? paginatedData.length : rowsPerPage
            }
          />
        ) : (
          <AutoPickupTable data={paginatedData} />
        )
      ) : (
        <PickupCardView data={paginatedData} />
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
