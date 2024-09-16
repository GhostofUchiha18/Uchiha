import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LeaveRequest = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await axios.get('http://localhost:8000/leave_request');
        setLeaveRequests(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching leave requests:", error);
        setLoading(false);
      }
    };

    fetchLeaveRequests();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`http://localhost:8000/leaveRequests/${id}`, { status });
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
    <body className='bg-[#F5FFFA]'>
            <div className='p-8'>
      <h1 className='text-3xl font-bold mb-6 text-[#02C46A]'>Leave Requests</h1>
      <table className="table-auto bg-white w-full">
        <thead>
          <tr className='bg-[#02C46A] text-black'>
            <th className="px-4 py-2 w-96">Employee Name</th>
            <th className="px-4 py-2 w-56">Leave Date</th>
            <th className="px-4 py-2 w-56">Duration</th>
            <th className="px-4 py-2 w-[1000px]">Reason</th>
            <th className="px-4 py-2 w-56">Status</th>
          </tr>
        </thead>
        <tbody className='bg-[#E5F9EF]'>
          {leaveRequests.map((request) => (
            <tr key={request.id}>
              <td className="border px-4 py-2">{request.employeeName}</td>
              <td className="border px-4 py-2">{request.leaveDate}</td>
              <td className="border px-4 py-2">{request.duration}</td>
              <td className="border px-4 py-2">{request.reason}</td>
              <td className="border px-4 py-2">
                <select
                  value={request.status}
                  onChange={(e) => handleStatusChange(request.id, e.target.value)}
                  className="p-2 border rounded"
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approve</option>
                  <option value="Rejected">Reject</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </body>

  );
};

export default LeaveRequest;
