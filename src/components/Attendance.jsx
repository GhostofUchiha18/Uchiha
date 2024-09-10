import React from "react";
import { useState, useEffect } from "react";

function Attendance() {
    const App = () => {
        const [items, setItems] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
      
        useEffect(() => {
          fetch("http://127.0.0.1:8000/attendance/users")  // Adjust the URL as per your endpoint
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then((data) => {
              setItems(data);
              setLoading(false);
            })
            .catch((error) => {
              setError(error);
              setLoading(false);
            });
        }, []);
      
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error: {error.message}</div>;
    }

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
          <tr>
              <th className="px-4 py-2 font-normal w-64">Shikshya Neupane</th>
              <th className="px-4 py-2"><center><input type="time" /></center></th>
              <th className="px-4 py-2"><center><input type="time" /></center></th>
              <th className="px-4 py-2"><select name="" id=""><option value="">Absent</option><option value="">Present</option><option value="">Late</option></select></th>
            </tr>
            <tr>
              <th className=" px-4 py-2 font-normal">Ujjwal Sah</th>
              <th className=" px-4 py-2"><center><input type="time" /></center></th>
              <th className=" px-4 py-2"><center><input type="time" /></center></th>
              <th className=" px-4 py-2"><select name="" id=""><option value="">Absent</option><option value="">Present</option><option value="">Late</option></select></th>
            </tr>
            <tr>
              <th className=" px-4 py-2 font-normal">Garima Bhattrai</th>
              <th className=" px-4 py-2"><center><input type="time" /></center></th>
              <th className=" px-4 py-2"><center><input type="time" /></center></th>
              <th className=" px-4 py-2"><select name="" id=""><option value="">Absent</option><option value="">Present</option><option value="">Late</option></select></th>
            </tr>
            <tr>
              <th className=" px-4 py-2 font-normal">Srijan Napit</th>
              <th className=" px-4 py-2"><center><input type="time" /></center></th>
              <th className="px-4 py-2"><center><input type="time" /></center></th>
              <th className="px-4 py-2"><select name="" id=""><option value="">Absent</option><option value="">Present</option><option value="">Late</option></select></th>
            </tr>
            
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Attendance;
