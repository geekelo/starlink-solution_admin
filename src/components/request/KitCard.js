import React, { useState } from 'react';
import { Box, Calendar, FileText, Copy } from 'lucide-react';

import {InfoCard} from '../InfoCard/Card';

import { formatDate } from '../utils/date';
const KitCard = ({ kit, plans,index }) => {


const planOptions = plans.map(item => ({
    name: item.name,  
    value: item.id 

}))
  

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' }
  ];;

    
  
  const [selectedPlan, setSelectedPlan] = useState(planOptions);


  const isManageRenewalsPath = true; 
  console.log(plans);
  


  const [status, setStatus] = useState(statusOptions);
  const handleSave = () => {
    console.log('Saving changes:', {
      kitId: kit.id,
      status,
      plan: selectedPlan
    });
    
  };
  


  const kitItems = [
    {
      icon: <FileText size={16} />,
      label: "NIN",
      value: kit.nin
    },
    {
      icon: <FileText size={16} />,
      label: "Address",
      value: kit.address
    },
    {
      icon: <FileText size={16} />,
      label: "Id",
      value: kit.id
    },
    {
      icon: <Box size={16} />,
      label: "Kit No",
      value: kit.kit_number
    },
    {
      icon: <FileText size={16} />,
      label: "Company Name",
      value: kit.company_name
    },
    {
      icon: <Calendar size={16} />,
      label: "Date",
      value: formatDate(kit.created_at)
    },
    {
        icon: <FileText size={16} />,
        label: "Company Name",
        value: kit.company_name
      },

  ];


  return (
    <>
    
     <InfoCard
      title={`New Kits ${index + 1}`}
      items={kitItems}
      className="renewal"
      icon={ isManageRenewalsPath && <Copy />}
      // Status filter props
      statusOptions={isManageRenewalsPath && statusOptions}
      status={isManageRenewalsPath && status}
      setStatus={ isManageRenewalsPath && setStatus}
      placeholder={isManageRenewalsPath && 'Select Status'}
      label={isManageRenewalsPath && 'Status'}
      // Plan filter props
      planOptions={ isManageRenewalsPath && plans}
      selectedPlan={isManageRenewalsPath && selectedPlan}
      setSelectedPlan={isManageRenewalsPath && setSelectedPlan}
      
      // App button props
      showAppButton={isManageRenewalsPath && true}
      onAppButtonClick={handleSave}
      appButtonLabel="Approve"
    />

 
    </>
  );
};

export default KitCard;