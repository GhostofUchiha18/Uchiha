
import React from 'react';

const Details = ({ employee }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Employee Details</h2>
      <div>
        <div className="border p-4">
          <h3 className="text-lg font-semibold">Personal Information</h3>
          <p><b>Name:</b> {employee.name}</p>
          <p><b>Email:</b> {employee.email}</p>
          <p><b>Phone:</b> {employee.phone_number}</p>
          <p><b>Department:</b> {employee.department_id}</p>
        </div>
      </div>
    </div>
  );
};

export default Details;
