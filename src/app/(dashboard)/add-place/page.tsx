"use client";
import React, { useState } from "react";
const placeTypes = [
  "airport",
  "amusement_park",
  "aquarium",
  "art_gallery",
  "bakery",
  "beach",
  "coffee",
  "hotel",
  "museum",
  "park",
  "restaurant",
  "shopping_mall",
  "tourist_attraction",
  "transportation",
  "travel_agency",
];
const AddPlacePage = () => {
  const [place, setPlace] = useState({
    name: "",
    place_id: "",
    type: "",
    address: "",
    website: "",
    phone: "",
    province: "",
    city: "",
    geolocation: {
      type: "",
      coordinates: [],
    },
  });

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
    } else {
      setPlace({ ...place, [name]: value });
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Submit form
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={place.name}
          onChange={handleInputChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label>Place ID</label>
        <input
          type="text"
          name="place_id"
          value={place.place_id}
          onChange={handleInputChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label>Type</label>
        <select
          name="type"
          value={place.type}
          onChange={handleInputChange}
          className="form-control"
          required
        >
          <option value="">Select type</option>
          {placeTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={place.address}
          onChange={handleInputChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label>Website</label>
        <input
          type="text"
          name="website"
          value={place.website}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={place.phone}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Province</label>
        <input
          type="text"
          name="province"
          value={place.province}
          onChange={handleInputChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label>City</label>
        <input
          type="text"
          name="city"
          value={place.city}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Geolocation Type</label>
        <input
          type="text"
          name="type"
          value={place.geolocation.type}
          onChange={handleInputChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label>Coordinates</label>
        <input
          type="text"
          name="coordinates"
          placeholder="Enter comma-separated values"
          onChange={handleInputChange}
          className="form-control"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add Place
      </button>
    </form>
  );
};

export default AddPlacePage;
