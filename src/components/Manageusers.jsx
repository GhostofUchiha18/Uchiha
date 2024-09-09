import React, { useState } from 'react';
import Details from './Details';
import Edit from './Edit';

function Manageusers() {
  const [employees, setEmployees] = useState([
    {
      name: 'Shikshya Neupane',
      email: 'shikshya@example.com',
      phone: '+1234567890',
      department: 'Mentors',
    },
    {
      name: 'Ujjwal Sah',
      email: 'ujjwal@example.com',
      phone: '+0987654321',
      department: 'Mentors',
    },
    {
      name: 'Garima Bhattrai',
      email: 'garima@example.com',
      phone: '+123454321',
      department: 'Mentors',
    },
    {
      name: 'Srijan Napit',
      email: 'srijan@example.com',
      phone: '+0987656789',
      department: 'Coding',
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [dialogType, setDialogType] = useState(''); 

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

  return (
    <div className='mr-28'>
      <h1 className='text-3xl font-medium mr-24'><center><b>Employee Management</b></center></h1><br /><br />
      <input type="search" className='border-solid border-black p-2' placeholder='Search Employee'/><br /><br />
      <table className="table-auto border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 w-72 font-medium"><b>Employee Name</b></th>
            <th className="border border-gray-300 px-4 py-2 w-72 font-medium"><b>Department</b></th>
            <th className="border border-gray-300 px-4 py-2 w-96 font-medium"><b>Actions</b></th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{employee.name}</td>
              <td className="border border-gray-300 px-4 py-2"><center>{employee.department}</center></td>
              <td className="border border-gray-300 px-4 py-2"><center>
                <button className='bg-blue-600 rounded-md text-white p-1 w-24 mr-4' onClick={() => openDialog(employee, 'details')}>Details</button>
                <button className='bg-blue-600 rounded-md text-white p-1 w-24 ml-4' onClick={() => openDialog(employee, 'edit')}>Edit</button></center></td>
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
