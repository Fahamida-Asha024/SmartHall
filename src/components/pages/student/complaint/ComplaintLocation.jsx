import Input from "../../../ui/Input";
import Select from "../../../ui/Select";

export default function ComplaintLocation({
  form,
  updateForm,
}) {
  return (
    <div className="space-y-4">

      <div>
        <label className="block text-sm font-semibold text-gray-600 mb-2">
          Problem Location
        </label>

        <div className="grid grid-cols-2 gap-3">

          <button
            type="button"
            onClick={() =>
              updateForm("locationType", "Personal")
            }
            className={`rounded-lg border p-4 text-left transition ${
              form.locationType === "Personal"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 bg-white hover:bg-gray-50"
            }`}
          >
            <p className="font-semibold text-gray-700">
              Personal
            </p>

            <p className="text-xs text-gray-400 mt-1">
              Problem inside my room
            </p>
          </button>

          <button
            type="button"
            onClick={() =>
              updateForm("locationType", "Common")
            }
            className={`rounded-lg border p-4 text-left transition ${
              form.locationType === "Common"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 bg-white hover:bg-gray-50"
            }`}
          >
            <p className="font-semibold text-gray-700">
              Common Area
            </p>

            <p className="text-xs text-gray-400 mt-1">
              Bathroom, corridor, kitchen, etc.
            </p>
          </button>

        </div>
      </div>

      {/* Student location */}
      <div className="grid grid-cols-3 gap-3">

        <Input
          label="Hall"
          value={form.hall}
          onChange={(e) =>
            updateForm("hall", e.target.value)
          }
          placeholder="Sadhinota Hall"
        />

        <Input
          label="Block"
          value={form.block}
          onChange={(e) =>
            updateForm("block", e.target.value)
          }
          placeholder="A"
        />

        <Input
          label="Room"
          value={form.room}
          onChange={(e) =>
            updateForm("room", e.target.value)
          }
          placeholder="214"
        />

      </div>

      {/* Common area */}
      {form.locationType === "Common" && (
        <Select
          label="Common Area"
          value={form.commonLocation}
          onChange={(e) =>
            updateForm(
              "commonLocation",
              e.target.value
            )
          }
        >
          <option value="">
            Select common area
          </option>

          <option value="Bathroom">
            Bathroom
          </option>

          <option value="Corridor">
            Corridor
          </option>

          <option value="Staircase">
            Staircase
          </option>

          <option value="Kitchen">
            Kitchen
          </option>

          <option value="Dining Hall">
            Dining Hall
          </option>

          <option value="Common Room">
            Common Room
          </option>

          <option value="Rooftop">
            Rooftop
          </option>

          <option value="Laundry Room">
            Laundry Room
          </option>

          <option value="Other Common Area">
            Other
          </option>
        </Select>
      )}

    </div>
  );
}