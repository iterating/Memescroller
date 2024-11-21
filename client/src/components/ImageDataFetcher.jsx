import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const ImageDataFetcher = () => {
  console.log("ImageDataFetcher");
  const dispatch = useDispatch();
  const sourceUrls = useSelector((state) => state.sourceUrls);

  useEffect(() => {
    console.log("ImageDataFetcher useEffect");
    const getImage = async () => {
      if (!sourceUrls || sourceUrls.length === 0) {
        console.warn("No source URLs provided.");
        return;
      }

      try {
        const responses = await Promise.allSettled(
          sourceUrls.map((url) => axios.get(url))
        );

        const data = responses
          .filter((res) => res.status === "fulfilled")
          .flatMap((res) =>
            res.value.data.data.children
              .map((child) => child.data.url)
              //filter out non-image urls
              .filter((url) => /\.(jpg|png|gif|webp)$/i.test(url) 
              //filter out nsfw
              && !/\/nsfw\//i.test(url) && url
                .includes("https://i.redd.it")
              )
          );

        dispatch({ type: "SET_IMAGE_DATA", payload: data });
      } catch (error) {
        console.error("Error fetching image data:", error);
      }
    };

    getImage();
  }, [sourceUrls, dispatch]);

  return null; 
};

export default ImageDataFetcher;
