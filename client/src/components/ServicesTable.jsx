import React from 'react';

function ServicesTable({ services }) {
  const serviceTableRows = [];

  for (let i = 0; i < services.length; i++) {
    serviceTableRows.push(
      <tr key={services[i].id}>
        <td>{services[i].service_name}</td>
        <td>{services[i].description}</td>
        <td>${services[i].pricing}</td>
      </tr>
    );
  }
  return (
    <table className="service-table">
      <thead>
        <tr>
          <th>Service Name</th>
          <th>Description</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{serviceTableRows}</tbody>
    </table>
  );
}

export default ServicesTable;