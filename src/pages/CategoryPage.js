import axios from "../axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import ProductPreview from "../components/ProductPreview";
import "./CategoryPage.css";
import Pagination from "../components/Pagination";
function CategoryPage() {
    const { category } = useParams();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setLoading(true);
        axios
            .get(`/products/category/${category}`)
            .then(({ data }) => {
                setLoading(false);
                setProducts(data);
            })
            .catch((e) => {
                setLoading(false);
                console.log(e.message);
            });
    }, [category]);

    if (loading) {
        <Loading />;
    }

    const productsSearch = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));

    function ProductSearch({ _id, category, name, pictures }) {
        return <ProductPreview _id={_id} category={category} name={name} pictures={pictures} />;
    }

    return (
        <div className="category-page-container">
            <div className={`pt-3 ${category}-banner-container category-banner-container`}>
                <h1 className="text-center">{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
            </div>
            <div className="filters-container d-flex justify-content-center pt-4 pb-4">
                <input type="search" placeholder="Search" onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            {productsSearch.length === 0 ? (
                <h1>No products to show</h1>
            ) : (
                <Container>
                    <Row>
                        <Col md={{ span: 10, offset: 1 }}>
                            <Pagination data={productsSearch} RenderComponent={ProductSearch} pageLimit={1} dataLimit={5} tablePagination={false} />
                        </Col>
                    </Row>
                </Container>
            )}
        </div>
    );
}

export default CategoryPage;
