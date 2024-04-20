"use client"
import { Button, Card, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { newResource, Resource } from "@/models/resource";
import { Pokemon } from "@/models/pokemon";
import useSWRAxios, { transformResponseWrapper } from "@/hooks/useSWRAxios";
import Pagination from "@/components/Pagination/Pagination";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faPlus } from "@fortawesome/free-solid-svg-icons";
import UserList from "@/components/User/UserList";
import { User } from "@/models/user";
import THSort from "@/components/TableSort/THSort";
import Image from "next/image";
import UserActiveType from "@/components/User/UserActiveTypeLabel";
import Link from "next/link";

export default function Index() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const userListURL = `http://localhost:3056/api/v1/user` || "";
      const data = await fetch(userListURL);
      const res = await data.json();
      // const users = res.metadata as Array<any>;
      setUsers(res.metadata)
    }
    fetchData()
  }, [])
  return (
    // <Card>
    //   <Card.Header>Users</Card.Header>
    //   <Card.Body>

    //   </Card.Body>
    // </Card>
    <div>
      <UserList users={users} />
    </div>
  );
}
