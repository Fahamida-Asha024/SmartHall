import Select from "../../../ui/Select";

import {
  complaintCategories,
  getCategoryById,
} from "../../../../data/complaintCategories";

export default function CategorySelector({
  category,
  subCategory,
  updateForm,
}) {
  const selectedCategory = getCategoryById(category);

  const subCategories =
    selectedCategory?.subCategories || [];

  return (
    <div className="space-y-4">

      {/* Complaint Category */}
      <Select
        label="Complaint Category"
        value={category}
        onChange={(e) => {
          updateForm("category", e.target.value);
          updateForm("subCategory", "");
        }}
      >
        <option value="">
          Select a category
        </option>

        {complaintCategories.map((item) => (
          <option
            key={item.id}
            value={item.id}
          >
            {item.name}
          </option>
        ))}
      </Select>


      {/* Problem Type / Sub Category */}
      {subCategories.length > 0 && (
        <Select
          label="Problem Type"
          value={subCategory}
          onChange={(e) =>
            updateForm(
              "subCategory",
              e.target.value
            )
          }
        >
          <option value="">
            Select problem type
          </option>

          {subCategories.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </Select>
      )}


      {/* Category Description */}
      {selectedCategory?.description && (
        <p className="text-xs text-gray-400">
          {selectedCategory.description}
        </p>
      )}

    </div>
  );
}