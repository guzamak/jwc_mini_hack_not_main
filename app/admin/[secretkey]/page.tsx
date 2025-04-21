"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { quizz } from "@/lib/data";

export default function AdminPage() {
  const { secretkey } = useParams();
  const [users, setUsers] = useState<any[] | null>(null);
  const [error, setError] = useState(false);
  const [dateSubmit, setDateSubmit] = useState<string | null>(null);
  const [onlySubmit, setOnlySubmit] = useState<boolean>(false);
  const [filteredUsers, setFilteredUsers] = useState<any[] | null>(null);
  const [onlyApccept, setOnlyApccept] = useState<boolean>(false)
  const [onlyDenied, setOnlyDenied] = useState<boolean>(false)
  const [onlyWating, setOnlyWating] = useState<boolean>(false)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/admin/${secretkey}/user`);
        if (!res.ok) {
          setError(true);
          return;
        }

        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
        setError(true);
      }
    };

    if (secretkey) fetchUsers();
  }, [secretkey]);

  const OnOnlySubmitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOnlySubmit(e.target.checked);
  };
  const OnOnlyAcceptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOnlyApccept(e.target.checked);
  };
  const OnOnlyWatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOnlyWating(e.target.checked);
  };
  const OnOnlyDeniendChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOnlyDenied(e.target.checked);
  };

  const OndateSubmitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value == ""){
      setDateSubmit(null);
    }
    else{
      setDateSubmit(e.target.value);
    }
  };

  
  const handleChangeOnsiteState = (userId: string, newState: string) => {
    if (users) {
      const newUser = [...users];
      const index = newUser.findIndex((u) => u.id === userId);
      if (index !== -1) {
        newUser[index] = {
          ...newUser[index],
          validOnsite: newState,
        };
      }
      setUsers(newUser);
    }
  };

  const handleSaveOnsiteState = async (userId: string, newState: string) => {
    try {
      const res = await fetch(`/api/admin/${secretkey}/user/update/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ onsiteState: newState }),
      });
  
      if (!res.ok) {
        alert("Failed update");
        return;
      }
      
      alert("Onsite state updated!");
    } catch (err) {
      console.error(err);
      alert("Error updating onsite state");
    }
  };
  

  useEffect(() => {
    if (users) {
      const filtered = users.filter((user) => {
        if (user.form) {
          // console.log(user.validOnsite)
          if (onlySubmit && user.form?.alreadySubmit === null) {
            return false;
          }
          if (dateSubmit != null && user.form?.submitDate) {
            return user.form.submitDate.substring(0, 10) === dateSubmit;
          }
          if (onlyApccept){
            return  user.validOnsite == "acceptList"
          }
          if (onlyDenied){
            return user.validOnsite == "deniedList"
          }
          if (onlyWating){
            return user.validOnsite == "waitingList"
          }
          return true;
        } else {
          if (onlySubmit) {
            return false;
          } else {
            return true;
          }
        }
      });
      setFilteredUsers(filtered);
    }
  }, [dateSubmit, onlySubmit, users,onlyApccept,onlyDenied,onlyWating]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin View</h1>

      <div className="mb-4">
        <label className="mr-2">Show only submitted forms:</label>
        <input type="checkbox" onChange={OnOnlySubmitChange} />
      </div>
      <div className="mb-4">
        <label className="mr-2">Show only accept forms:</label>
        <input type="checkbox" onChange={OnOnlyAcceptChange} />
      </div>
      <div className="mb-4">
        <label className="mr-2">Show only waiting forms:</label>
        <input type="checkbox" onChange={OnOnlyWatingChange} />
      </div>
      <div className="mb-4">
        <label className="mr-2">Show only denied forms:</label>
        <input type="checkbox" onChange={OnOnlyDeniendChange} />
      </div>
      <div className="mb-4">
        <label className="mr-2">Select date to filter by submission:</label>
        <input type="date" onChange={OndateSubmitChange} />
      </div>

      {error ? (
        <p className="text-red-500">Secret key incorrect or server error.</p>
      ) : filteredUsers === null ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4">
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <p>
                <strong>ID:</strong> {user.id}
              </p>
              <p>
                <strong>Name:</strong> {user.name || "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {user.email || "N/A"}
              </p>
              <p>
                <strong>Valid Onsite:</strong> {String(user.validOnsite)}
              </p>
              <div className="mt-2">
                <label className="mr-2">Change Onsite Status:</label>
                <select
                  value={
                    user.newOnsiteState ?? user.validOnsite ?? "Didntcheck"
                  }
                  onChange={(e) =>
                    handleChangeOnsiteState(user.id, e.target.value)
                  }
                  className="border p-1 rounded"
                >
                  <option value="acceptList">acceptList</option>
                  <option value="waitingList">waitingList</option>
                  <option value="deniedList">deniedList</option>
                  <option value="Didntcheck">Didntcheck</option>
                </select>
                <button
                  className="ml-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() =>
                    handleSaveOnsiteState(
                      user.id,
                      user.newOnsiteState ?? user.validOnsite ?? "Didntcheck"
                    )
                  }
                >
                  Save
                </button>
              </div>

              {/* Form Data Section */}
              <div className="mt-2">
                <strong>Form Data:</strong>
                {user.form ? (
                  <div>
                    {/* Additional Form Fields */}
                    {user.form.imageData ? (
                      <div className="mb-2">
                        <strong>Submitted Image:</strong>
                        <div className="mt-1">
                          <img src={user.form.imageData} />
                        </div>
                      </div>
                    ) : (
                      "no image"
                    )}
                    <div className="mb-2">
                      <strong>Submit Date:</strong>{" "}
                      {user.form.submitDate ? user.form.submitDate : "N/A"}
                    </div>
                    <div className="mb-2">
                      <strong>Already Submit:</strong>{" "}
                      {user.form.alreadySubmit ? "Yes" : "No"}
                    </div>
                    {user.form.prefix && (
                      <div className="mb-2">
                        <strong>Prefix:</strong> {user.form.prefix}
                      </div>
                    )}

                    <div className="mb-2">
                      <strong>First Name:</strong>{" "}
                      {user.form.firstname || "N/A"}
                    </div>
                    <div className="mb-2">
                      <strong>Surname:</strong> {user.form.surname || "N/A"}
                    </div>
                    <div className="mb-2">
                      <strong>Nickname:</strong> {user.form.nickname || "N/A"}
                    </div>

                    {user.form.date && (
                      <div className="mb-2">
                        <strong>Birthday:</strong> {user.form.date}
                      </div>
                    )}

                    <div className="mb-2">
                      <strong>Email:</strong> {user.form.email || "N/A"}
                    </div>
                    <div className="mb-2">
                      <strong>Phone:</strong> {user.form.phone || "N/A"}
                    </div>
                    <div className="mb-2">
                      <strong>Province:</strong> {user.form.province || "N/A"}
                    </div>
                    <div className="mb-2">
                      <strong>Grade:</strong> {user.form.grade || "N/A"}
                    </div>
                    <div className="mb-2">
                      <strong>School:</strong> {user.form.school || "N/A"}
                    </div>
                    <div className="mb-2">
                      <strong>การเเข่งขันเเละกิจกรรม :</strong>{" "}
                      {user.form.etc || "N/A"}
                    </div>

                    {/* Quiz Questions and Answers */}
                    <ul className="space-y-2">
                      {quizz.map((question, index) => {
                        const answer =
                          user.form.ans[index] || "No answer provided";
                        return (
                          <li
                            key={index}
                            className="bg-gray-100 p-2 rounded text-sm"
                          >
                            <p>
                              <strong>Question {index + 1}: </strong>
                              {question}
                            </p>
                            <p>
                              <strong>Answer: </strong>
                              {answer}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ) : (
                  <p>No form submitted</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}