"use client";
import { VIETNAM_PROVINCES } from "@/hooks/regex";
import { Button, Chip, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
const AddPlacePage = () => {
  const [tags, setTags] = useState<any[]>([]);
  const [selectTags, setSelectTags] = useState<any[]>([]);
  const [place, setPlace] = useState({
    name: "",
    place_id: "",
    type: "tourist_attraction",
    address: "",
    images: [""],
    website: "",
    phone: "",
    province: 'DA_NANG',
    city: "",
    geolocation: {
      type: "Point",
      coordinates: [],
    },
  });


  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:3056/api/v1/tag`
      )
      setTags(res.data['metadata'])
    }
    fetchData()
  }, [])
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    if (name === "coordinates") {
      setPlace({
        ...place,
        geolocation: {
          ...place.geolocation,
          coordinates: value.split(",").map(Number),
        },
      });
    } else if (name === "type") {
      setPlace({
        ...place,
        geolocation: { ...place.geolocation, type: value },
      });
    } else if (name === "images") {
      setPlace({ ...place, images: value.split(",") });
    } else {
      setPlace({ ...place, [name]: value });
    }
  };



  const handleSubmit = async (event: any) => {
    event.preventDefault()
    try {
      const tagIds = selectTags.map((item) => item._id)
      const tagNames = selectTags.map((item) => item.name)
      const response = await axios.post('http://localhost:3056/api/v1/place', place);
      const responsetag = await axios.post(`http://localhost:3056/api/v1/tag/place/${place.place_id}`, {
        "tags": tagIds
      });
      const responseML = await axios.post(`https://exotic-filly-publicly.ngrok-free.app/places`, {

        "id": place.place_id,
        "title": place.name,
        "tags": tagNames

      });
      console.log(response.data)
      console.log(responsetag.data)
      console.log(responseML.data)
      // console.log(place)
    } catch (err) {
      console.log(err)
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth margin="normal">
        <TextField label="Name" name="name" value={place.name} onChange={handleInputChange} required />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField label="Place ID" name="place_id" value={place.place_id} onChange={handleInputChange} required />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Select tags</InputLabel>
        <Select
          value=""
          onChange={(event) => {
            const selectedTag = tags.find((tag: any) => tag._id === event.target.value);
            setSelectTags([...selectTags, selectedTag]);
          }}
        >
          <MenuItem value="">
            <em>Select tags</em>
          </MenuItem>
          {tags.filter((tag: any) => !selectTags.map(t => t._id).includes(tag._id)).map((tag: any) => (
            <MenuItem key={tag._id} value={tag._id}>
              {tag.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Stack direction="row" spacing={1}>
        {selectTags.map((tag: any) => (
          <Chip
            label={tag.name}
            onDelete={() => setSelectTags(selectTags.filter((t) => t._id !== tag._id))}
            key={tag._id}>
          </Chip>
        ))}
      </Stack>
      {/* ... other form controls ... */}
      <FormControl fullWidth margin="normal">
        <TextField label="Address" name="address" value={place.address} onChange={handleInputChange} required />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField label="Website" name="website" value={place.website} onChange={handleInputChange} />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField label="Phone" name="phone" value={place.phone} onChange={handleInputChange} />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Province</InputLabel>
        <Select
          name="province"
          value={place.province}
          onChange={handleInputChange}
          required
        >
          {Object.entries(VIETNAM_PROVINCES).map(([key, value]) => (
            <MenuItem key={key} value={key}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField label="City" name="city" value={place.city} onChange={handleInputChange} />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField label="Coordinates" name="coordinates" placeholder="Enter comma-separated values" onChange={handleInputChange} required />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField multiline label="Image Links" name="images" onChange={handleInputChange} placeholder="Enter image links separated by commas" />
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        Add Place
      </Button>
    </form>
  );
};

export default AddPlacePage;
