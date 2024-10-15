export async function axiosInterceptor() {

  axios.interceptors.request.use(async (request) => {
    if (!progressBar) {
      console.error("Error: progressBar element not found");
      return request;
    }
    progressBar.style.width = "0%";
    document.body.style.cursor = "progress";
    request.metadata = request.metadata || {};
    request.metadata.startTime = new Date().getTime();
    return request;
  });

  axios.interceptors.response.use(
    async (response) => {
      if (response.config && response.config.metadata) {
        response.config.metadata.endTime = Date.now();
        response.config.metadata.durationInMS =
          response.config.metadata.endTime - response.config.metadata.startTime;
      }
      document.body.style.cursor = "default";
      return response;
    },
    async (error) => {
      if (error.config && error.config.metadata) {
        error.config.metadata.endTime = Date.now();
        error.config.metadata.durationInMS =
          error.config.metadata.endTime - error.config.metadata.startTime;
      }
      document.body.style.cursor = "default";
      return Promise.reject(error);
    }
  );
}

export async function updateProgress(progressEvent) {
  if (!progressEvent || !progressEvent.total) {
    console.error("Error: Invalid event object");
    return;
  }
  
  const percent = (progressEvent.loaded / progressEvent.total) * 100;
  if (!progressBar) {
    console.error("Error: progressBar element not found");
    return;
  }
  progressBar.style.width = `${percent}%`;
}


