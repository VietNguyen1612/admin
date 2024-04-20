import Image from "next/image";
import React from "react";

const ReportDetail = async ({ params }: { params: { id: string } }) => {
  const res = await fetch(
    `http://localhost:3056/api/v1/report/view?type=User&id=${params.id}`
  );
  const { metadata } = await res.json();
  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex align-items-center justify-content-between gap-2 border px-5">
        <div className="d-flex align-items-center gap-2">
          <Image
            src={metadata.user.avatarUrl}
            width={100}
            height={100}
            alt="aa"
          />
          <div> {metadata.user.firstName + metadata.user.lastName}</div>
        </div>
        <h5>TO</h5>
        <div className="d-flex align-items-center gap-2">
          <Image
            src={metadata.targetEntityId.avatarUrl}
            width={100}
            height={100}
            alt="aa"
          />
          <div>
            {" "}
            {metadata.targetEntityId.firstName +
              metadata.targetEntityId.lastName}
          </div>
        </div>
      </div>
      <div className="px-5">
        <pre>{metadata.details}</pre>
      </div>
      <div>
        <div>
          <p>Evidences: </p>
          {metadata.images.length > 0 ? (
            metadata.images.maps((image: string) => (
              <Image src={image} alt={image} width={300} height={300} />
            ))
          ) : (
            <p>None</p>
          )}
        </div>
      </div>
      <div className="d-flex gap-3">
        <button className="btn btn-info">Approve</button>
        <button className="btn btn-danger">Reject</button>
      </div>
    </div>
  );
};

export default ReportDetail;
