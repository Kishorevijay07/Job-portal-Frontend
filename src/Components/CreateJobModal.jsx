import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";
import { LuArrowDownUp } from "react-icons/lu";
import { baseUrl } from "../url/constant";
const CreateJobModal = ({ onClose, refreshJobs }) => {
  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    location: "Chennai",
    jobType: "FullTime",
    salaryMin: "",
    salaryMax: "",
    deadline: "",
    description: "",
    companyLogo: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          companyLogo: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const min = parseInt(formData.salaryMin.replace(/[^0-9]/g, ""), 10) || 0;
    const max = parseInt(formData.salaryMax.replace(/[^0-9]/g, ""), 10) || 0;

    const job = {
      title: formData.title,
      companyName: formData.companyName,
      companyLogo: formData.companyLogo,
      location: formData.location,
      jobType: formData.jobType,
      salaryMin: min,
      salaryMax: max,
      deadline: formData.deadline,
      description: formData.description,
    };
        console.log("Dsc length ",job.description.length)
        console.log(job.description.length < 200)
    if((job.description.length > 200) || (job.description.length < 180)){
      console.log("Dsc length ",job.description.length)
      alert(`Please Enter Minimum 180 to 200 Letters , Currently job description length ${job.description.length}`);
      return;
    }
     console.log("Dsc length ",job.description.length)
    
    try {
      const res = await fetch(`${baseUrl}/api/jobs/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(job),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Job posted successfully!");
        refreshJobs();
        onClose();
      } else {
        alert(`❌ Failed: ${data.message || "Something went wrong"}`);
      }
    } catch (err) {
      console.error("Error posting job:", err);
      alert("❌ Server error. Try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-[720px] max-h-[90vh] overflow-auto rounded-xl p-8 shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-xl font-bold text-gray-500 hover:text-black"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold text-center -mt-5 mb-6">
          Create Job Opening
        </h2>


        <form className="space-y-1" onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="flex gap-4">
            <div className="w-full">
              <label className="text-sm font-medium mb-1 block">Job Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Full Stack Developer"
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="w-full">
              <label className="text-sm font-medium mb-1 block">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Amazon"
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex gap-4">
            <div className="w-full relative">
              <label className="text-sm font-medium mb-1 block">Location</label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-2 pr-8 border rounded-md text-gray-700 appearance-none"
              >
                {[
                "Mumbai", "Delhi", "Bengaluru", "Kolkata", "Chennai", "Hyderabad", "Pune", "Ahmedabad", "Surat", "Jaipur",
                "Lucknow", "Visakhapatnam", "Nagpur", "Indore", "Bhopal", "Kanpur", "Amritsar", "Agra", "Varanasi",
                "Chandigarh", "Mysore", "Kochi", "Patna", "Vadodara", "Guwahati", "Coimbatore", "Gwalior", "Thiruvananthapuram"
              ].map(
                  (city, idx) => (
                    <option key={idx} value={city}>
                      {city}
                    </option>
                  )
                )}
              </select>
              <FaChevronDown className="absolute right-3 top-[38px] -translate-y-1/2 text-gray-500" />
            </div>
            <div className="w-full relative">
              <label className="text-sm font-medium mb-1 block">Job Type</label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="w-full p-2 pr-8 border rounded-md text-gray-700 appearance-none"
              >
                <option value="FullTime">FullTime</option>
                <option value="Internship">Internship</option>
                <option value="PartTime">PartTime</option>
                <option value="Contract">Contract</option>
              </select>
              <FaChevronDown className="absolute right-3 top-[38px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex gap-4">
            <div className="w-full">
              <label className="text-sm font-medium mb-1 block">Salary Range</label>
              <div className="flex gap-4">
                <div className="relative w-full">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">
                    <LuArrowDownUp />
                  </span>
                  <input
                    type="text"
                    name="salaryMin"
                    value={formData.salaryMin}
                    onChange={handleChange}
                    placeholder="₹0"
                    className="w-full pl-8 p-2 border rounded-md"
                  />
                </div>
                <div className="relative w-full">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">
                    <LuArrowDownUp />
                  </span>
                  <input
                    type="text"
                    name="salaryMax"
                    value={formData.salaryMax}
                    onChange={handleChange}
                    placeholder="₹12,00,000"
                    className="w-full pl-8 p-2 border rounded-md"
                  />
                </div>
              </div>
            </div>
            <div className="w-full">
              <label className="text-sm font-medium mb-1 block">
                Application Deadline
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full p-2 pl-10 border rounded-md text-gray-700"
                />
                <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
            </div>
          </div>


          <div>
            <label className="text-sm font-medium mb-1 block">Job Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Minimum 180 to 200 letters....Describe the role, responsibilities, and expectations...."
              className="w-full p-2 border rounded-md h-28 resize-none text-sm"
            ></textarea>
          </div>

          {/* Row 5: Logo Upload and Buttons */}
          <div className="flex justify-between items-center mt-4 w-full">
  {/* Left: Save Draft */}
  <button
    type="button"
    onClick={() => {
      console.log("💾 Draft Saved", formData);
      alert("Saved as Draft");
      onClose();
    }}
    className="px-4 py-2 border border-black text-gray-700 rounded-md hover:bg-gray-100"
  >
    Save Draft ⌄
  </button>

  {/* Center: Company Logo */}
  <div className="flex flex-col items-center">
    <label className="text-sm font-medium mb-1">Company Logo</label>
    <input
      type="file"
      accept="image/*"
      onChange={handleLogoUpload}
      className="p-2 max-w-[200px] bg-blue-500 text-white rounded-md cursor-pointer"
    />
  </div>

  {/* Right: Publish */}
  <button
    type="submit"
    className="px-6 py-2 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600"
  >
    Publish »
  </button>
</div>

        </form>
      </div>
    </div>
  );
};

export default CreateJobModal;
