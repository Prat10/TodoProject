"use client";

const Card = (props) => {
  // Function to strip HTML tags
const stripHtml = (html, maxLength = 50) => {
  if (!html) return ""; // Handle null/undefined case
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  const text = tempDiv.textContent || tempDiv.innerText || "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text + "...";
};

function formatDateFromTimestamp(timestamp) {
  const date = new Date(timestamp);

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}
const plainText = stripHtml(props?.detail?.description,30);
    return (
      <div className="bg-white p-4 rounded-lg shadow-md w-full h-[97px] cursor-pointer"
       onClick={() => props.handleCardClick && props.handleCardClick(props.detail)}> 
        <h2 className="text-lg font-semibold">{props.detail.title}</h2>
        <p className="text-gray-600 text-sm">
        {plainText}
        </p>
        <p className="text-gray-400 text-xs text-right mt-2">{formatDateFromTimestamp(Number(props.detail.time))}</p>
      </div>
    );
  };
  
export default Card;
  