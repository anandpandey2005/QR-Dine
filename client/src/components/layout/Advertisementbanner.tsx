const Advertisementbanner = () => {
  return (
    <div className="w-full p-5 h-75 ">
      <div className="w-full h-full overflow-hidden">
        <img
          className="w-full h-full rounded-2xl object-cover"
          src={import.meta.env.VITE_DEFAULT_IMAGE}
          alt=""
        />
      </div>
    </div>
  );
};

export default Advertisementbanner;
