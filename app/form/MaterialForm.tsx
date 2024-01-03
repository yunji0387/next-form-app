import React, { useEffect, useState, useMemo } from "react";

const materials = [
  { materialID: "0001", materialName: "Polyethylene Terephthalate (PET)" },
  { materialID: "0002", materialName: "High-Density Polyethylene (HDPE)" },
  { materialID: "0003", materialName: "Polyvinyl Chloride (PVC)" },
  { materialID: "0004", materialName: "Low-Density Polyethylene (LDPE)" },
  { materialID: "0005", materialName: "Polypropylene (PP)" },
];

type MaterialInfoData = {
  materialID: string[];
  materialName: string[];
};

type MaterialFormProps = MaterialInfoData & {
  updateForm: (fields: Partial<MaterialInfoData>) => void;
};

export function MaterialForm({ materialID, updateForm }: MaterialFormProps) {
  const [selectedMaterials, setSelectedMaterials] = useState(
    new Set(materialID)
  );

  // Function to get material name by ID
  const getMaterialNameById = (id: string) => {
    const material = materials.find((material) => material.materialID === id);
    return material ? material.materialName : "";
  };

  const handleCheckboxChange = (changedMaterialID: string) => {
    setSelectedMaterials((prevSelected) => {
      const newSelected = new Set(prevSelected);

      if (newSelected.has(changedMaterialID)) {
        newSelected.delete(changedMaterialID);
      } else {
        newSelected.add(changedMaterialID);
      }

      // Convert the Set back to an array for the parent component's state.
      const selectedIDs = Array.from(newSelected);
      const selectedNames = selectedIDs.map((id) => getMaterialNameById(id));
      updateForm({
        materialID: selectedIDs,
        materialName: selectedNames,
        // For materialName, we don't need to update it here since it's derived from materialID
      });

      return newSelected;
    });
  };

  return (
    <div className="custom-form-container">
      <h2 className="text-black text-center font-bold text-xl p-1">Material</h2>
      <div className="w-full flex flex-col items-center justify-center">
        <ul className="w-full text-black">
          {materials.map((material) => (
            <li
              key={material.materialID}
              className={`w-full flex flex-row border border-gray-300 ${
                selectedMaterials.has(material.materialID)
                  ? "bg-gray-100"
                  : "bg-white"
              }`}
            >
              <label
                htmlFor={material.materialID}
                className="w-full h-[2.5rem] grid grid-cols-12 items-center"
              >
                <div className="flex items-center justify-center col-span-1">
                  <input
                    type="checkbox"
                    id={material.materialID}
                    checked={selectedMaterials.has(material.materialID)}
                    onChange={() => handleCheckboxChange(material.materialID)}
                    className="custom-form-checkbox"
                  />
                </div>
                <p className="text-center text-sm lg:text-base border-l border-gray col-span-2">
                  {material.materialID}
                </p>
                <p className="text-center text-sm lg:text-base border-l border-gray col-span-9">
                  {material.materialName}
                </p>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
