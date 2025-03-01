import { useEffect, useState, useCallback } from 'react';
import { useData } from '../context/DataContext';
import { fetchProducts, searchProducts, filterProductsByCategory } from '../api';
import Table from '../components/Table';
import Filter from '../components/Filter';
import Pagination from '../components/Pagination';

const Products = () => {
  const { products, setProducts } = useData();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);
  const [tab, setTab] = useState('ALL');
  const [filteredData, setFilteredData] = useState([]);
  const [activeFilter, setActiveFilter] = useState({ field: '', value: '' });
  const [filterValues, setFilterValues] = useState({ title: '', brand: '', category: '' });

  const columns = [
    { label: 'Title', key: 'title' },
    { label: 'Brand', key: 'brand' },
    { label: 'Category', key: 'category' },
    { label: 'Price', key: 'price' },
    { label: 'Discount Percentage', key: 'discountPercentage' },
    { label: 'Rating', key: 'rating' },
    { label: 'Stock', key: 'stock' },
    { label: 'Description', key: 'description' },
    { label: 'Thumbnail', key: 'thumbnail' },
    { label: 'Images', key: 'images' },
    { label: 'Weight', key: 'weight' },
    { label: 'Dimensions', key: 'dimensions' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res;
        if (activeFilter.value) {
          if (activeFilter.field === 'title') {
            res = await searchProducts(activeFilter.value, { limit, skip: (page - 1) * limit });
          } else if (activeFilter.field === 'category') {
            res = await filterProductsByCategory(activeFilter.value);
          } else {
            res = await searchProducts(activeFilter.value, { limit, skip: (page - 1) * limit });
          }
        } else {
          res = await fetchProducts({ limit, skip: (page - 1) * limit});
        }
        const fetchedProducts = res.data.products || [];
        setProducts(fetchedProducts);
        setFilteredData(fetchedProducts);
        setTotal(res.data.total || fetchedProducts.length);
      } catch (err) {
        console.error('Failed to fetch products');
      }
    };
    fetchData();
  }, [page, limit, tab, activeFilter, setProducts]);

  const handlePageSizeChange = (size) => {
    setLimit(Number(size));
    setPage(1);
  };

  const handleSearch = useCallback((term) => {
    if (!term) {
      setFilteredData(products);
      return;
    }
    const filtered = products.filter((product) =>
      Object.values(product).some((val) => String(val).toLowerCase().includes(term.toLowerCase()))
    );
    setFilteredData(filtered);
  }, [products]);

  const handleFilterChange = (field, value) => {
    if (!value) {
      setActiveFilter({ field: '', value: '' });
      setFilteredData(products);
    } else {
      setActiveFilter({ field, value });
      setPage(1);
    }
    // Keep filterValues intact, only the active filter triggers data fetch
  };

  return (
    <div className="page">
      <h1>Products</h1>
      <div className="tabs">
        <button onClick={() => { setTab('ALL'); setActiveFilter({ field: '', value: '' }); setFilterValues({ title: '', brand: '', category: '' }); }} className={tab === 'ALL' ? 'active' : ''}>
          ALL
        </button>
        <button onClick={() => { setTab('Laptops'); setActiveFilter({ field: 'category', value: 'laptops' }); setFilterValues({ title: '', brand: '', category: '' }); }} className={tab === 'Laptops' ? 'active' : ''}>
          Laptops
        </button>
      </div>
      <Filter
        onPageSizeChange={handlePageSizeChange}
        onSearch={handleSearch}
        filters={[
          { field: 'title', label: 'Title' },
          { field: 'brand', label: 'Brand' },
          { field: 'category', label: 'Category' },
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

export default Products;