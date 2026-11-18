import { useState } from "react";
import { Link, useParams } from "react-router-dom";
export default function TurbineDetails({turbines,onUpdateTurbine}) {

    const {id} = useParams();

    const turbine = turbines.find((item) => item.id === id)

    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
  name: "",
  location: "",
  power: "",
  status: ""
});

const [isSaving, setIsSaving] = useState(false);
const [error, setError] = useState("");

  const editHandler = () => {

    setFormData({
  name: turbine.name,
  location: turbine.location,
  power: turbine.power,
  status: turbine.status
});
    setIsEditing(true);
  }

  console.log(formData);

  const handleSave = async (e) => {
  e.preventDefault();

  try {
    setIsSaving(true);
setError("");
    const response = await fetch(
      `http://localhost:3000/turbines/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update turbine");
    }

    const result = await response.json();

    onUpdateTurbine(result);
    setIsEditing(false);

  } catch (error) {
     setError(error.message || "Something went wrong");
  }finally {
  setIsSaving(false);
}
};

const cancelEdit = () => {
  setIsEditing(false);
  setError("");
  setFormData({
    name: turbine.name,
    location: turbine.location,
    power: turbine.power,
    status: turbine.status
  });
};

    return (
        <section>
            <Link to="/turbines">
  ← Back to Turbines
</Link>
            <h2>Turbine Details</h2>
            <div>
                {
                    isEditing ? (

                        <>

                          <form onSubmit={handleSave}>
                            {error && <p role="alert">{error}</p>}
                            <label htmlFor="name">Name</label>
                            <input
                            type="text"
                            value={formData.name}
                            onChange={(e)=>setFormData({...formData,
                              name: e.target.value
                            })}
                            />
                             <label htmlFor="location">Location</label>
                            <input
                            type="text"
                            value={formData.location}
                            onChange={(e)=>setFormData({...formData,
                              location: e.target.value
                            })}
                            />
                             <label htmlFor="power">Power</label>
                            <input
                            type="text"
                            value={formData.power}
                            onChange={(e)=>setFormData({...formData,
                              power: e.target.value
                            })}
                            />
                             <label htmlFor="status">Status</label>
                            <select>
    <option value="Offline">Offline</option>
    <option value="All">All</option>
    <option value="Maintenance" >Maintenance</option>
    <option value="Operational">Operational</option>
  </select>
                             <button type="submit" disabled={isSaving}>
  {isSaving ? "Saving..." : "Save"}
</button>
  <button
    type="button"
    onClick={cancelEdit}
  >
    Cancel
  </button>
</form>


                        </>
                    ) : (
                        <>
                            {turbine ? (
    <>
      <p>{turbine.name}</p>
      <p>{turbine.location}</p>
      <p>{turbine.power}</p>
      <p>{turbine.status}</p>
      <button onClick={editHandler}>Edit</button>
    </>
  ) : (
    <p>Turbine not found</p>
  )}
                        </>
                    )
                }
            </div>

        </section>
    )

}
