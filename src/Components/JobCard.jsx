import amazon from './../images/image 77.png';
import swiggy from './../images/image 78.png';
import { FiUserPlus } from "react-icons/fi";
import { MdBusiness } from "react-icons/md";
import { FaLayerGroup } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";


import { formatDistanceToNowStrict, differenceInMinutes, differenceInHours, differenceInDays } from "date-fns";

const formatTimeAgoShort = (date) => {
  const now = new Date();
  const diffMins = differenceInMinutes(now, date);
  const diffHours = differenceInHours(now, date);
  const diffDays = differenceInDays(now, date);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
};


const JobCard = ({ companyLogo, title, updateAt, exp, mode, desc ,salary }) => {
  
  console.log(updateAt)
  return (
    <div className="bg-white shadow-md p-3 m-5 w-[300px] h-[340px] gap-6px rounded-[12px]">
      <div className="flex justify-between items-start">
        <div className="w-[72px] h-[72px] bg-white shadow-md rounded-[12px] flex items-center justify-center">
            <img src={companyLogo} alt="Company" className="w-10 h-10" />
        </div>
        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
          <small className="text-xs text-gray-500">
            {formatTimeAgoShort(new Date(updateAt))}
          </small>
        </span>
      </div>
      <h2 className="text-[20px] font-semibold mt-4">{title}</h2>
      <div className="flex space-x-3 text-[12px] text-gray-500 mt-2">
        <span className="inline-flex items-center space-x-1">
          <FiUserPlus />
          <span>{exp}</span>
        </span>
        <span className="inline-flex items-center space-x-1">
          <MdBusiness />
          <span>{mode}</span>
        </span>
        <span className="inline-flex items-center space-x-1">
          <span>{<FaLayerGroup/>}</span>
          <span>{salary}</span>
        </span>
      </div>

      <ul className="text-[14px] text-gray-500 mt-3 list-disc pl-5">
        <li>{desc}</li>
      </ul>
      <button className="bg-blue-500  text-white py-2 w-[260px] h-[46px] rounded-md text-sm mt-1 font-semibold hover:bg-blue-600 transition">
        Apply Now
      </button>
    </div>
  );
};

export default JobCard;
