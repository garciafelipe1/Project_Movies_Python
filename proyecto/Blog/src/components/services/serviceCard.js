function ServiceCard({ data, index }) {
  return (
    <div
      className="w-full relative p-8 h-96 lg:h-[200px] bg-white hover:-translate-y-1 transition duration-300 ease-in-out"
      onMouseEnter={() => {
        const titleElement = document.getElementById(index);
        titleElement.classList.add("text-orange-500");
        titleElement.classList.remove("text-gray-900");
      }}
      onMouseLeave={() => {
        const titleElement = document.getElementById(index);
        titleElement.classList.remove("text-orange-500");
        titleElement.classList.add("text-gray-900");
      }}
    >
      <div className="w-full flex flex-col justify-between h-full gap-4">
        <div>
          <img src={data.img} className="w-10 h-10" alt="Service" />
          <h2 className="text-xl font-semibold text-gray-900 pt-8">
            {data.title}
          </h2>
          <p className="text-lg font-medium text-gray-500 pt-4">
            {data.title}
          </p>
        </div>
        <div>
          <h2 id={index} className="text-xl font-semibold text-orange-500">
            Learn More
          </h2>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;
