const MyIcon = ({ icon, name, data }) => {
    console.log(data)
    return (
        <div className="flex items-center">
            <div className="flex-shrink-0 text-lg">
                {icon}
            </div>
            <div>
                <h2 className="text-sm font-semibold">{name}</h2>
                <p className=" text-sm text-gray-600">{data}</p>
            </div>
        </div>
    );
};

export default MyIcon;
