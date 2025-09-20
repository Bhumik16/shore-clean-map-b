// MapWithList.jsx

import React, { useEffect, useState } from "react";
import TrashMarkerMap from "./TrashMarkerMap";
import TrashMarkerList from "./TrashMarkerList";

function MapWithList() {
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all markers on mount
  useEffect(() => {
    fetch("http://localhost:5000/api/markers")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // Ensure data is an array
        setMarkers(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching markers:", error);
        setMarkers([]); // Set empty array on error
        setLoading(false);
      });
  }, []);

  // Add marker
  const addMarker = async (lat, lng) => {
    try {
      const res = await fetch("http://localhost:5000/api/markers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latitude: lat, longitude: lng }),
      });
      if (res.ok) {
        const newMarker = await res.json();
        setMarkers((prev) => [...prev, newMarker]);
      } else {
        console.error("Failed to add marker:", res.status);
      }
    } catch (error) {
      console.error("Error adding marker:", error);
    }
  };

  // Update marker status
  const updateStatus = async (id, status) => {
    const res = await fetch(`http://localhost:5000/api/markers/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      const updated = await res.json();
      setMarkers((prev) => prev.map((m) => (m._id === id ? updated : m)));
    }
  };

  // Complete task (with image upload)
  const completeTask = async (id, imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("status", "completed");
    const res = await fetch(
      `http://localhost:5000/api/markers/${id}/complete`,
      {
        method: "POST",
        body: formData,
      }
    );
    if (res.ok) {
      const updated = await res.json();
      setMarkers((prev) => prev.map((m) => (m._id === id ? updated : m)));
    }
  };

  // Delete marker from frontend only
  const deleteMarkerFrontend = (id) => {
    setMarkers((prev) => prev.filter((m) => m._id !== id));
  };

  // Update marker remark
  const updateRemark = async (id, remark) => {
    const res = await fetch(`http://localhost:5000/api/markers/${id}/remark`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ remark }),
    });
    if (res.ok) {
      const updated = await res.json();
      setMarkers((prev) => prev.map((m) => (m._id === id ? updated : m)));
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        padding: "2rem",
      }}
    >
      <section>
        <h2>Garbage Spot Map</h2>
        <TrashMarkerMap
          markers={markers}
          loading={loading}
          addMarker={addMarker}
          updateStatus={updateStatus}
          deleteMarkerFrontend={deleteMarkerFrontend}
          completeTask={completeTask}
        />
      </section>
      <section>
        <h2>Garbage Spot List</h2>
        <TrashMarkerList
          markers={markers}
          loading={loading}
          updateStatus={updateStatus}
          completeTask={completeTask}
          updateRemark={updateRemark}
        />
      </section>
    </div>
  );
}

export default MapWithList;
