import React, { useState, useEffect } from 'react';
import Details from './Details';
import Edit from './Edit';
import axios from "axios";

function Manageusers() {
  const [employees, setEmployees] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [dialogType, setDialogType] = useState(''); 
  const [loading, setLoading] = useState(true); 

  // Fetch employee data from the API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8000/user'); // Replace with your actual API URL
        console.log(response.data.data)
        setEmployees(response.data.data);
        setLoading(false); // Data loaded, stop showing loader
      } catch (error) {
        console.error("Error fetching employee data:", error);
        setLoading(false); // Even if there's an error, stop showing loader
      }
    };

    fetchEmployees();
  }, []);

  const openDialog = (employee, type) => {
    setSelectedEmployee(employee);
    setDialogType(type);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedEmployee(null);
    setDialogType('');
  };

  
  const handleSave = (updatedEmployee) => {
  
  
    setEmployees((prevEmployees) => 
      prevEmployees.map((employee) => 
        employee.email === updatedEmployee.email ? updatedEmployee : employee

      )
    );
    closeDialog();
  };

  if (loading) {
    return <div className="text-center mt-10">Loading employees...</div>;
  }

  return (
    <div className='mr-28'>
      <h1 className='text-3xl font-semibold mr-24 ml-60 mt-5 p-8'><center>Employee Management</center></h1><br /><br />
      <table className="table-auto border-collapse border border- ml-7">
        <thead>
          <tr className='bg-gray-300'>
            <th className="border border-gray-300 px-4 py-2 w-72 font-medium"><b>Employee Name</b></th>
            <th className="border border-gray-300 px-4 py-2 w-72 font-medium"><b>Email</b></th>
            <th className="border border-gray-300 px-4 py-2 w-96 font-medium"><b>Actions</b></th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{employee.name}</td>
              <td className="border border-gray-300 px-4 py-2"><center>{employee.email}</center></td>
              <td className="border border-gray-300 px-4 py-2"><center>
                <button className=' rounded-md text-blue-600 p-1 w-24 mr-4 font-semibold' onClick={() => openDialog(employee, 'details')}>Details</button>
                <button className=' rounded-md text-blue-600 p-1 w-24 ml-4 underline font-semibold' onClick={() => openDialog(employee, 'edit')}>Edit</button></center></td>
            </tr>
          ))}
        </tbody>
      </table>

      {isDialogOpen && selectedEmployee && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            {dialogType === 'details' && <Details employee={selectedEmployee} />}
            {dialogType === 'edit' && <Edit employee={selectedEmployee} onSave={handleSave} />}
            <button className="bg-red-500 text-white px-4 py-2 mt-4 rounded" onClick={closeDialog}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Manageusers;
