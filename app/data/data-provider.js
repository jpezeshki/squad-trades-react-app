import React, {useState} from 'react';
import DataContext from './data-context';

const DataProvider = ({ children }) => {
  const [data, setData] = useState({squadId: "all"});

  const updateData = (newData) => {
    setData(newData);
  };

  return (
    <DataContext.Provider value={{ data, updateData}}>
      {children}
    </DataContext.Provider>
  )
}

export default DataProvider;
