"use client"
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

const ReportPage = () => {
  const [reports, setReports] = useState<Array<any>>([])
  useEffect(() => {
    const fetchData = async () => {

      let data = await fetch(`http://localhost:3056/api/v1/report/all?type=User`, {
        cache: "no-cache",
      });
      let res = await data.json();

      let data2 = await fetch(`http://localhost:3056/api/v1/report/all?type=Trip`, {
        cache: "no-cache",
      });
      let res2 = await data2.json();
      // const users = res.metadata as Array<any>;
      setReports([...res.metadata, ...res2.metadata])

    }
    fetchData()
    return () => {
      setReports([])
    }
  }, [])
  console.log(reports)
  return (
    <>
      {reports.length > 0 &&
        <Table responsive bordered hover>
          <thead className="bg-light">
            <tr>
              <th aria-label="Photo">Avatar</th>
              <th>
                User
              </th>
              <th>Status</th>
              <th>Content</th>
              <th aria-label="Action">Action</th>
            </tr>
          </thead>
          <tbody>
            {reports
              .map((report: any) => (
                <tr>
                  <td>
                    <div
                      className="position-relative mx-auto"
                      style={{ width: "70px", height: "70px" }}
                    >
                      <Image
                        fill
                        style={{ objectFit: "contain" }}
                        alt={report.user.avatarUrl}
                        sizes="5vw"
                        src={report.user.avatarUrl}
                      />
                    </div>
                  </td>
                  <td>{report.user.firstName + " " + report.user.lastName}</td>
                  <td>
                    <div
                    >
                      {report.state}
                    </div>
                  </td>
                  <td>
                    <div
                    >
                      {report.details}
                    </div>
                  </td>
                  <td>
                    <div style={{ justifyContent: 'center', display: "flex" }}>
                      <Link className="btn btn-info" href={`reports/${report._id}`}>
                        View Detail
                      </Link>
                    </div>


                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      }
    </>
  );
};

export default ReportPage;
