import axios from "axios";
const ProgressBar = () => {
  const [progress, setProgress] = React.useState(0);
  
  React.useEffect(() => {
    const handleProgress = (event) => {
      const percent = (event.loaded / event.total) * 100;
      setProgress(percent);
    };
  
    axios.interceptors.request.use((request) => {
      setProgress(0);
      document.body.style.cursor = "progress";
      return request;
    });
  
    axios.interceptors.response.use(
      (response) => {
        document.body.style.cursor = "default";
        return response;
      },
      (error) => {
        document.body.style.cursor = "default";
        throw error;
      }
    );
  
    axios.interceptors.response.use((response) => {
      handleProgress(response);
      return response;
    });
  
    axios.interceptors.request.use((request) => {
      request.onDownloadProgress = handleProgress;
      return request;
    });
  }, []);
  
  return (
    <div
      style={{
        width: `${progress}%`,
        height: "5px",
        background: "green",
        borderRadius: "3px",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    />
  );
};

