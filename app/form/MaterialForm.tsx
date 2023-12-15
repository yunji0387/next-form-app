import React, { useState } from "react";

const MaterialForm: React.FC = () => {
    const [jobName, setJobName] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

    const handleJobNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setJobName(event.target.value);
    };

    const handleCustomerNameChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setCustomerName(event.target.value);
    };

    const handleMaterialChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const materialId = event.target.value;
        if (selectedMaterials.includes(materialId)) {
            setSelectedMaterials(selectedMaterials.filter((id) => id !== materialId));
        } else {
            setSelectedMaterials([...selectedMaterials, materialId]);
        }
    };

    const handleSubmit = () => {
        const formData = {
            jobName: jobName,
            customerName: customerName,
            selectedMaterials: selectedMaterials,
        };
        console.log(JSON.stringify(formData));
    };

    return (
        <div className="flex flex-col justify-center items-center bg-cyan-200 p-5 pt-2 space-y-2">
            <h2 className="text-black text-center font-bold text-xl p-1">Material</h2>

            <div className="w-80 flex flex-col justify-center">
                <ul>
                    <li>
                        <label htmlFor="material1">
                            <input
                                type="checkbox"
                                id="material1"
                                value="material1"
                                onChange={handleMaterialChange}
                            />
                            Material 1
                        </label>
                    </li>
                    <li>
                        <label htmlFor="material2">
                            <input
                                type="checkbox"
                                id="material2"
                                value="material2"
                                onChange={handleMaterialChange}
                            />
                            Material 2
                        </label>
                    </li>
                    <li>
                        <label htmlFor="material3">
                            <input
                                type="checkbox"
                                id="material3"
                                value="material3"
                                onChange={handleMaterialChange}
                            />
                            Material 3
                        </label>
                    </li>
                    <li>
                        <label htmlFor="material4">
                            <input
                                type="checkbox"
                                id="material4"
                                value="material4"
                                onChange={handleMaterialChange}
                            />
                            Material 4
                        </label>
                    </li>
                    <li>
                        <label htmlFor="material5">
                            <input
                                type="checkbox"
                                id="material5"
                                value="material5"
                                onChange={handleMaterialChange}
                            />
                            Material 5
                        </label>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default MaterialForm;