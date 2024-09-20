import React, { useState, useEffect } from 'react';

const Edit = ({ employee, onSave }) => {
  const [formData, setFormData] = useState({
    name: employee.name,
    email: employee.email,
    phone: employee.phone,
    department: employee.department,
    password: employee.password || '1234',
    role: employee.role || 'user', 
});

  useEffect(() => {
    setFormData({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      department: employee.department,
    });
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave({
        ...formData,
        department_id: formData.department,
    });
};

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Edit Employee</h2>
      <form className="">
        <div>
          <label className="block">Name:</label>
          <input 
            className="border p-2 w-full" 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label className="block">Email:</label>
          <input 
            className="border p-2 w-full" 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label className="block">Phone:</label>
          <input 
            className="border p-2 w-full" 
            type="text" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label className="block">Department ID:</label>
          <input 
            className="border p-2 w-full" 
            type="text" 
            name="department" 
            value={formData.department} 
            onChange={handleChange} 
          />
        </div>

        <div className="mt-4">
          <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSave}>Save</button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
