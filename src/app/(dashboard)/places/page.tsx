"use client"

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";

const PlacesPage = () => {
  const [places, setPlaces] = useState([])
  const [search, setSearch] = useState('');
  const router = useRouter()
  useEffect(() => {
    const fetchData = async () => {
      const userListURL = `http://localhost:3056/api/v1/place/admin/page`;
      const data = await axios.get(userListURL)

      setPlaces(data.data.metadata)
    }
    fetchData()
  }, [])
  const handleSearch = (event: any) => {
    setSearch(event.target.value);
  };

  const filteredPlaces = places.filter((place: any) =>
    place.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <input
        style={{ width: '100%', marginBottom: '15px' }}
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={handleSearch}
      />
      <Button style={{ marginBottom: '15px' }} onClick={() => router.push('./add-place')}>Add place</Button>
      <Table responsive bordered hover>
        <thead className="bg-light">
          <tr>
            <th className="text-center">Name</th>
            <th className="text-center">Province</th>
            <th className="text-center">Image</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlaces.map((place: any) => (
            <tr key={place._id}>
              <td className="text-center">
                <div style={{ maxWidth: '200px' }}>
                  {place.name}
                </div>

              </td>
              <td className="text-center">{place.province}</td>
              <td>
                <div
                  className="position-relative mx-auto"
                  style={{ width: "150px", height: "150px" }}
                >
                  <Image
                    fill
                    style={{ objectFit: "cover" }}
                    alt={place.images[0]}
                    src={place.images[0]}
                  />
                </div>
              </td>
              <td className="text-center">
                <div>
                  <Button
                    onClick={() => { router.push(`./places/${place.place_id}`) }}>
                    Detail</Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default PlacesPage;
