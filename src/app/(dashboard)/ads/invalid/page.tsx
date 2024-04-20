"use client"


import UserActiveType from '@/components/User/UserActiveTypeLabel'
import { returnFormattedDate } from '@/hooks/regex'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Modal, Table } from 'react-bootstrap'

function Index() {
    const [ads, setAds] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [denyReason, setDenyReason] = useState("")
    const [reload, setReload] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(
                `http://localhost:3056/api/v1/ads?isValid=false&isPaid=false&isExpired=false`
            )
            setAds(res.data['metadata'])
        }
        fetchData()
    }, [reload])

    const returnExpriyDate = (dateString: string) => {
        let date = new Date(dateString);
        date.setDate(date.getDate() + 5);
        dateString = date.toString()
        return returnFormattedDate(dateString)
    }

    const validate = async ({ id, isValid, msg }: { id: string, isValid: boolean, msg?: string }) => {
        const res = await axios.patch(
            `http://localhost:3056/api/v1/ads/validate`,
            {
                "advertisementId": id,
                "isValid": isValid,
                "msg": msg ? msg : ""
            }
        )
    }

    const renderModal = (id: string) => {
        return (
            <Modal show={openModal} onHide={() => { setOpenModal(false) }}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="fw-bold w-100">Deny reason:</div>
                    <input
                        className="w-100"
                        value={denyReason}
                        id="firstName"
                        name="firstName"
                        type="text"
                        onChange={(e) => setDenyReason(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { setOpenModal(false) }}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => {
                        validate({ id: id, isValid: false, msg: denyReason })
                        window.alert('validate success')
                        setReload(!reload)
                        setOpenModal(false)
                    }}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    const handleApprove = (id: string) => {
        validate({ id: id, isValid: true })
        window.alert('validate success')
        setReload(!reload)
    }
    const handleReject = () => {
        setOpenModal(true)
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
                            <>
                                {openModal && renderModal(ad._id)}
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
                                        <div className="
                            text-center 
                            d-flex       
                            justify-content-center 
                            align-items-center"
                                            style={{ height: '85px' }}>
                                            <Button
                                                className='mx-auto bg-success'
                                                onClick={() => handleApprove(ad._id)}>
                                                approve</Button>
                                            <Button
                                                className='bg-danger'
                                                onClick={handleReject}>
                                                reject</Button>
                                        </div>
                                    </td>
                                </tr>
                            </>

                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default Index