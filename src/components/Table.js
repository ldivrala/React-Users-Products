import '../styles/Table.css';

const Table = ({ columns, data }) => (
  <table>
    <thead>
      <tr>
        {columns.map((col) => (
          <th key={col.key}>{col.label}</th> // Use label for header
        ))}
      </tr>
    </thead>
    <tbody>
      {data.length > 0 ? (
        data.map((row, idx) => (
          <tr key={idx}>
            {columns.map((col) => (
              <td key={col.key}>
                {col.key === 'thumbnail' ? (
                  <img src={row[col.key]} alt={row.title} />
                ) : col.key === 'address' ? (
                  `${row[col.key]?.address || ''}, ${row[col.key]?.city || ''}, ${row[col.key]?.postalCode || ''}`
                ) : col.key === 'dimensions' ? (
                  `${row[col.key]?.width || '-'} x ${row[col.key]?.height || '-'} x ${row[col.key]?.depth || '-'}`
                ) : col.key === 'images' ? (
                  row[col.key]?.length || 0
                ) : (
                  row[col.key] || '-' // Use key directly to access data
                )}
              </td>
            ))}
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={columns.length} style={{ textAlign: 'center', padding: '20px' }}>
            No data available
          </td>
        </tr>
      )}
    </tbody>
  </table>
);

export default Table;