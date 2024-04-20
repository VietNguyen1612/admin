"use client"


import UserActiveType from '@/components/User/UserActiveTypeLabel'
import { returnFormattedDate } from '@/hooks/regex'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Table } from 'react-bootstrap'

function Index() {
    const [ads, setAds] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`http://localhost:3056/api/v1/ads`)
            setAds(res.data['metadata'])
        }
        fetchData()
    }, [])

    const returnExpriyDate = (dateString: string) => {
        let date = new Date(dateString);
        date.setDate(date.getDate() + 5);
        dateString = date.toString()
        return returnFormattedDate(dateString)
    }
    return (
        <div>
            <Table responsive bordered hover>
                <thead className="bg-light">
                    <tr>
                        <th aria-label="Photo">Photo</th>
                        <th className="text-center">
                            UserName
                        </th>
                        <th className="text-center">Valid Status</th>
                        <th className="text-center">Paid Status</th>
                        <th className="text-center">Expired Status</th>
                        <th className="text-center">Paid At</th>
                        <th className="text-center">Expires At</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {ads.map((ad: any) => {
                        console.log(ad)
                        return (
                            <tr key={ad._id}>
                                <td>
                                    <div
                                        className="position-relative mx-auto"
                                        style={{ width: "70px", height: "70px" }}
                                    >
                                        <Image
                                            fill
                                            style={{ objectFit: "contain" }}
                                            alt={ad.image}
                                            sizes="5vw"
                                            src={ad.image}
                                        />
                                    </div>
                                </td>
                                <td >
                                    <div className="
                            text-center 
                            d-flex 
                            justify-content-center 
                            align-items-center"
                                        style={{ height: '85px' }}>
                                        {ad.userId.firstName + " " + ad.userId.lastName}
                                    </div>

                                </td>
                                <td >
                                    <div className="
                            text-center 
                            d-flex 
                            flex-column                
                            justify-content-center 
                            align-items-center"
                                        style={{ height: '85px' }}>
                                        {(ad.isValid).toString()}
                                    </div>

                                </td>
                                <td >
                                    <div className="
                            text-center 
                            d-flex 
                            flex-column                
                            justify-content-center 
                            align-items-center"
                                        style={{ height: '85px' }}>{(ad.isPaid).toString()}</div>
                                </td>
                                <td >
                                    <div className="
                            text-center 
                            d-flex 
                            flex-column                
                            justify-content-center 
                            align-items-center"
                                        style={{ height: '85px' }}>
                                        {(ad.isExpired).toString()}
                                    </div>
                                </td>
                                <td >
                                    <div className="
                            text-center 
                            d-flex 
                            flex-column                
                            justify-content-center 
                            align-items-center"
                                        style={{ height: '85px' }}>
                                        {ad.paidAt != undefined ? returnFormattedDate(ad.paidAt) : "Chưa thanh toán"}
                                    </div>
                                </td>
                                <td >
                                    <div className="
                            text-center 
                            d-flex 
                            flex-column                
                            justify-content-center 
                            align-items-center"
                                        style={{ height: '85px' }}>
                                        {
                                            ad.paidAt != undefined ?
                                                returnExpriyDate(ad.paidAt)
                                                : "Chưa thanh toán"
                                        }
                                    </div>
                                </td>
                                <td>
                                    <Dropdown align="end">
                                        <div className="
                            text-center 
                            d-flex 
                            flex-column                
                            justify-content-center 
                            align-items-center"
                                            style={{ height: '85px' }}>
                                            <DropdownToggle
                                                as="button"
                                                bsPrefix="btn"
                                                className="btn-link rounded-0 text-black-50 shadow-none p-0"
                                            //   id={`action-${user._id}`}
                                            >
                                                <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                                            </DropdownToggle>
                                        </div>


                                        <DropdownMenu>
                                            <DropdownItem >Info</DropdownItem>
                                            <Link href={`users/`} passHref legacyBehavior>
                                                <DropdownItem>Edit</DropdownItem>
                                            </Link>
                                            <DropdownItem className="text-danger" href="#/action-3">
                                                Block
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default Index