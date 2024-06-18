import { useEffect, useState } from "react"
import axios from "../axios.config";

export default function useData() {
  const [books, setBooks] = useState([]);
  const [fetchingBooks, setFetchingBooks] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setFetchingBooks(true)
      try {
        console.log("about to fetch data")
        const response = await axios.get(`/book/getAll`);
        console.log("response from backend : ", response);
        console.log("fetched response data : ", response.data);
        setBooks(response.data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setFetchingBooks(false);
      }
    }
    fetchData();
  }, []);

  return {
    books,
    fetchingBooks
  }
}
