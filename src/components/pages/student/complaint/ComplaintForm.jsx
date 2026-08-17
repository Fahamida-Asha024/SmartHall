import Input from "../../../ui/Input";
import Select from "../../../ui/Select";
import Textarea from "../../../ui/Textarea";

import ComplaintLocation from "./ComplaintLocation";


export default function ComplaintForm({
  form,
  updateForm,
}) {

  const handleFile = (e) => {

    const file = e.target.files[0];

    if (!file) {
      updateForm("attachment", null);
      return;
    }


    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];


    if (!allowedTypes.includes(file.type)) {

      alert(
        "Only JPG, JPEG and PNG files are allowed."
      );

      e.target.value = "";

      updateForm(
        "attachment",
        null
      );

      return;
    }


    updateForm(
      "attachment",
      file
    );
  };


  return (
    <div className="space-y-6">


      {/* =========================================
          TITLE
      ========================================= */}

      <Input
        label="Complaint Title"
        value={form.title}
        onChange={(e) =>
          updateForm(
            "title",
            e.target.value
          )
        }
        placeholder="Example: Refrigerator is not working"
      />


      {/* =========================================
          PRIORITY
      ========================================= */}

      <Select
        label="Priority"
        value={form.priority}
        onChange={(e) =>
          updateForm(
            "priority",
            e.target.value
          )
        }
      >

        <option value="Low">
          Low
        </option>

        <option value="Medium">
          Medium
        </option>

        <option value="High">
          High
        </option>

        <option value="Emergency">
          Emergency
        </option>

      </Select>


      {/* =========================================
          LOCATION
      ========================================= */}

      <ComplaintLocation
        form={form}
        updateForm={updateForm}
      />


      {/* =========================================
          DESCRIPTION
      ========================================= */}

      <Textarea
        label="Description"
        value={form.description}
        onChange={(e) =>
          updateForm(
            "description",
            e.target.value
          )
        }
        placeholder="Describe the problem clearly. Mention when it started and any important details."
      />


      {/* =========================================
          ATTACHMENT
      ========================================= */}

      <div>

        <label className="block text-sm font-semibold text-gray-600 mb-2">

          Photo / Attachment

          <span className="font-normal text-gray-400">
            {" "}
            (optional)
          </span>

        </label>


        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={handleFile}
          className="w-full text-sm border border-dashed border-gray-300 rounded-lg p-3 bg-gray-50"
        />


        <p className="text-xs text-gray-400 mt-1">
          Upload a JPG or PNG image showing the problem.
        </p>


        {form.attachment && (
          <p className="text-xs text-green-600 mt-2">
            Selected: {form.attachment.name}
          </p>
        )}

      </div>

    </div>
  );
}