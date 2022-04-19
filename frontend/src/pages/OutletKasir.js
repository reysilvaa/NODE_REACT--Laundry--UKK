import React from "react";
import axios from "axios";
import Navbar from '../component/NavbarKasir';
import { Modal, Button, Card, Container, Form } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import {Link} from "react-router-dom";
import { BsPrinterFill } from "react-icons/bs";
import "./Fix.css";

export default class Outlet extends React.Component {
    constructor() {
        super()
        this.state = {
            id_outlet: "",
            nama: "",
            lokasi: "",
            outlets: [],
            action: "",
            token: "",
            isModalOpen: false
        }
    }
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }
    getOutlet = async () => {
        let url = "http://localhost:4000/api/outlet"
        await axios.get(url, this.headerConfig())
        .then(response => { 
            this.setState({outlets: response.data.data})
            console.log(response)
        })
        .catch(error => {
                console.log(error);
        })
        console.log(this.state.outlets)
    }
    componentDidMount = () => {
        this.getOutlet()
    }
    render(){
        return(
            <div className="row">
                <div className="col col-auto">
                    <Navbar />
                </div>
                <div className="row">
            <Container className="my-4">
                <Card className="card">
                    <Card.Body className="card-body">
                        <h2 className="text-black text-center my-4">
                            List of Outlet
                        </h2>
                        <br />

                        <ul className="list-group mx-3">
                        {this.state.outlets.map(outlet => (
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-lg-3">
                                        <small className="text-secondary">Nama :</small>
                                        <h6>{outlet.nama}</h6>
                                    </div>
                                    <div className="col-lg-3">
                                        <small className="text-secondary">Lokasi :</small> <br />
                                        <h6>{outlet.lokasi}</h6>
                                    </div>
                                    <div className="col-lg-2">
                                        <button className="btn btn-sm btn-info m-2">
                                        <Link to="/print"><BsPrinterFill style={{color: "white"}}/></Link>
                                        </button>
                                    </div>
                                </div>
                            </li>
                            ))}
                        </ul>
                    </Card.Body>
                </Card>
            </Container>
            </div>

            <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Form Tambah Outlet</Modal.Title>
                </Modal.Header>
                <Form onSubmit={this.handleSave}>
                    <Modal.Body>
                        <Form.Group className="mb-2">
                            <Form.Label>Nama</Form.Label>
                            <Form.Control type="text" value={this.state.nama} 
                            onChange={ev => this.setState({nama: ev.target.value})} />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label> Lokasi </Form.Label>
                            <Form.Control type="text" value={this.state.lokasi}
                            onChange={ev => this.setState({lokasi: ev.target.value})} />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </div>
                    </Modal.Body>
                </Form>
            </Modal>
        </div>
    );
    }
}
