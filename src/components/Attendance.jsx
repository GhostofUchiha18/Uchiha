import React, { useState, useEffect } from "react";
import axios from "axios";

function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    // Fetch employee data from the API
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
      // Wrap attendanceData in an object with the key 'attendances' to match AttendanceListDTO
      const payload = {
        attendances: attendanceData.map(data => ({
          user_id: data.employeeId,
          check_in: data.checkIn,
          check_out: data.checkOut,
          status: data.status,
          date: new Date().toISOString().split('T')[0], // Or get this value from your date input field
        })),
      };
  
      console.log('Submitting attendance data:', payload);
  
      // Send the data as a JSON object to the backend
      const response = await axios.post('http://localhost:8000/attendance', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Attendance data submitted:', response.data);
    } catch (error) {
      console.error('Error submitting attendance data:', error.response ? error.response.data : error.message);
    }
  };
  
  

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold text-center">Attendance List</h1>
      <div className="mt-8">
        <input type="date" className="border p-2 mb-4" />
        <table>
          <thead>
            <tr className="bg-gray-300">
              <th className="border border-gray-300 px-4 py-2 w-64">Employee Name</th>
              <th className="border border-gray-300 px-4 py-2 w-64">Check-In</th>
              <th className="border border-gray-300 px-4 py-2 w-64">Check-Out</th>
              <th className="border border-gray-300 px-4 py-2 w-64">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={employee.id}>
                <td className="px-4 py-2 font-normal w-64">{employee.name}</td>
                <td className="px-4 py-2">
                  <center>
                    <input
                      type="time"
                      value={attendanceData[index]?.checkIn}
                      onChange={(e) => handleInputChange(index, 'checkIn', e.target.value)}
                    />
                  </center>
                </td>
                <td className="px-4 py-2">
                  <center>
                    <input
                      type="time"
                      value={attendanceData[index]?.checkOut}
                      onChange={(e) => handleInputChange(index, 'checkOut', e.target.value)}
                    />
                  </center>
                </td>
                <td className="px-4 py-2">
                  <center>
                  <select
                    value={attendanceData[index]?.status}
                    onChange={(e) => handleInputChange(index, 'status', e.target.value)}
                  >
                    <option value="" disabled>Select status</option>
                    <option value="Absent" className="text-red-600">Absent</option>
                    <option value="Present" className="text-green-600">Present</option>
                    <option value="Late" className="text-gray-500">Late</option>
                  </select>
                  </center>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div><br />
      <center>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 p-2 rounded-md text-white mt-[40px]"
        >
          Submit
        </button>
      </center>
    </div>
  );
}

export default Attendance;
