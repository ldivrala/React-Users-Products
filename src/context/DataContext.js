import { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);

    return (
        <DataContext.Provider value={{ users, setUsers, products, setProducts }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);