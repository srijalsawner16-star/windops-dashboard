
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function TurbineDetails({
  turbines = [],
  onUpdateTurbine,
  onDeleteTurbine,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find turbine using URL ID
  const turbine = turbines.find(
    (item) => String(item.id) === String(id)
  );

  // State management
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    power: "",
    status: "Operational",
  });

  // Validate form
  const validateForm = () => {
    const errors = {};

    if (!String(formData.name ?? "").trim()) {
      errors.name = "Name is required";
    }

    if (!String(formData.location ?? "").trim()) {
      errors.location = "Location is required";
    }

    const powerStr = String(formData.power ?? "").trim();

    if (
      powerStr === "" ||
      !Number.isFinite(Number(powerStr)) ||
      Number(powerStr) <= 0
    ) {
      errors.power =
        "Power must be a valid number greater than zero";
    }

    return errors;
  };

  // Edit handler
  const editHandler = () => {
    if (!turbine) return;

    setFormData({
      name: turbine.name ?? "",
      location: turbine.location ?? "",
      power: turbine.power ?? "",
      status: turbine.status || "Operational",
    });

    setValidationErrors({});
    setError("");
    setIsEditing(true);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setValidationErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Save updated turbine
  const handleSave = async (e) => {
    e.preventDefault();

    const errors = validateForm();

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) return;

    try {
      setIsSaving(true);
      setError("");

      const response = await fetch(
        `http://localhost:3000/turbines/${turbine.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            power: Number(formData.power),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Server error (${response.status}): Failed to update turbine`
        );
      }

      const result = await response.json();

      if (typeof onUpdateTurbine === "function") {
        onUpdateTurbine(result);
      }

      setIsEditing(false);
      setError("");

    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  // Delete turbine
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this turbine?"
    );

    if (!confirmDelete) return;

    try {
      setError("");

      const response = await fetch(
        `http://localhost:3000/turbines/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete turbine");
      }

      if (typeof onDeleteTurbine === "function") {
        onDeleteTurbine(id);
      }

      navigate("/turbines");

    } catch (err) {
      setError(err.message || "Failed to delete turbine");
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setIsEditing(false);
    setError("");
    setValidationErrors({});
  };

  // Return JSX
  return (
    <section className="turbine-details">

      <Link to="/turbines">
        ← Back to Turbines
      </Link>

      <h2>Turbine Details</h2>

      {error && (
        <p role="alert" style={{ color: "red" }}>
          {error}
        </p>
      )}

      {!turbine ? (
        <p>Turbine not found</p>
      ) : isEditing ? (

        // EDIT FORM
        <form onSubmit={handleSave}>

          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />

          {validationErrors.name && (
            <p className="error-message">
              {validationErrors.name}
            </p>
          )}

          <label htmlFor="location">Location</label>
          <input
            id="location"
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
          />

          {validationErrors.location && (
            <p className="error-message">
              {validationErrors.location}
            </p>
          )}

          <label htmlFor="power">Power</label>
          <input
            id="power"
            name="power"
            type="number"
            min="0"
            step="any"
            value={formData.power}
            onChange={handleChange}
          />

          {validationErrors.power && (
            <p className="error-message">
              {validationErrors.power}
            </p>
          )}

          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Offline">Offline</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Operational">Operational</option>
          </select>

          <button type="submit" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save"}
          </button>

          <button
            type="button"
            onClick={cancelEdit}
            disabled={isSaving}
          >
            Cancel
          </button>


        </form>


      ) : (

        // TURBINE DETAILS
        <div>


          <p>
            <strong>Name:</strong> {turbine.name}
          </p>

          <p>
            <strong>Location:</strong> {turbine.location}
          </p>

          <p>
            <strong>Power:</strong> {turbine.power}
          </p>

          <p>
            <strong>Status:</strong> {turbine.status}
          </p>

          <button
            type="button"
            onClick={editHandler}
          >
            Edit
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="delete-btn"
          >
            Delete Turbine
          </button>

        </div>
      )}

    </section>
  );
}
