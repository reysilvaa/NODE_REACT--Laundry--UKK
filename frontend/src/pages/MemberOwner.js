import React from "react";
import axios from "axios";
import Navbar from '../component/NavbarOwner';
import { Modal, Button, Card, Container, Form } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import "./Home.scoped.css";
import NavbarOwner from "../component/NavbarOwner";

export default class Member extends React.Component {
    constructor() {
        super()
        this.state = {
            id_member: "",
            nama: "",
            alamat: "",
            jenis_kelamin: "",
            tlp: "",
            members: [],
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
    getMember = async () => {
        let url = "http://localhost:4000/api/member"
        await axios.get(url, this.headerConfig())
        .then(response => { 
            this.setState({members: response.data.data})
            console.log(response)
        })
        .catch(error => {
                console.log(error);
        })
        console.log(this.state.members)
    }
    componentDidMount = () => {
        this.getMember()
    }

    handleClose = () => {
        this.setState({
            isModalOpen: false
        })
    }
 

    render(){
        return(
            <div className="row">
                <div className="col col-auto">
                    <NavbarOwner />
                </div>
                <div className="col">
            <Container className="my-4">
                <Card className="card">
                    <Card.Body className="card-body">
                        <h2 className="text-black text-center my-4">
                            Data Member
                        </h2>
                        <br />
                        <div className="">
                        </div>

                        <ul className="list-group mx-3">
                        {this.state.members.map(member => (
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-lg-3">
                                        <small className="text-secondary">Nama :</small>
                                        <h6>{member.nama}</h6>
                                    </div>
                                    <div className="col-lg-3">
                                        <small className="text-secondary">Alamat :</small> <br />
                                        <h6>{member.alamat}</h6>
                                    </div>
                                    <div className="col-lg-2">
                                        <small className="text-secondary">Jenis Kelamin :</small> <br />
                                        <h6>{member.jenis_kelamin}</h6>
                                    </div>
                                    <div className="col-lg-2">
                                        <small className="text-secondary">Telepon :</small> <br />
                                        <h6>{member.tlp}</h6>
                                    </div>
                                </div>
                            </li>
                            ))}
                        </ul>
                    </Card.Body>
                </Card>
            </Container>
            </div>
        </div>
    );
    }
}
