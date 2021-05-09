import React, { useState } from 'react'
import { Row, Col, Button } from 'reactstrap';
import { withRouter } from "react-router-dom";
import ProductImage from './ProductImage'
function WorkoutDetail(props) {

    const descWorkout = props.location.aboutProps.workout
    const date = new Date(descWorkout.startDate);
    const dateOutput = date.getDate() +'-' + (date.getMonth()+1) + '-'+ date.getFullYear();

    const goBack = () => {
        props.history.goBack();
    }
    return (
        <div>
            <Row className="product-row">
                <Col>
                    <ProductImage images={descWorkout.images}></ProductImage>
                </Col>
                <Col className="workoutDetails">
                    <div style={{ paddingLeft: "10px" }}>
                        <div>
                            <h2>
                                <b>{descWorkout.name}</b>
                            </h2>
                        </div>
                        <div>
                            <div className="paddingTop">
                                <h5>
                                    {descWorkout.description}
                                </h5>
                            </div>

                        </div>
                        <div className="paddingTop">
                            <p>
                                {dateOutput}
                            </p>

                        </div>
                        <div className="paddingTop">
                            <p>
                            Category: {descWorkout.category}
                            </p>
                        </div>
                        <div className="buttonPadding">
                            <Button color="primary" onClick={() => goBack()} outline>Go Back</Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
export default withRouter(WorkoutDetail)
