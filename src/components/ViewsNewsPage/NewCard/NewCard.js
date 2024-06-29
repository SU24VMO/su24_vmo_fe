/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { Link } from "react-router-dom";

const formatDate = (dateString) => {
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('vi-VN', options).replace('thg', 'Thg');
};

const NewCard = ({ index, title, imageUrl, date, postId }) => {

  const formattedDate = formatDate(date); // Định dạng ngày tháng

  return (
    <Link
      to={`newsDetail/${postId}`}
      className={`group relative flex h-72 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg tablet:h-80 ${
        index % 4 === 1 || index % 4 === 2 ? "tablet:col-span-2" : ""
      }`}
    >
      <img
        src={imageUrl}
        loading="lazy"
        alt="News Photo"
        className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent text-end mt-3">
        <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2 py-1 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
          {formattedDate}
        </span>
      </div>
      <span className="relative ml-4 mb-3 inline-block text-base font-bold text-white tablet:ml-5 tablet:text-lg break-words w-3/4">
        {title}
      </span>
    </Link>
  );
};

export default NewCard;
