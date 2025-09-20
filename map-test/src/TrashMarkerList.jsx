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
  const [focusedRemarkId, setFocusedRemarkId] = useState(null);

  function handleCompleteClick(id) {
    setUploadingId(id);
  }

  function handleRemarkChange(id, remark) {
    updateRemark(id, remark);
  }

  function handleRemarkKeyPress(e, id) {
    if (e.key === "Enter") {
      e.preventDefault();
      setFocusedRemarkId(null);
      e.target.blur(); // Remove focus from the input
    }
  }

  function handleRemarkFocus(id) {
    setFocusedRemarkId(id);
  }

  function handleRemarkBlur() {
    setFocusedRemarkId(null);
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
      {/* <h3>Task List</h3> */}
      {loading ? (
        <div>Loading markers...</div>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid #e2e8f0",
            backgroundColor: "#ffffff",
          }}
        >
          <thead
            style={{
              background: "linear-gradient(135deg, #4299e1 0%, #3182ce 100%)",
            }}
          >
            <tr>
              <th
                style={{
                  padding: "14px 12px",
                  color: "#ffffff",
                  fontWeight: "600",
                  fontSize: "14px",
                  textAlign: "left",
                  borderBottom: "2px solid #2b77cb",
                }}
              >
                Address
              </th>
              <th
                style={{
                  padding: "14px 12px",
                  color: "#ffffff",
                  fontWeight: "600",
                  fontSize: "14px",
                  textAlign: "left",
                  borderBottom: "2px solid #2b77cb",
                }}
              >
                Latitude
              </th>
              <th
                style={{
                  padding: "14px 12px",
                  color: "#ffffff",
                  fontWeight: "600",
                  fontSize: "14px",
                  textAlign: "left",
                  borderBottom: "2px solid #2b77cb",
                }}
              >
                Longitude
              </th>
              <th
                style={{
                  padding: "14px 12px",
                  color: "#ffffff",
                  fontWeight: "600",
                  fontSize: "14px",
                  textAlign: "left",
                  borderBottom: "2px solid #2b77cb",
                }}
              >
                Status
              </th>
              <th
                style={{
                  padding: "14px 12px",
                  color: "#ffffff",
                  fontWeight: "600",
                  fontSize: "14px",
                  textAlign: "left",
                  borderBottom: "2px solid #2b77cb",
                }}
              >
                Action
              </th>
              <th
                style={{
                  padding: "14px 12px",
                  color: "#ffffff",
                  fontWeight: "600",
                  fontSize: "14px",
                  textAlign: "left",
                  borderBottom: "2px solid #2b77cb",
                }}
              >
                Remark
              </th>
            </tr>
          </thead>
          <tbody>
            {markers.map((marker, index) => (
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
                  borderBottom:
                    index === markers.length - 1 ? "none" : "1px solid #e2e8f0",
                }}
              >
                <td
                  style={{
                    padding: "12px",
                    borderRight: "1px solid #e2e8f0",
                    fontSize: "14px",
                    color: "#2d3748",
                  }}
                >
                  {marker.address}
                </td>
                <td
                  style={{
                    padding: "12px",
                    borderRight: "1px solid #e2e8f0",
                    fontSize: "14px",
                    color: "#2d3748",
                  }}
                >
                  {marker.latitude}
                </td>
                <td
                  style={{
                    padding: "12px",
                    borderRight: "1px solid #e2e8f0",
                    fontSize: "14px",
                    color: "#2d3748",
                  }}
                >
                  {marker.longitude}
                </td>
                <td
                  style={{
                    padding: "12px",
                    borderRight: "1px solid #e2e8f0",
                    fontWeight: "bold",
                    fontSize: "14px",
                    color:
                      marker.status === "completed"
                        ? "#388e3c"
                        : marker.status === "pending"
                        ? "#1976d2"
                        : "#fbc02d",
                  }}
                >
                  {marker.status.charAt(0).toUpperCase() +
                    marker.status.slice(1)}
                </td>
                <td
                  style={{
                    padding: "12px",
                    borderRight: "1px solid #e2e8f0",
                    fontSize: "14px",
                  }}
                >
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
                        style={{
                          marginRight: "8px",
                          padding: "8px",
                          border: "2px solid #4299e1",
                          borderRadius: "8px",
                          fontSize: "12px",
                          backgroundColor: "#fff",
                          cursor: "pointer",
                          transition: "border-color 0.2s ease",
                        }}
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
                <td
                  style={{
                    padding: "12px",
                    minWidth: "150px",
                    maxWidth: "200px",
                    fontSize: "14px",
                  }}
                >
                  <textarea
                    placeholder="Add remark..."
                    value={marker.remark || ""}
                    onChange={(e) =>
                      handleRemarkChange(marker._id, e.target.value)
                    }
                    onKeyPress={(e) => handleRemarkKeyPress(e, marker._id)}
                    onFocus={() => handleRemarkFocus(marker._id)}
                    onBlur={handleRemarkBlur}
                    style={{
                      width: "100%",
                      minHeight: "40px",
                      maxHeight: "120px",
                      boxSizing: "border-box",
                      padding: "8px",
                      borderRadius: "6px",
                      border: "2px solid #e2e8f0",
                      fontFamily: "inherit",
                      fontSize: "14px",
                      resize: "vertical",
                      wordWrap: "break-word",
                      whiteSpace: "pre-wrap",
                      overflow: "auto",
                      lineHeight: "1.4",
                      transition: "border-color 0.2s ease",
                      borderColor:
                        focusedRemarkId === marker._id ? "#4299e1" : "#e2e8f0",
                    }}
                    rows={2}
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
