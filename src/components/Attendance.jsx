import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";

function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          navigate("/login");
          return;
        }

        // Fetch employees
        const employeesResponse = await axios.get('http://localhost:8000/user', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const fetchedEmployees = employeesResponse.data.data;
        setEmployees(fetchedEmployees);

        // Fetch attendance data for the selected date
        const attendanceResponse = await axios.get(`http://localhost:8000/attendance/date/${selectedDate}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const fetchedAttendance = attendanceResponse.data.data[0]?.employees || [];

        // Map attendance data to employees
        const mappedAttendance = fetchedEmployees.map(employee => {
          const attendanceRecord = fetchedAttendance.find(record => record.user_id === employee.id);
          return {
            employeeId: employee.id,
            name: employee.name,
            checkIn: attendanceRecord?.check_in || "11:00",
            checkOut: attendanceRecord?.check_out || "17:00",
            status: attendanceRecord?.status || "Present",
          };
        });

        setAttendanceData(mappedAttendance);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("isAuthenticated");
          localStorage.removeItem("accessToken");
          navigate("/login");
        }
      }
    };

    fetchData();
  }, [navigate, selectedDate]);

  const handleInputChange = (index, field, value) => {
    const updatedData = [...attendanceData];
    updatedData[index][field] = value;
    setAttendanceData(updatedData);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        navigate("/login");
        return;
      }

      const payload = {
        date: selectedDate,
        employees: attendanceData.map(data => ({
          user_id: data.employeeId,
          check_in: data.checkIn,
          check_out: data.checkOut,
          status: data.status,
        })),
      };

      console.log('Submitting attendance data:', payload);
      const response = await axios.post('http://localhost:8000/attendance', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Attendance data submitted:', response.data);
    } catch (error) {
      console.error('Error submitting attendance data:', error.response ? error.response.data : error.message);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("accessToken");
        navigate("/login");
      }
    }
  };

  return (
    <Sidebar>
      <div className="bg-[#F5FFFA] p-8 ml-64">
        <h1 className="text-3xl font-bold text-center text-[#02C46A]">Attendance List</h1>
        <div className="mt-8">
          <input 
            type="date" 
            className="border p-2 mb-4" 
            value={selectedDate}
            onChange={handleDateChange}
          />
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
              {attendanceData.map((attendance, index) => (
                <tr key={attendance.employeeId}>
                  <td className="px-4 py-2">{attendance.name}</td>
                  <td className="px-4 py-2">
                    <input
                      type="time"
                      value={attendance.checkIn}
                      onChange={(e) => handleInputChange(index, 'checkIn', e.target.value)}
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="time"
                      value={attendance.checkOut}
                      onChange={(e) => handleInputChange(index, 'checkOut', e.target.value)}
                    />
                  </td>
                  <td className="px-4 py-2">
                    <select
                      value={attendance.status}
                      onChange={(e) => handleInputChange(index, 'status', e.target.value)}
                    >
                      <option value="" disabled>Select status</option>
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
    </Sidebar>
  );
}

export default Attendance;