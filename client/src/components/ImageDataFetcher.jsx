import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import * as api from "../config/api"

const fetchImageUrls = async (urls) => {
  const responses = await Promise.allSettled(
    urls.map((url) => axios.get(url))
  )

  return responses
    .filter((res) => res.status === "fulfilled")
    .flatMap((res) =>
      res.value.data.data.children
        .map((child) => child.data.url)
        .filter(
          (url) =>
            url &&
            Object.values(api.urlFilters).every(
              (regex) => regex.test(url)
            ) &&
            url.includes("https://i.redd.it")
        )
    )
    .sort(() => 0.5 - Math.random())
}

const ImageDataFetcher = () => {
  console.log("ImageDataFetcher")
  const dispatch = useDispatch()
  const sourceUrls = useSelector((state) => state.sourceUrls)

  useEffect(() => {
    console.log("ImageDataFetcher useEffect")
    if (!sourceUrls || sourceUrls.length === 0) {
      console.warn("No source URLs provided.")
      return
    }

    fetchImageUrls(sourceUrls).then((data) =>
      dispatch({ type: "SET_IMAGE_DATA", payload: data })
    )
  }, [sourceUrls, dispatch])

  return null
}

export default ImageDataFetcher

