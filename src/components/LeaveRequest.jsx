import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './sidebar';
import { useNavigate } from 'react-router-dom';
const LeaveRequest = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.error("No access token found. Redirecting to login.");
          navigate("/login");
          return;
        }

        const response = await axios.get('http://localhost:8000/leave_request', {
          headers: { Authorization: `Bearer ${token}` } // Include token in request headers
        });
        
        // Assuming response.data is an array of LeaveRequestResponseDTO
        setLeaveRequests(response.data);
      } catch (error) {
        console.error("Error fetching leave requests:", error);
        // You can handle specific error responses here if needed
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchLeaveRequests();
  }, [navigate]); // Add navigate as a dependency

  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.put(`http://localhost:8000/leaveRequests/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLeaveRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id ? { ...request, status } : request
        )
      );
    } catch (error) {
      console.error("Error updating leave request status:", error);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading leave requests...</div>;
  }

  return (
    <Sidebar>
      <div className="bg-[#F5FFFA] p-8 ml-64">
        <h1 className="text-3xl font-bold mb-6 text-[#02C46A]">Leave Requests</h1>
        <table className="bg-[#E5F9EF] w-full">
          <thead className="bg-[#02C46A]">
            <tr>
              <th className="px-4 py-2">User Name</th>
              <th className="px-4 py-2">Leave Type</th>
              <th className="px-4 py-2">Start Date</th>
              <th className="px-4 py-2">End Date</th>
              <th className="px-4 py-2">Reason</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((request) => (
              <tr key={request.id}>
                <td className="px-4 py-2">{request.user_id}</td>
                <td className="px-4 py-2">{request.leave_type}</td>
                <td className="px-4 py-2">{request.start_date}</td>
                <td className="px-4 py-2">{request.end_date}</td>
                <td className="px-4 py-2">{request.reason}</td>
                <td className="px-4 py-2">
                  <select
                    value={request.status}
                    onChange={(e) => handleStatusChange(request.id, e.target.value)}
                    className="p-2 border rounded"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="APPROVED">Approve</option>
                    <option value="REJECTED">Reject</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Sidebar>
  );
};

export default LeaveRequest;