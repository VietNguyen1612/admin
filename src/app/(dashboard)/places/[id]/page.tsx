"use client"

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button, Card, Carousel, Table } from "react-bootstrap";

const Index = ({ params }: { params: { id: string } }) => {
    const [place, setPlace] = useState<any>()
    const [search, setSearch] = useState('');
    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            const userListURL = `http://localhost:3056/api/v1/place/get-place/${params.id}`;
            const data = await axios.get(userListURL)

            setPlace(data.data.metadata)
        }
        fetchData()
    }, [])
    return (
        <div className="">
            {place &&
                <div className="row">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Place Image</div>
                            <div className="card-body">
                                <ul>
                                    {place.images.length > 0 && (
                                        <li className="list-group-item">
                                            <span className="fw-bold"> Images:</span>
                                        </li>
                                    )}
                                    <Carousel controls={place.images.length > 1} data-bs-theme="dark">
                                        {place.images.map((imageUrl: string, index: number) => (
                                            <Carousel.Item>
                                                <img
                                                    style={{ width: '100%', height: '15rem', objectFit: 'contain' }}
                                                    src={imageUrl}
                                                    alt={`Citizen ID Image ${index + 1}`}
                                                    className="img-fluid"
                                                />
                                            </Carousel.Item>

                                        ))}
                                    </Carousel>

                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-header">Place Details</div>
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <span className="fw-bold">ID:</span> {place._id}
                                    </li>
                                    <li className="list-group-item">
                                        <span className="fw-bold">Place ID:</span> {place.place_id}
                                    </li>
                                    <li className="list-group-item">
                                        <span className="fw-bold">Name: </span> {place.name}
                                    </li>
                                    <li className="list-group-item">
                                        <span className="fw-bold">Address: </span> {place.address}
                                    </li>
                                    <li className="list-group-item">
                                        <span className="fw-bold">Phone: </span> {place.phone}
                                    </li>
                                    <li className="list-group-item">
                                        <div className="fw-bold">Coordinates: </div>
                                        <div>Long: {place.geolocation.coordinates[0]}</div>
                                        <div>Lat: {place.geolocation.coordinates[1]}</div>
                                    </li>
                                    <li className="list-group-item">
                                        <span className="fw-bold">Tags: </span>
                                        {place.tags.map((tag: any) => (
                                            <div>{tag.name}</div>
                                        ))}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </div>
    );
};

export default Index;
