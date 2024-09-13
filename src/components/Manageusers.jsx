import React, { useState, useEffect } from 'react';
import Details from './Details';
import Edit from './Edit';
import axios from "axios";
import { Plus } from 'lucide-react';

function Manageusers() {
  const [employees, setEmployees] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [dialogType, setDialogType] = useState('');
  const [loading, setLoading] = useState(true);
  const [newEmployee, setNewEmployee] = useState({ name: '', email: '', phone: '', department: '' });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8000/user');
        setEmployees(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employee data:", error);
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const openDialog = (employee, type) => {
    if (type === 'add') {
      setSelectedEmployee(null);
      setNewEmployee({ name: '', email: '', phone: '', department: '' });
    } else {
      setSelectedEmployee(employee);
    }
    setDialogType(type);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedEmployee(null);
    setDialogType('');
  };

  const handleSave = async (updatedEmployee) => {
    try {
      const payload = {
        name: updatedEmployee.name,
        email: updatedEmployee.email,
        phone: updatedEmployee.phone,
        department_id: updatedEmployee.department, 
        password:updatedEmployee.password,
      };

      const response = await axios.put(`http://localhost:8000/user/${updatedEmployee.id}`, payload);
      console.log('Updated data:', response.data);

      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee.id === updatedEmployee.id ? updatedEmployee : employee
        )
      );
      closeDialog();
    } catch (error) {
      console.error("Error updating employee data:", error);
    }
  };

  const handleAddUser = async () => {
    try {
      const payload = {
        name: newEmployee.name,
        email: newEmployee.email,
        phone: newEmployee.phone,
        department_id: newEmployee.department,
        password: newEmployee.password,
      };

      const response = await axios.post('http://localhost:8000/user', payload);
      console.log('Added new user:', response.data);

      setEmployees((prevEmployees) => [...prevEmployees, response.data]);
      closeDialog();
    } catch (error) {
      console.error("Error adding new user:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/user/${id}`);
      console.log('Deleted user:', id);

      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.id !== id)
      );
    } catch (error) {
      console.error("Error deleting employee data:", error);
    }
  };

  const handleNewEmployeeChange = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  if (loading) {
    return <div className="text-center mt-10">Loading employees...</div>;
  }

  return (
    <div className='mr-28'>
      <h1 className='text-3xl font-bold mr-24 ml-60 mt-5 p-8'><center>Employee Management</center></h1><br /><br />
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
                <button className='rounded-md text-blue-600 p-1 w-24 mr-4 font-semibold' onClick={() => openDialog(employee, 'details')}>Details</button>
                <button className='rounded-md text-blue-600 p-1 w-24 ml-4 underline font-semibold' onClick={() => openDialog(employee, 'edit')}>Edit</button>
                <button className='rounded-md text-red-600 p-1 w-24 ml-4 underline font-semibold' onClick={() => handleDelete(employee.id)}>Delete</button>
              </center></td>
            </tr>
          ))}
        </tbody>
      </table>

      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            {dialogType === 'details' && selectedEmployee && <Details employee={selectedEmployee} />}
            {dialogType === 'edit' && selectedEmployee && <Edit employee={selectedEmployee} onSave={handleSave} />}
            {dialogType === 'add' && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Add New User</h2>
                <input
                  className="border border-gray-300 p-2 mb-4 w-full"
                  placeholder="Name"
                  name="name"
                  value={newEmployee.name}
                  onChange={handleNewEmployeeChange}
                />
                <input
                  className="border border-gray-300 p-2 mb-4 w-full"
                  placeholder="Email"
                  name="email"
                  value={newEmployee.email}
                  onChange={handleNewEmployeeChange}
                />
                <input
                  className="border border-gray-300 p-2 mb-4 w-full"
                  placeholder="Phone"
                  name="phone"
                  value={newEmployee.phone}
                  onChange={handleNewEmployeeChange}
                />
                <input
                  className="border border-gray-300 p-2 mb-4 w-full"
                  placeholder="Department"
                  name="department"
                  value={newEmployee.department}
                  onChange={handleNewEmployeeChange}
                />
                <input
                  className="border border-gray-300 p-2 mb-4 w-full"
                  placeholder="Password"
                  name="password"
                  value={newEmployee.password}
                  onChange={handleNewEmployeeChange}
                />
                <button className="bg-green-500 text-white px-4 py-2 mt-4 rounded" onClick={handleAddUser}>
                  Save
                </button>
              </div>
            )}
            <button className="bg-red-500 text-white px-4 py-2 mt-4 rounded" onClick={closeDialog}>Close</button>
          </div>
        </div>
        
      )}
        <button 
        className='bg-blue-500 text-white p-3 mb-[100px] rounded-full ml-[950px] mt-16'
        onClick={() => openDialog(null, 'add')}
      >
        <Plus className='h-8 w-8 p-0.5'></Plus>
      </button>
    </div>
  );
}

export default Manageusers;
