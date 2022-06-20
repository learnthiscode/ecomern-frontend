import { useState } from "react";
import "./Pagination.css";
export default function Pagination({ data, RenderComponent, title, pageLimit, dataLimit, tablePagination }) {
    const [pages] = useState(Math.floor(data.length / dataLimit) + 1);
    const [currentPage, setCurrentPage] = useState(1);

    function goToNextPage() {
        setCurrentPage((page) => page + 1);
    }

    function goToPreviousPage() {
        setCurrentPage((page) => page - 1);
    }

    function changePage(event) {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
    };

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;

        return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
    };

    return (
        <>
            {tablePagination ? (
                getPaginatedData().map((data, idx) => <RenderComponent key={idx} {...data} />)
            ) : (
                <div className="dataContainer d-flex justify-content-center flex-wrap">
                    <h1>{title}</h1>

                    {getPaginatedData().map((data, idx) => (
                        <RenderComponent key={idx} {...data} />
                    ))}
                </div>
            )}

            {/* show the next and previous buttons */}
            {data.length > dataLimit && (
                <div className="pagination">
                    <button onClick={goToPreviousPage} className={`prev ${currentPage === 1 ? "disabled" : ""}`}>
                        prev
                    </button>
                    {getPaginationGroup().map((item, index) => (
                        <button key={index} onClick={changePage} className={`paginationItem ${currentPage === item ? "active" : ""}`}>
                            <span>{item}</span>
                        </button>
                    ))}
                    <button onClick={goToNextPage} className={`next ${currentPage >= pages ? "disabled" : ""}`}>
                        next
                    </button>
                </div>
            )}
        </>
    );
}
