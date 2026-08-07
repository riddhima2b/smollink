import FadeLoader from "react-spinners/FadeLoader";

function Spinner ({loading}) {
    return (
        <div className="flex items-center justify-center bg-[#0B0A12] opacity-90">
            <FadeLoader color="#FF4D82" loading={loading} />
        </div>
    )
};
export default Spinner;
