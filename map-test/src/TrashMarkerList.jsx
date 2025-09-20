// TrashMarkerList.jsx
import React, { useState } from "react";

const statusColor = {
  pending: "#e3f2fd", // blue
  ongoing: "#fffde7", // yellow
  completed: "#e8f5e9", // green
};

function TrashMarkerList({
  markers,
  loading,
  updateStatus,
  completeTask,
  updateRemark,
}) {
  const [uploadingId, setUploadingId] = useState(null);

  function handleCompleteClick(id) {
    setUploadingId(id);
  }

  function handleRemarkChange(id, remark) {
    updateRemark(id, remark);
  }

  async function handleImageUpload(e, id) {
    const file = e.target.files[0];
    if (!file) {
      alert("Please select a file to complete the task.");
      return;
    }
    await completeTask(id, file); // Only mark as completed after file upload
    setUploadingId(null); // Force re-render to update color
  }

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Task List</h3>
      {loading ? (
        <div>Loading markers...</div>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            boxShadow: "0 2px 8px #ccc",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <thead style={{ background: "#f5f5f5" }}>
            <tr>
              <th style={{ padding: "10px" }}>Address</th>
              <th style={{ padding: "10px" }}>Lat</th>
              <th style={{ padding: "10px" }}>Lng</th>
              <th style={{ padding: "10px" }}>Status</th>
              <th style={{ padding: "10px" }}>Action</th>
              <th style={{ padding: "10px" }}>Remark</th>
            </tr>
          </thead>
          <tbody>
            {markers.map((marker) => (
              <tr
                key={marker._id}
                style={{
                  background:
                    marker.status === "completed"
                      ? statusColor["completed"]
                      : marker.status === "ongoing"
                      ? statusColor["ongoing"]
                      : statusColor["pending"],
                  transition: "background 0.3s",
                }}
              >
                <td style={{ padding: "8px" }}>{marker.address}</td>
                <td style={{ padding: "8px" }}>{marker.latitude}</td>
                <td style={{ padding: "8px" }}>{marker.longitude}</td>
                <td
                  style={{
                    padding: "8px",
                    fontWeight: "bold",
                    color:
                      marker.status === "completed"
                        ? "#388e3c"
                        : marker.status === "pending"
                        ? "#1976d2"
                        : "#fbc02d",
                  }}
                >
                  {marker.status}
                </td>
                <td style={{ padding: "8px" }}>
                  {marker.status === "pending" && (
                    <button
                      style={{
                        padding: "6px 12px",
                        borderRadius: "4px",
                        background: "#2196f3",
                        color: "#fff",
                        border: "none",
                      }}
                      onClick={() => updateStatus(marker._id, "ongoing")}
                    >
                      Accept
                    </button>
                  )}
                  {marker.status === "ongoing" && (
                    <>
                      <button
                        style={{
                          padding: "6px 12px",
                          borderRadius: "4px",
                          background: "#fbc02d",
                          color: "#fff",
                          border: "none",
                          marginRight: "8px",
                        }}
                        onClick={() => handleCompleteClick(marker._id)}
                      >
                        Complete
                      </button>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, marker._id)}
                        style={{ marginRight: "8px" }}
                      />
                    </>
                  )}
                  {marker.status === "completed" && marker.imageUrl && (
                    <img
                      src={marker.imageUrl}
                      alt="Proof"
                      style={{
                        width: 50,
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                      }}
                    />
                  )}
                </td>
                <td style={{ padding: "8px", minWidth: "120px" }}>
                  <input
                    type="text"
                    placeholder="Add remark..."
                    value={marker.remark || ""}
                    onChange={(e) =>
                      handleRemarkChange(marker._id, e.target.value)
                    }
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      padding: "6px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TrashMarkerList;
