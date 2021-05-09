import React, { useState, useEffect } from 'react';
import {
    Link,
    withRouter
} from "react-router-dom";
import { Row, Col, Input, Card, CardText, CardBody, CardTitle, Button } from 'reactstrap';
import axios from "axios";
import { Multiselect } from 'multiselect-react-dropdown';
import PaginationComponent from "react-reactstrap-pagination";

function Workouts() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);
    const [lastClicked, setLastClicked] = useState(null);
    const [workouts, setWorkouts] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const [selectedPage, setSelectedPage] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [category, setCategory] = useState([]);
    const [startDate, setStartDate] = useState("");
    const options = [{ name: 'C1', value: "c1" }, { name: 'C2', value: "c2" }, { name: 'C3', value: "c3" }, { name: 'C4', value: "c4" }, { name: 'C5', value: "c5" }, { name: 'C6', value: "c6" }, { name: 'C7', value: "c7" }]
    useEffect(() => {
        console.log(startDate)
        console.log(category)
        if (startDate === "" && category.length === 0) {
            axios.post('http://localhost:4000/api/workout', {
                pageNumber: pageNumber
            }).then(function (response) {
                console.log(response.data);
                if (response.data.code === "11") {
                    setWorkouts(response.data.data.workouts)
                    setNumberOfPages(response.data.data.totalPages)
                    console.log("numberOfPages", numberOfPages)
                    console.log("pageNumber", pageNumber)
                }
            }).catch(function (error) {
                console.log(error);
            });
        } else {
            axios.post('http://localhost:4000/api/workout/filter', {
                startDate: startDate,
                category: category,
                pageNumber: pageNumber
            }).then(function (response) {
                console.log(response.data);
                if (response.data.code === "11") {
                    setWorkouts(response.data.data.workouts)
                    setNumberOfPages(response.data.data.totalPages)
                    console.log("numberOfPages", numberOfPages)
                    console.log("pageNumber", pageNumber)
                }
            }).catch(function (error) {
                console.log(error);
            });
        }

    }, [pageNumber]);

    const onSelect = (e) => {
        console.log(e)
        setCategory(e)
    }
    const onSelectStartDate = (e) => {
        setStartDate(String(e.target.value))
        console.log(e.target)
        console.log(e.target.value)
        console.log(e)
        console.log(startDate)
    }
    const searchHandler = () => {
        if (startDate === "" && category.length === 0) {
            axios.post('http://localhost:4000/api/workout', {
                pageNumber: pageNumber
            }).then(function (response) {
                console.log(response.data);
                if (response.data.code === "11") {
                    setWorkouts(response.data.data.workouts)
                    setNumberOfPages(response.data.data.totalPages)
                    console.log("numberOfPages", numberOfPages)
                    console.log("pageNumber", pageNumber)
                }
            }).catch(function (error) {
                console.log(error);
            });
        } else {
            axios.post('http://localhost:4000/api/workout/filter', {
                startDate: startDate,
                category: category,
                pageNumber: pageNumber
            }).then(function (response) {
                console.log(response.data);
                if (response.data.code === "11") {
                    setWorkouts(response.data.data.workouts)
                    setNumberOfPages(response.data.data.totalPages)
                    console.log("numberOfPages", numberOfPages)
                    console.log("pageNumber", pageNumber)
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
    const handleSelected = (selectedPage) => {
        console.log("selected", selectedPage);
        setSelectedPage(selectedPage);
        setPageNumber(selectedPage - 1)
    }
    return (
        <>
            <Row style={{ padding: "20px" }}>
                <Col xs="12">
                    <div className="heading-div">
                        <div>
                            <h3>All Workouts</h3>
                        </div>
                        <div className="select-div">
                            <Input style={{ height: "100%" }} type="date" onChange={(e) => { onSelectStartDate(e) }} id="start" name="start" min="2018-03" defaultValue="2018-05" />

                            <Multiselect
                                placeholder="Category"
                                options={options} // Options to display in the dropdown
                                onSelect={(e) => onSelect(e)} // Function will trigger on select event
                                displayValue="name" // Property name to display in the dropdown options
                            />

                            <Button primary color="primary" onClick={() => searchHandler()}>Search</Button>
                        </div>
                    </div>


                </Col>
                <Col xs="12">
                    <div className="card-row">
                        {
                            workouts.length > 0 ? workouts.map((workout) => (
                                <>

                                    <Card>
                                        <CardBody>
                                            <CardTitle tag="h5">{workout.name}</CardTitle>
                                            <CardText>{workout.description}.</CardText>
                                            <Link to={{ pathname: "/detail", aboutProps: { workout } }}><Button color="primary" outline>View More</Button> </Link>
                                        </CardBody>

                                    </Card>

                                </>
                            )) :
                                (<Col xs="12" className="no-workouts">
                                    <div>No Workouts Found</div>
                                </Col>)
                        }
                    </div>
                </Col>
            </Row>
            <PaginationComponent
                totalItems={(numberOfPages * 10) - 1}
                pageSize={5}
                onSelect={handleSelected}
            />
        </>
    )
}
export default withRouter(Workouts)
