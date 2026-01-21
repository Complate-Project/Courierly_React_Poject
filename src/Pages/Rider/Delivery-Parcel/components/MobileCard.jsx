const MobileCard = ({ item }) => (
  <div className="border p-4 rounded mb-3">
    <p className="font-semibold">{item.trackingId}</p>
    <p>{item.customerName}</p>
    <p>{item.invoiceValue}</p>
  </div>
);

export default MobileCard;
