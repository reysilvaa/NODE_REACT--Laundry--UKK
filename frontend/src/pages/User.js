import React from "react";
import axios from "axios";
import Navbar from '../component/Navbar';
import "./Option.css";
import { Modal, Button, Card, Container, Form } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { Md5G, MdDelete } from "react-icons/md";

export default class User extends React.Component {
    constructor(){
        super()
    
        if (localStorage.getItem("role")) {
            let role = localStorage.getItem("role")
            if (role === "admin") {
                window.alert("Selamat Datang Admin")
            }
            else {
                window.alert("Anda bukan admin")
            }
            
        }
    
        this.state = {
            id_user: "",
            nama: "",
            username: "",
            password: "",
            role: "",
            users: [],
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
    getUser = async () => {
        let url = "http://localhost:4000/api/user"
        await axios.get(url, this.headerConfig())
        .then(response => { 
            this.setState({users: response.data.data})
            console.log(response)
        })
        .catch(error => {
                console.log(error);
        })
        console.log(this.state.users)
    }
    componentDidMount = () => {
        this.getUser()
    }
    handleAdd = () =>{
        this.setState({
            id_user: 0,
            nama: "",
            username: "",
            password: "",
            role: "",
            action: "insert",
            isModalOpen: true
        })
    }
    handleEdit = (item) =>{
        this.setState({
            id_user: item.id_user,
            nama: item.nama,
            username: item.username,
            password: item.password,
            role: item.role,
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
        let url = "http://localhost:4000/api/user"
        let form = {
            id_user: this.state.id_user,
            nama: this.state.nama,
            username: this.state.username,
            password: this.state.password,
            role: this.state.role
        }
        console.log(form)

    if(this.state.action === "insert"){
        
        let url = "http://localhost:4000/api/user"
        axios.post(url, form, this.headerConfig())
        .then(response => { 
            window.alert("Tambah Data Berhasil")
            this.getUser()
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
            this.getUser()
            this.handleClose()
            console.log(response)
        })
        .catch(error => {
            console.error();
        })
    }
}

    handleDelete = (id_user) => {
        let url = "http://localhost:4000/api/user/" + id_user
        if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
          axios.delete(url)
          .then(response => {
            this.getUser();
            this.handleClose()
            console.log(response)
          })
          .catch(error => {
            console.log(error);
          })
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
                            Data User
                        </h2>
                        <br />
                        <div className="">
                            <Button className="btn btn-success my-3 mx-3" onClick={() => this.handleAdd()}>
                                Add User
                            </Button>
                        </div>

                        <ul className="list-group mx-3">
                        {this.state.users.map(user => (
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-lg-3">
                                        <small className="text-secondary">Nama :</small>
                                        <h6>{user.nama}</h6>
                                    </div>
                                    <div className="col-lg-3">
                                        <small className="text-secondary">Username :</small> <br />
                                        <h6>{user.username}</h6>
                                    </div>
                                    <div className="col-lg-3">
                                        <small className="text-secondary">Role :</small> <br />
                                        <h6>{user.role}</h6>
                                    </div>
                                    <div className="col-lg-2">
                                        <button className="btn btn-sm btn-warning m-2" onClick={() => this.handleEdit(user)}>
                                            <AiFillEdit style={{color: "white"}}/>
                                        </button>
                                        <button className="btn btn-sm btn-danger m-2" onClick={() => this.handleDelete(user.id_user)}>
                                            <MdDelete style={{color: "white"}}/>
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
                    <Modal.Title>Form Tambah Petugas</Modal.Title>
                </Modal.Header>
                <Form onSubmit={this.handleSave}>
                    <Modal.Body>
                    <Form.Group className="mb-2">
                        <Form.Group className="mb-2">
                            <Form.Label> Nama </Form.Label>
                            <Form.Control type="text" value={this.state.nama}
                            onChange={ev => this.setState({nama: ev.target.value})} />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label> Username </Form.Label>
                            <Form.Control type="text" value={this.state.username}
                            onChange={ev => this.setState({username: ev.target.value})} />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label> Password </Form.Label>
                            <Form.Control type="password" value={this.state.password}
                            onChange={ev => this.setState({password: ev.target.value})} />
                        </Form.Group>
                        <Form.Label> Role </Form.Label>
                            <Form.Select id= "mySelect" value={this.state.role} 
                            onChange={ev => this.setState({role: ev.target.value})}>
                                <option value="" hidden = "true">Pilih Role</option>
                                <option value="admin">Admin</option>
                                <option value="kasir">Kasir</option>
                                <option value="owner">Owner</option>
                            </Form.Select>
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
