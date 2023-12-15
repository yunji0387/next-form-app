import React, { useState } from "react";

const materials = [
  { materialID: "0001", materialName: "Material 1" },
  { materialID: "0002", materialName: "Material 2" },
  { materialID: "0003", materialName: "Material 3" },
  { materialID: "0004", materialName: "Material 4" },
  { materialID: "0005", materialName: "Material 5" },
];

const MaterialForm: React.FC = () => {
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  const handleMaterialChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const materialId = event.target.value;
    if (selectedMaterials.includes(materialId)) {
      setSelectedMaterials(selectedMaterials.filter((id) => id !== materialId));
    } else {
      setSelectedMaterials([...selectedMaterials, materialId]);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-cyan-200 p-5 pt-2 space-y-2">
      <h2 className="text-black text-center font-bold text-xl p-1">Material</h2>
      <div className="w-80 flex flex-col justify-center">
        <ul className="text-black">
          {materials.map((material) => (
            <li key={material.materialID} className="bg-lime-100 flex flex-row">
              <label htmlFor={material.materialID}>
                <input
                  type="checkbox"
                  id={material.materialID}
                  value={material.materialID}
                  onChange={handleMaterialChange}
                  className="mr-2"
                  checked={selectedMaterials.includes(material.materialID)}
                />
                {`${material.materialID} - ${material.materialName}`}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MaterialForm;