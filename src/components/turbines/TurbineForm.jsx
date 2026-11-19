
import { useState } from "react";



const TurbineForm = ({onAddTurbine}) => {


  const [formData, setFormData] = useState({
    name: "",
    location: "",
    power: "",
    status: "Operational",
  });

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await onAddTurbine(formData);

    setFormData({
      name: "",
      location: "",
      power: "",
      status: "Operational"
    });

    console.log("Turbine added successfully");
  } catch (error) {
    console.error(error.message);
  }
};
  return (
    <form onSubmit={handleSubmit}>
        <h2>Add New Turbine</h2>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" value={formData.name}

        onChange={(e)=>setFormData({
            ...formData, name: e.target.value
        })}
        />
        <label htmlFor="location">Location</label>
        <input id="location" type="text" value={formData.location}
            onChange={(e)=>setFormData({...formData, location: e.target.value})}
        />
        <label htmlFor="power">Power (MW)</label>
         <input id="power" type="number" value={formData.power}

         onChange={(e)=>setFormData({...formData, power: e.target.value})}

         />

         <label htmlFor="status">Status</label>

         <select

            id="status"
            value={formData.status}
            onChange={(e)=>setFormData({...formData, status: e.target.value})}
          >
            <option value="Offline">Offline</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Operational">Operational</option>
          </select>

          <button type="submit">Add Turbine</button>

    </form>
  )
}

export default TurbineForm
