import React, { useState, useEffect } from "react";
import axios from "axios";

function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8000/user');
        setEmployees(response.data.data);
        setAttendanceData(response.data.data.map(employee => ({
          employeeId: employee.id,
          checkIn: employee.check_in,
          checkOut: employee.check_out,
          status: employee.status,
        })));
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleInputChange = (index, field, value) => {
    const updatedData = [...attendanceData];
    updatedData[index][field] = value;
    setAttendanceData(updatedData);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        attendances: attendanceData.map(data => ({
          user_id: data.employeeId,
          check_in: data.checkIn,
          check_out: data.checkOut,
          status: data.status,
          date: new Date().toISOString().split('T')[0],
        })),
      };

      console.log('Submitting attendance data:', payload);
      const response = await axios.post('http://localhost:8000/attendance', payload);
      console.log('Attendance data submitted:', response.data);
    } catch (error) {
      console.error('Error submitting attendance data:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="bg-[#F5FFFA] p-8">
      <h1 className="text-3xl font-bold text-center text-[#02C46A]">Attendance List</h1>
      <div className="mt-8">
        <input type="date" className="border p-2 mb-4" />
        <table className="bg-[#E5F9EF] w-full">
          <thead className="bg-[#0EC471]">
            <tr>
              <th className="px-4 py-2">Employee Name</th>
              <th className="px-4 py-2">Check-In</th>
              <th className="px-4 py-2">Check-Out</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={employee.id}>
                <td className="px-4 py-2">{employee.name}</td>
                <td className="px-4 py-2">
                  <input
                    type="time"
                    value={attendanceData[index]?.checkIn}
                    onChange={(e) => handleInputChange(index, 'checkIn', e.target.value)}
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="time"
                    value={attendanceData[index]?.checkOut}
                    onChange={(e) => handleInputChange(index, 'checkOut', e.target.value)}
                  />
                </td>
                <td className="px-4 py-2">
                  <select
                    value={attendanceData[index]?.status}
                    onChange={(e) => handleInputChange(index, 'status', e.target.value)}
                  >
                    <option value="" disabled selected>Select status</option>
                    <option value="Absent" className="text-red-600">Absent</option>
                    <option value="Present" className="text-green-600">Present</option>
                    <option value="Late" className="text-gray-500">Late</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Attendance;
