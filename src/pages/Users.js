import { useEffect, useState, useCallback } from 'react';
import { useData } from '../context/DataContext';
import { fetchFilterUsers, fetchUsers } from '../api';
import Table from '../components/Table';
import Filter from '../components/Filter';
import Pagination from '../components/Pagination';

const Users = () => {
  const { users, setUsers } = useData();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [activeFilter, setActiveFilter] = useState({ field: '', value: '' });
  const [filterValues, setFilterValues] = useState({ firstName: '', age: '', gender: '' });

  const columns = [
    { label: 'First Name', key: 'firstName' },
    { label: 'Last Name', key: 'lastName' },
    { label: 'Maiden Name', key: 'maidenName' },
    { label: 'Age', key: 'age' },
    { label: 'Gender', key: 'gender' },
    { label: 'Email', key: 'email' },
    { label: 'Username', key: 'username' },
    { label: 'Blood Group', key: 'bloodGroup' },
    { label: 'Eye Color', key: 'eyeColor' },
    { label: 'Address', key: 'address' },
    { label: 'Phone', key: 'phone' },
    { label: 'Birth Date', key: 'birthDate' },
  ];

  // Fetch data based on page, limit, and activeFilter
  useEffect(() => {
    const fetchData = async () => {
      try {
        let res;
        if (activeFilter.value) {
          // Note: dummyjson.com/users doesn't support filter params directly like products
          // We'll simulate filtering by fetching all and filtering client-side for now
          res = await fetchFilterUsers({ limit, skip: (page - 1) * limit, key: activeFilter.field, value: activeFilter.value });
          const fetchedUsers = res.data.users || [];
          setUsers(fetchedUsers);
          setFilteredData(fetchedUsers);
          setTotal(res.data.total || fetchedUsers.length);
        } else {
          res = await fetchUsers({ limit, skip: (page - 1) * limit });
          const fetchedUsers = res.data.users || [];
          setUsers(fetchedUsers);
          setFilteredData(fetchedUsers);
          setTotal(res.data.total || fetchedUsers.length);
        }
      } catch (err) {
        console.error('Failed to fetch users');
      }
    };
    fetchData();
  }, [page, limit, activeFilter, setUsers]);

  const handlePageSizeChange = useCallback((size) => {
    setLimit(Number(size));
    setPage(1);
  }, []);

  const handleSearch = useCallback((term) => {
    if (!term) {
      setFilteredData(users);
      return;
    }
    const filtered = users.filter((user) =>
      Object.values(user).some((val) => String(val).toLowerCase().includes(term.toLowerCase()))
    );
    setFilteredData(filtered);
  }, [users]);

  const handleFilterChange = (field, value) => {
    const newFilterValues = { ...filterValues, [field]: value };
    setFilterValues(newFilterValues);
    if (!value) {
      setActiveFilter({ field: '', value: '' });
      setFilteredData(users);
    } else {
      setActiveFilter({ field, value });
      setPage(1);
    }
  };

  return (
    <div className="page">
      <h1>Users</h1>
      <Filter
        onPageSizeChange={handlePageSizeChange}
        onSearch={handleSearch}
        filters={[
          { field: 'firstName', label: 'First Name' },
          { field: 'birthDate', label: 'Birth Date' },
          { field: 'email', label: 'Email' },
          { field: 'gender', label: 'Gender' },
        ]}
        filterValues={filterValues}
        setFilterValues={setFilterValues}
        onFilterChange={handleFilterChange}
      />
      <Table columns={columns} data={filteredData} />
      <Pagination total={total} limit={limit} currentPage={page} onPageChange={setPage} />
    </div>
  );
};

export default Users;