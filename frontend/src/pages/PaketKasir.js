import React from "react";
import axios from "axios";
import Navbar from '../component/NavbarKasir';
import { Modal, Button, Card, Container, Form } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import "./Option.css";

export default class PaketKasir extends React.Component {
    constructor() {
        super()
        this.state = {
            id_paket: "",
            jenis: "",
            harga: "",
            pakets: [],
            action: "",
            isModalOpen: false,
            token: ""
        }
    }
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }
    getPaket = async () => {
        let url = "http://localhost:4000/api/paket"
        await axios.get(url, this.headerConfig())
        .then(response => { 
            this.setState({pakets: response.data.data})
            console.log(response)
        })
        .catch(error => {
                console.log(error);
        })
        console.log(this.state.pakets)
    }
    componentDidMount = () => {
        this.getPaket()
    }
    handleAdd = () =>{
        this.setState({
            id_paket: 0,
            jenis: "",
            harga: "",
            action: "insert",
            isModalOpen: true
        })
    }
    handleEdit = (item) =>{
        this.setState({
            id_paket: item.id_paket,
            jenis: item.jenis,
            harga: item.harga,
            action: "update",
            isModalOpen: true
        })
    }
    handleClose = () => {
        this.setState({
            isModalOpen: false
        })
    }
    handleSave = (event) =>{
        event.preventDefault();
        // $("#modal_member").modal("hide")
        let url = "http://localhost:4000/api/paket"
        let form = {
            id_paket: this.state.id_paket,
            jenis: this.state.jenis,
            harga: this.state.harga
        }
        console.log(form)

    if(this.state.action === "insert"){
        
        let url = "http://localhost:4000/api/paket"
        axios.post(url, form, this.headerConfig())
        .then(response => { 
            window.alert("Tambah Data Berhasil")
            this.getPaket()
            this.handleClose()
            console.log(response)
        })
        .catch(error => {
            console.log(error);
        })
     }else if(this.state.action === "update"){
        axios.put(url, form)
        .then(response => {
            window.alert("Edit Data Berhasil")
            this.getPaket()
            this.handleClose()
            console.log(response)
        })
        .catch(error => {
            console.error();
        })
    }
}
    handleDelete = (id_paket) => {
        let url = "http://localhost:4000/api/paket/" + id_paket
        if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
          axios.delete(url)
          .then(response => {
            this.getPaket();
            this.handleClose()
            console.log(response)
          })
          .catch(error => {
            console.log(error);
          })
        }
    } 
    
    JenisPaket(jenis) {
        if (jenis === 'kaos') {
            return (
                <div className="text-nowrap">
                    Kaos
                </div>
            )
        } else if (jenis === 'kiloan') {
            return (
                <div className="text-nowrap">
                    Kiloan
                </div>
            )
        } else if (jenis === 'bed_cover') {
            return (
                <div className="text-nowrap">
                    Bed Cover
                </div>
            )
        } else if (jenis === 'selimut') {
            return (
                <div className="text-nowrap">
                    Selimut
                </div>
            )
        }
    }

    render(){
        return(
            <div className="row">
                <div className="col col-auto">
                    <Navbar />
                </div>
                <div className="col">
            <Container className="my-4">
                <Card className="card">
                    <Card.Body className="card-body">
                        <h2 className="text-black text-center my-4">
                            Data Paket
                        </h2>
                        <br />
                        <div className="">
                            <Button className="btn btn-success my-3 mx-3" onClick={() => this.handleAdd()}>
                                Add Paket
                            </Button>
                        </div>

                        <ul className="list-group mx-3">
                        {this.state.pakets.map(paket => (
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-lg-3">
                                        <small className="text-secondary">Jenis :</small>
                                        <h6>{this.JenisPaket(paket.jenis)}</h6>
                                    </div>
                                    <div className="col-lg-3">
                                        <small className="text-secondary">Harga :</small> <br />
                                        <h6>Rp. {paket.harga}</h6>
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
                    <Modal.Title>Form Tambah Paket</Modal.Title>
                </Modal.Header>
                <Form onSubmit={this.handleSave}>
                    <Modal.Body>
                    <Form.Group className="mb-2">
                            <Form.Label> Jenis </Form.Label>
                            <Form.Select id= "mySelect" value={this.state.jenis} 
                            onChange={ev => this.setState({jenis: ev.target.value})}>
                                <option className = "firstOption" value="" hidden = "true">Pilih Jenis Paket</option>
                                <option value="kiloan">Kiloan</option>
                                <option value="selimut">Selimut</option>
                                <option value="bed_cover">Bed Cover</option>
                                <option value="kaos">Kaos</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label> Harga </Form.Label>
                            <Form.Control type="text" value={this.state.harga}
                            onChange={ev => this.setState({harga: ev.target.value})} />
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
