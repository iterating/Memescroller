export async function axiosInterceptor() {
  axios.interceptors.request.use((request) => {
    progressBar.style.width = "0%";
    document.body.style.cursor = "progress";
    // request.metadata = request.metadata || {};
    // request.metadata.startTime = new Date().getTime();
    return request;
  });
  
  axios.interceptors.response.use(
    (response) => {
      // response.config.metadata.endTime = Date.now();
      // response.config.metadata.durationInMS =
      //   response.config.metadata.endTime - response.config.metadata.startTime;
  
      // response.config.metadata.endTime - response.config.metadata.startTime;
  
      // console.log(
      //   `Request took ${response.config.metadata.durationInMS} milliseconds.`
      // );
      document.body.style.cursor = "default";
      return response;
    // },
    // (error) => {
    //   error.config.metadata.endTime = Date.now();
    //   error.config.metadata.durationInMS =
    //     error.config.metadata.endTime - error.config.metadata.startTime;
  
    //   console.log(
    //     `Error, Request took ${error.config.metadata.durationInMS} milliseconds.`
    //   );
      document.body.style.cursor = "default";
  
      throw error;
    }
  );
}

  export function updateProgress(event) {
    const percent = (event.loaded / event.total) * 100;
    progressBar.style.width = `${percent}%`;
  }