const materials = [
  { materialID: "0001", materialName: "Material 1" },
  { materialID: "0002", materialName: "Material 2" },
  { materialID: "0003", materialName: "Material 3" },
  { materialID: "0004", materialName: "Material 4" },
  { materialID: "0005", materialName: "Material 5" },
];

export function MaterialForm() {
  return (
    <div className="custom-form-container">
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
                  //   onChange={}
                  className="mr-2"
                  //   checked={selectedMaterials.includes(material.materialID)}
                />
                {`${material.materialID} - ${material.materialName}`}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
