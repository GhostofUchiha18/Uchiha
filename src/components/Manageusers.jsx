import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus } from "lucide-react";
import { baseURL } from "../util/util";

function ManageUsers() {
  const [employees, setEmployees] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [dialogType, setDialogType] = useState("");
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
  });
  const [attendanceDate, setAttendanceDate] = useState("");
  const [attendanceData, setAttendanceData] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${baseURL}/user`);
        setEmployees(response.data.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployees();
  }, []);

  const openDialog = (employee, type) => {
    if (type === "add") {
      setSelectedEmployee(null);
      setNewEmployee({ name: "", email: "", phone: "", department: "" });
    } else {
      setSelectedEmployee(employee);
    }
    setDialogType(type);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedEmployee(null);
    setDialogType("");
    setAttendanceData(null);
  };

  const handleSave = async (updatedEmployee) => {
    try {
      const payload = {
        name: updatedEmployee.name,
        email: updatedEmployee.email,
        phone: updatedEmployee.phone,
        department: updatedEmployee.department,
      };

      if (selectedEmployee) {
        await axios.put(`${baseURL}/user/${selectedEmployee.id}`, payload);
        setEmployees((prevEmployees) =>
          prevEmployees.map((employee) =>
            employee.id === selectedEmployee.id ? { ...employee, ...updatedEmployee } : employee
          )
        );
      } else {
        const response = await axios.post(`${baseURL}/user`, payload);
        setEmployees([...employees, response.data]);
      }
    } catch (error) {
      console.error("Error saving employee data:", error);
    }

    closeDialog();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/user/${id}`);
      setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div className="bg-[#F5FFFA] p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#02C46A]">Manage Users</h1>
        <button
          onClick={() => openDialog(null, "add")}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          <Plus className="inline mr-2" /> Add User
        </button>
      </div>

      <table className="bg-[#E5F9EF] w-full">
        <thead className="bg-[#02C46A]">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">Department</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="px-4 py-2">{employee.name}</td>
              <td className="px-4 py-2">{employee.email}</td>
              <td className="px-4 py-2">{employee.phone}</td>
              <td className="px-4 py-2">{employee.department}</td>
              <td className="px-4 py-2">
                <button
                  className="text-blue-500 hover:underline mr-4"
                  onClick={() => openDialog(employee, "edit")}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDelete(employee.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              {dialogType === "add" ? "Add New Employee" : "Edit Employee"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave(selectedEmployee || newEmployee);
              }}
            >
              <div className="mb-4">
                <label className="block mb-2">Name</label>
                <input
                  type="text"
                  className="p-2 border w-full"
                  value={selectedEmployee ? selectedEmployee.name : newEmployee.name}
                  onChange={(e) =>
                    dialogType === "add"
                      ? setNewEmployee({ ...newEmployee, name: e.target.value })
                      : setSelectedEmployee({ ...selectedEmployee, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  className="p-2 border w-full"
                  value={selectedEmployee ? selectedEmployee.email : newEmployee.email}
                  onChange={(e) =>
                    dialogType === "add"
                      ? setNewEmployee({ ...newEmployee, email: e.target.value })
                      : setSelectedEmployee({ ...selectedEmployee, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Phone</label>
                <input
                  type="text"
                  className="p-2 border w-full"
                  value={selectedEmployee ? selectedEmployee.phone : newEmployee.phone}
                  onChange={(e) =>
                    dialogType === "add"
                      ? setNewEmployee({ ...newEmployee, phone: e.target.value })
                      : setSelectedEmployee({ ...selectedEmployee, phone: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Department</label>
                <input
                  type="text"
                  className="p-2 border w-full"
                  value={selectedEmployee ? selectedEmployee.department : newEmployee.department}
                  onChange={(e) =>
                    dialogType === "add"
                      ? setNewEmployee({ ...newEmployee, department: e.target.value })
                      : setSelectedEmployee({ ...selectedEmployee, department: e.target.value })
                  }
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={closeDialog}
                  type="button"
                  className="mr-4 bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageUsers;
