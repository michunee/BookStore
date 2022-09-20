import { useParams } from "react-router-dom";
import Header from "../components/Header"
import useAxios from "../hooks/useAxios";

function BookDetail() {
    const { id } = useParams();
    console.log(id);

    const { response, error, loading } = useAxios({ url: `/books/${id}` })

    return (
        <div>
            {/* <Header /> */}
            <h1>Book Detail</h1>
            <h1>{ }</h1>
        </div>
    )
}

export default BookDetail