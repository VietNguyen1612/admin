import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Table } from "react-bootstrap";

const ConfirmPage = async () => {
  const res = await fetch(`http://localhost:3056/api/v1/confirm/all`, {
    cache: "no-cache",
  });
  const data = await res.json();
  const confirms = data.metadata as Array<any>;
  return (
    <Table responsive bordered hover>
      <thead className="bg-light">
        <tr>
          <th aria-label="Photo">Avatar</th>
          <th>
            Name
          </th>
          <th>Status</th>
          <th aria-label="Action">Action</th>
        </tr>
      </thead>
      <tbody>
        {confirms
          // .filter((confirm: any) => confirm.status === "pending")
          .map((confirm: any) => (
            <tr>
              <td>
                <div
                  className="position-relative mx-auto"
                  style={{ width: "70px", height: "70px" }}
                >
                  <Image
                    fill
                    style={{ objectFit: "contain" }}
                    alt={confirm.avatarUrl}
                    sizes="5vw"
                    src={confirm.avatarUrl}
                  />
                </div>
              </td>
              <td>{confirm.firstName + " " + confirm.lastName}</td>
              <td>
                <div
                >
                  {confirm.status}
                </div>
              </td>
              <td>
                <div style={{ justifyContent: 'center', display: "flex" }}>
                  <Link className="btn btn-info" href={`confirm/${confirm._id}`}>
                    View Detail
                  </Link>
                </div>


              </td>
            </tr>

          ))}
      </tbody>
    </Table>
  );
};

export default ConfirmPage;
