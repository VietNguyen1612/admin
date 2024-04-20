"use client";
// import { redirect } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";

interface AutoExpandingTextareaProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const AutoExpandingTextarea: React.FC<AutoExpandingTextareaProps> = ({ value, onChange }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${(textareaRef.current.scrollHeight + 5)}px`;
    }
  }, [value]);

  return (
    <textarea

      ref={textareaRef}
      value={value}
      onChange={onChange}
      style={{ width: '100%' }}
    />
  );
};

const ConfirmDetail = (props: any) => {
  const {
    _id,
    user,
    avatarUrl: initialAvatarUrl,
    status: initialStatus,
    phone: initialPhone,
    firstName: initialFirstName,
    lastName: initialLastName,
    email,
    dob: initialDob,
    citizen_id: initialCitizenId,
    citizen_images,
    createdAt,
    updatedAt,
  } = props.metadata

  const [phone, setPhone] = useState(initialPhone);
  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [dob, setDob] = useState(initialDob);
  const [citizen_id, setCitizenId] = useState(initialCitizenId);
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl)

  const handleApprove = async () => {
    // console.log('ccc')
    "use client"
    const res = await fetch(
      `http://localhost:3056/api/v1/user/update/${user}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", // Send data as JSON
        },
        body: JSON.stringify({
          phone: phone,
          firstName: firstName,
          lastName: lastName,
          attributes: {
            citizen_id: citizen_id
          },
          avatarUrl: avatarUrl
        }),
        cache: "no-cache",
      }
    ).then(res => console.log(res))

    const response = await fetch(
      "http://localhost:3056/api/v1/confirm/approved",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Send data as JSON
        },
        body: JSON.stringify({ id: _id }),
        cache: "no-cache",
      }
    );
    window.location.reload();
  };
  return (
    <div>
      {initialStatus == "pending" ?
        <div className="">
          <div className="row">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header">User Image</div>
                <div className="card-body">
                  <ul>
                    {citizen_images.length > 0 && (
                      <li className="list-group-item">
                        <span className="fw-bold">Citizen ID Images:</span>
                      </li>
                    )}
                    {citizen_images.map((imageUrl: string, index: number) => (
                      <li className="list-group-item" key={index}>
                        <img
                          src={imageUrl}
                          alt={`Citizen ID Image ${index + 1}`}
                          className="img-fluid"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-header">User Details</div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <span className="fw-bold">User ID:</span> {user}
                    </li>

                    <li className="list-group-item">
                      <span className="fw-bold">AvatarUrl:</span>
                      {avatarUrl && <img src={avatarUrl} alt="Avatar" style={{ maxWidth: '100%' }} />}
                      {/* <textarea
                        style={{ width: '100%', height: '100%' }}
                        aria-multiline={true}
                        value={avatarUrl}
                        id="avatarUrl"
                        name="avatarUrl"
                        onChange={(e) => setAvatarUrl(e.target.value)}
                      /> */}
                      <AutoExpandingTextarea
                        value={avatarUrl}
                        onChange={(e: any) => setAvatarUrl(e.target.value)}
                      />
                    </li>
                    <li className="list-group-item">
                      <span className="fw-bold">Status:</span> {initialStatus}

                    </li>
                    <li className="list-group-item">
                      <span className="fw-bold">Phone Number:</span> {phone}

                    </li>
                    <li className="list-group-item">
                      <span className="fw-bold">First Name:</span>
                      <input
                        value={firstName}
                        id="firstName"
                        name="firstName"
                        type="text"
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </li>
                    <li className="list-group-item">
                      <span className="fw-bold">Last Name:</span>
                      <input
                        value={lastName}
                        id="lastName"
                        name="lastName"
                        type="text"
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </li>
                    <li className="list-group-item">
                      <span className="fw-bold">Date of Birth:</span>
                      <input
                        value={dob}
                        id="dob"
                        name="dob"
                        type="date"
                        onChange={(e) => setDob(e.target.value)}
                      />
                    </li>
                    <li className="list-group-item">
                      <span className="fw-bold">Citizen ID:</span>
                      <input
                        value={citizen_id}
                        id="citizenId"
                        name="citizenId"
                        type="text"
                        onChange={(e) => setCitizenId(e.target.value)}
                      />
                    </li>
                    <li className="list-group-item">
                      <span className="fw-bold">Created At:</span>{" "}
                      {new Date(createdAt).toLocaleDateString()}
                    </li>
                    <li className="list-group-item">
                      <span className="fw-bold">Updated At:</span>{" "}
                      {new Date(updatedAt).toLocaleDateString()}
                    </li>
                  </ul>

                  <div className="d-flex justify-content-center gap-3">
                    <button onClick={handleApprove} className="btn btn-info">Approve</button>
                    <button className="btn btn-danger">Reject</button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        : <div className="">
          <div className="row">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header">User Image</div>
                <div className="card-body">
                  <ul>
                    {citizen_images.length > 0 && (
                      <li className="list-group-item">
                        <span className="fw-bold">Citizen ID Images:</span>
                      </li>
                    )}
                    {citizen_images.map((imageUrl: string, index: number) => (
                      <li className="list-group-item" key={index}>
                        <img
                          src={imageUrl}
                          alt={`Citizen ID Image ${index + 1}`}
                          className="img-fluid"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-header">User Details</div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <span className="fw-bold">User ID:</span> {user}
                    </li>

                    <li className="list-group-item">
                      <span className="fw-bold">AvatarUrl: </span>
                      {avatarUrl}
                      {avatarUrl && <img src={avatarUrl} alt="Avatar" style={{ maxWidth: '100%' }} />}

                    </li>
                    <li className="list-group-item">
                      <span className="fw-bold">Status:</span> {initialStatus}
                    </li>
                    <li className="list-group-item">
                      <span className="fw-bold">Phone Number:</span> {phone}
                    </li>
                    <li className="list-group-item">
                      <span className="fw-bold">First Name:</span> {firstName}

                    </li>
                    <li className="list-group-item">
                      <span className="fw-bold">Last Name:</span> lastName

                    </li>
                    <li className="list-group-item">
                      <span className="fw-bold">Date of Birth:</span> {dob}

                    </li>
                    <li className="list-group-item">
                      <span className="fw-bold">Citizen ID:</span> {citizen_id}

                    </li>
                    <li className="list-group-item">
                      <span className="fw-bold">Created At:</span>{" "}
                      {new Date(createdAt).toLocaleDateString()}
                    </li>
                    <li className="list-group-item">
                      <span className="fw-bold">Updated At:</span>{" "}
                      {new Date(updatedAt).toLocaleDateString()}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default ConfirmDetail;
