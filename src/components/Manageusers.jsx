import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Details from "./Details";
import Edit from "./Edit"; 
import Sidebar from "./sidebar";

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
  const navigate = useNavigate();

  const baseURL = "http://localhost:8000";

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("accessToken"); 
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(`${baseURL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        setEmployees(response.data.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("accessToken");
          navigate("/login");
        }
      }
    };

    fetchEmployees();
  }, [navigate, baseURL]);

  const openDialog = (employee, type) => {
    if (type === "add") {
      setSelectedEmployee(null);
      setNewEmployee({ name: "", email: "", phone_number: "", department_id: "" });
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
  };

  const handleSave = async (updatedEmployee) => {
    try {
      const token = localStorage.getItem("accessToken"); 
      if (!token) {
        navigate("/login"); 
        return;
      }

      const payload = {
        name: updatedEmployee.name,
        email: updatedEmployee.email,
        phone: updatedEmployee.phone_number,
        department: updatedEmployee.department_id,
        password: updatedEmployee.password,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (dialogType === "edit" && selectedEmployee) {
        await axios.put(`${baseURL}/user/${selectedEmployee.id}`, payload, config);
        setEmployees((prevEmployees) =>
          prevEmployees.map((employee) =>
            employee.id === selectedEmployee.id ? { ...employee, ...updatedEmployee } : employee
          )
        );
      } else if (dialogType === "add") {
        const response = await axios.post(`${baseURL}/user`, payload, config);
        setEmployees([...employees, response.data]);
      }
    } catch (error) {
      console.error("Error saving employee data:", error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("accessToken");
        navigate("/login");
      }
    }

    closeDialog();
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("accessToken"); // Retrieve token from localStorage
      if (!token) {
        navigate("/login"); // Redirect to login if token is missing
        return;
      }

      await axios.delete(`${baseURL}/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add Authorization header
        },
      });
      setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("accessToken");
        navigate("/login");
      }
    }
  };

  return (
    <Sidebar>
    <div className="bg-[#F5FFFA] p-8 ml-64">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#02C46A]">Manage Users</h1>
        <button
          onClick={() => openDialog(null, "add")}
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="inline mr-2" /> Add User
        </button>
      </div>

      <table className="bg-[#E5F9EF] w-full">
        <thead className="bg-[#02C46A]">
          <tr>
            <th className="px-4 py-2 w-64">Name</th>
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
              <td className="px-4 py-2">{employee.phone_number}</td>
              <td className="px-4 py-2">{employee.department_id}</td>
              <td className="px-4 py-2 flex space-x-4">
                {/* Details Button */}
                <button
                  className="text-green-500 hover:underline"
                  onClick={() => openDialog(employee, "details")}
                >
                  Details
                </button>
                {/* Edit Button */}
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => openDialog(employee, "edit")}
                >
                  Edit
                </button>
                {/* Delete Button */}
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
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            {dialogType === "details" && selectedEmployee && (
              <>
                <Details employee={selectedEmployee} />
                <div className="flex justify-end mt-4">
                  <button
                    onClick={closeDialog}
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                  >
                    Close
                  </button>
                </div>
              </>
            )}

            {(dialogType === "add" || dialogType === "edit") && (
              <>
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
                      
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-2">Phone</label>
                    <input
                      type="text"
                      className="p-2 border w-full"
                      value={selectedEmployee ? selectedEmployee.phone_number : newEmployee.phone_number}
                      onChange={(e) =>
                        dialogType === "add"
                          ? setNewEmployee({ ...newEmployee, phone_number: e.target.value })
                          : setSelectedEmployee({ ...selectedEmployee, phone_number: e.target.value })
                      }
                      
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-2">Department</label>
                    <input
                      type="text"
                      className="p-2 border w-full"
                      value={selectedEmployee ? selectedEmployee.department_id : newEmployee.department_id}
                      onChange={(e) =>
                        dialogType === "add"
                          ? setNewEmployee({ ...newEmployee, department_id: e.target.value })
                          : setSelectedEmployee({ ...selectedEmployee, department_id: e.target.value })
                      }
                      
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-2">Password</label>
                    <input
                      type="text"
                      className="p-2 border w-full"
                      value={selectedEmployee ? selectedEmployee.password : newEmployee.password}
                      onChange={(e) =>
                        dialogType === "add"
                          ? setNewEmployee({ ...newEmployee, password: e.target.value })
                          : setSelectedEmployee({ ...selectedEmployee, password: e.target.value })
                      }
                      
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
              </>
            )}
          </div>
        </div>
      )}
    </div>
    </Sidebar>
  );
}

export default ManageUsers;
