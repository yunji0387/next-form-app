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
            <li
              key={material.materialID}
              className="flex flex-row border border-gray-300"
            >
              <label
                htmlFor={material.materialID}
                className=" w-full grid grid-cols-6 p-1 bg-white"
              >
                <div className="flex items-center justify-center col-span-1">
                  <input
                    type="checkbox"
                    id={material.materialID}
                    value={material.materialID}
                    //   onChange={}
                    className="custom-form-checkbox"
                    //   checked={selectedMaterials.includes(material.materialID)}
                  />
                </div>
                {/* {`${material.materialID} - ${material.materialName}`} */}
                <p className="text-center border-l border-gray-300 col-span-2">{`${material.materialID}`}</p>
                <p className="text-center border-l border-gray-300 col-span-3">{`${material.materialName}`}</p>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
