import React from "react";

function Attendance() {
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
      </div><br />
      <center><button onClick={SubmitEvent} className="bg-blue-500 p-2 rounded-md text-white mt-[200px] ml-[950px]">Submit</button></center>

    </div>
  );
}

export default Attendance;
