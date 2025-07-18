import React, { useState, useEffect } from 'react';
import logo from './../images/cmwlogo.png';
import { CiLocationOn, CiSearch } from "react-icons/ci";
import { MdRecordVoiceOver } from "react-icons/md";
import CreateJobModal from './CreateJobModal';
import JobCard from './JobCard';
import { formatDistanceToNow } from "date-fns";
import { baseUrl } from './../url/constant';

const NavbarWithSearch = () => {
  const [showModal, setShowModal] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const [jobTitleFilter, setJobTitleFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const [minSalary, setMinSalary] = useState(0);
  const [maxSalary, setMaxSalary] = useState(150000);

  const refreshJobs = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/jobs/all`);
      const data = await res.json();
      setJobs(data || []);
    } catch (err) {
      console.error("Failed to refresh jobs:", err);
    }
  };

  useEffect(() => {
    refreshJobs();
  }, []);

  useEffect(() => {
    const filtered = jobs.filter((job) => {
      const titleMatch = job.title.toLowerCase().includes(jobTitleFilter.toLowerCase());
      const locationMatch = !locationFilter || job.location === locationFilter;
      const jobTypeMatch = !jobTypeFilter || job.jobType === jobTypeFilter;
      const monthly = job.salary?.min / 12;
      const salaryMatch = monthly >= minSalary && monthly <= maxSalary;

      return titleMatch && locationMatch && jobTypeMatch && salaryMatch;
    });

    setFilteredJobs(filtered);
  }, [jobTitleFilter, locationFilter, jobTypeFilter, minSalary, maxSalary, jobs]);

  return (
    <div className='max-h-[190px] max-w-[1600px] shadow-lg'>
      {/* Navbar */}
      <nav className="mx-auto w-[90%] max-w-[860px] h-[66px] bg-white shadow-md px-6 flex items-center justify-between rounded-full">
        <div className="flex items-center space-x-26">
          <img src={logo} alt="Logo" className="h-8 w-8" />
          <ul className="flex space-x-10 text-gray-700 font-medium text-sm">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">Find Jobs</li>
            <li className="cursor-pointer">Find Talents</li>
            <li className="cursor-pointer">About us</li>
            <li className="cursor-pointer">Testimonials</li>
          </ul>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-purple-600 text-white px-5 py-2 text-sm rounded-full font-semibold hover:bg-purple-700 transition"
        >
          Create Jobs
        </button>
      </nav>

      {/* Filter UI */}
      <div className="bg-[#FAFAFA] w-[90%] max-w-[1700px] mx-auto h-auto py-4 mt-6 px-8 rounded-full flex items-center justify-between">
        <div className="flex items-center space-x-10 flex-3">
          <div className="flex items-center pr-6 border-r">
            <CiSearch className="text-gray-400 text-xl mr-2" />
            <input
              type="text"
              placeholder="Search By Job Title, Role"
              value={jobTitleFilter}
              onChange={(e) => setJobTitleFilter(e.target.value)}
              className="bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400 w-48"
            />
          </div>

          <div className="flex items-center pr-20 border-r">
            <CiLocationOn className="text-gray-400 text-xl mr-2" />
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="bg-transparent text-sm text-gray-600 outline-none"
            >
              <option value="">Preferred Location</option>
              {[
                "Mumbai", "Delhi", "Bengaluru", "Kolkata", "Chennai", "Hyderabad", "Pune", "Ahmedabad", "Surat", "Jaipur",
                "Lucknow", "Visakhapatnam", "Nagpur", "Indore", "Bhopal", "Kanpur", "Amritsar", "Agra", "Varanasi",
                "Chandigarh", "Mysore", "Kochi", "Patna", "Vadodara", "Guwahati", "Coimbatore", "Gwalior", "Thiruvananthapuram"
              ].map((city, idx) => (
                <option key={idx} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center pr-10 border-r">
            <MdRecordVoiceOver className="text-gray-400 text-xl mr-2" />
            <select
              value={jobTypeFilter}
              onChange={(e) => setJobTypeFilter(e.target.value)}
              className="bg-transparent text-sm text-gray-600 outline-none"
            >
              <option value="">Job Type</option>
              <option value="FullTime">Full-time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
              <option value="PartTime">Part-time</option>
            </select>
          </div>
        </div>

        {/* Salary Slider */}
        <div className="flex flex-col ml-4 w-[300px]">
          <div className="flex justify-between mb-3 text-base font-semibold text-black-md">
            <span>Salary Per Month</span>
            <span>₹{(minSalary / 1000).toFixed(0)}k - ₹{(maxSalary / 1000).toFixed(0)}k</span>
          </div>
          <div className="relative w-full h-5">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 rounded-full -translate-y-1/2"></div>
            <div
              className="absolute top-1/2 h-1 bg-black rounded-full -translate-y-1/2"
              style={{
                left: `${(minSalary / 200000) * 100}%`,
                width: `${((maxSalary - minSalary) / 200000) * 100}%`,
              }}
            ></div>

            <input
              type="range"
              min={0}
              max={200000}
              step={1000}
              value={minSalary}
              onChange={(e) =>
                setMinSalary(Math.min(Number(e.target.value), maxSalary - 1000))
              }
              className="absolute w-full appearance-none bg-transparent pointer-events-none
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:pointer-events-auto
              [&::-webkit-slider-thumb]:h-5 
              [&::-webkit-slider-thumb]:w-5
              [&::-webkit-slider-thumb]:bg-black
              [&::-webkit-slider-thumb]:rounded-full 
              [&::-webkit-slider-thumb]:border
              [&::-webkit-slider-thumb]:border-black"
            />
            <input
              type="range"
              min={0}
              max={200000}
              step={1000}
              value={maxSalary}
              onChange={(e) =>
                setMaxSalary(Math.max(Number(e.target.value), minSalary + 1000))
              }
              className="absolute w-full appearance-none bg-transparent pointer-events-none
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:pointer-events-auto
              [&::-webkit-slider-thumb]:h-5 
              [&::-webkit-slider-thumb]:w-5
              [&::-webkit-slider-thumb]:bg-black
              [&::-webkit-slider-thumb]:rounded-full 
              [&::-webkit-slider-thumb]:border
              [&::-webkit-slider-thumb]:border-black"
            />
          </div>
        </div>
      </div>

      {/* Jobs Display */}
      <div className="px-6 mt-8">
       
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, idx) => (
              <JobCard
                key={idx}
                companyLogo={job.companyLogo}
                title={job.title}
                updateAt={job.updatedAt}
                exp={job.exp}
                mode={job.mode}
                desc = {job.description}
                salary={`${Math.floor(job.salary.min / 1000)}k - ${Math.floor(job.salary.max / 1000)}k`}
              />
            ))
          ) : (
            <div className="text-center col-span-full text-gray-500 text-sm">
              Please Wait...Loading...
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <CreateJobModal onClose={() => setShowModal(false)} refreshJobs={refreshJobs} />
      )}
    </div>
  );
};

export default NavbarWithSearch;
