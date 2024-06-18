import axios from 'axios';
import { useEffect, useState } from "react";
import TableComponent from "../components/Table/TableComponent";
import TablePagination from "../components/Table/TablePagination";
import {API_DATA_LIMIT} from "../constants"
import DashboardLayout from '../components/layouts/DashboardLayout';


const headers=["ID","Name","Author","publisher","Publication Year","Subject"]

export const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [modalShown, setmodalShown] = useState({
    shown: false,
    component: null,
  });

  const changePage = async (newPage) => {
    console.log("change page called");
    if (newPage !== currentPage) {
      console.log("about to fetch data");
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/api/book/getAll?page=${newPage}&limit=${API_DATA_LIMIT}`);
        console.log("fetched response data : ", response.data);
        setData(response.data);
        setCurrentPage(newPage);
        setPages(Math.ceil(response.headers['x-total-count'] / API_DATA_LIMIT));
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        console.log("about to fetch data")
        const response = await axios.get(`http://localhost:3000/api/book/getAll?page=${currentPage}&limit=${API_DATA_LIMIT}`);
        console.log("response from backend : ",response);
        console.log("fetched response data : ", response.data);
        setData(response.data);
        setCurrentPage(response.data.currentPage);
        setPages(Math.ceil(response.headers['x-total-count'] / API_DATA_LIMIT));
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <TableComponent data={data} loading={loading} headers={headers} />
      <TablePagination currentPage={currentPage} totalPages={pages} onPageChange={changePage} />
      {modalShown.shown && <ModalContainer>{modalShown.component}</ModalContainer>}
    </DashboardLayout>
  );
};

export default Dashboard;