import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import Navbar from '../component/NavbarOwner';
import { Modal, Button, Card, Container, Form } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { FaInfo } from "react-icons/fa";
import { BsPrinterFill } from "react-icons/bs";
import moment from 'moment'
import "./Option.css";


// IKI SEk ERRORR

export default class TransaksiOwner extends React.Component {
    constructor() {
        super()
        this.state = {
            
            id_transaksi: "",
            id_outlet: "",
            transaksis: [],
            id_member: "",
            idUser: "",
            namaUser: "",
			tgl: "",
			batas_waktu: "",
			tgl_bayar: "",
			dibayar: "",
			id_user: "",
			detail_transaksi: [],
            users: [],
			members: [],
			pakets: [],
            outlets: [],
			id_paket: "",
            status: "",
			qty: 0,
			jenis_paket: "",
			harga: 0,
            action: "",
            isModalOpen: false
        }
    }
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }
    getTransaksi = async () => {
        let url = "http://localhost:4000/api/transaksi"
        await axios.get(url, this.headerConfig())
        .then(response => { 
            this.setState({transaksis: response.data.data})
        })
        .catch(error => {
                console.log(error);
        })
        // console.log(this.state.transaksis)
    }
    getMember = async () => {
        let url = "http://localhost:4000/api/member"
        await axios.get(url, this.headerConfig())
        .then(response => { 
            this.setState({members: response.data.data})
            // console.log(response)
        })
        .catch(error => {
                console.log(error);
        })
        // console.log(this.state.members)
    }
    getUser = () => {
        let admin = JSON.parse(localStorage.getItem('admin'))
        // console.log(admin.nama)
        this.setState({idUser: admin.id_user})
        this.setState({namaUser: admin.nama})
        let url = "http://localhost:4000/api/user"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({users: response.data.data})
            console.log(this.state.users)
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }
	getPaket = async () => {
        let url = "http://localhost:4000/api/paket"
        await axios.get(url, this.headerConfig())
        .then(response => { 
            this.setState({pakets: response.data.data})
            // console.log(response)
        })
        .catch(error => {
                console.log(error);
        })
        // console.log(this.state.pakets)
    }
    getOutlet = async () => {
        let url = "http://localhost:4000/api/outlet"
        await axios.get(url, this.headerConfig())
        .then(response => { 
            this.setState({outlets: response.data.data})
            // console.log(response)
        })
        .catch(error => {
                console.log(error);
        })
        // console.log(this.state.outlets)
    }

	componentDidMount() {
		this.getMember()
		this.getPaket()
        this.getUser()
        this.getTransaksi()
        this.getOutlet()
        
    }


    
    handleAdd = () =>{
        this.setState({
            id_transaksi: 0,
            tgl: "",
            batas_waktu: "",
            tgl_bayar: "",
            status: "",
            dibayar: "",
            id_user: "",
            id_member: "",
            id_outlet: "",
            action: "insert",
            isModalOpen: true
        })
    }
    handleEdit = (item) =>{
        this.setState({
            id_transaksi: item.id_transaksi,
            id_member: item.id_member,
            tgl: item.tgl,
            batas_waktu: item.batas_waktu,
            tgl_bayar: item.tgl_bayar,
            status: item.status,
            dibayar: item.dibayar,
            id_user: item.id_user,
            id_outlet: item.id_outlet,
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
        let url = "http://localhost:4000/api/transaksi"
        let form = {
            id_transaksi: this.state.id_transaksi,
            id_user: this.state.id_user,
            id_member: this.state.id_member,
            id_outlet: this.state.id_outlet,
            tgl: this.state.tgl,
            tgl_bayar: this.state.tgl_bayar,
            status: this.state.status,
            batas_waktu: this.state.batas_waktu,
        }

    if(this.state.action === "insert"){
        
        let url = "http://localhost:4000/api/transaksi"
        axios.post(url, form, this.headerConfig())
        .then(response => { 
            window.alert(response.data.message)
            this.getTransaksi()
            // console.log(response)
        })
        .catch(error => {
            console.log(error);
        })
     }else if(this.state.action === "update"){
        axios.put(url, form)
        .then(response => {
            window.alert(response.data.message)
            this.getTransaksi()
            // console.log(response)
        })
        .catch(error => {
            console.error();
        })
    } 
}
        handleDelete = (id_transaksi) => {
            let url = "http://localhost:4000/api/transaksi/" + id_transaksi
            if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
            axios.delete(url)
            .then(response => {
                this.getTransaksi();
                this.handleClose()
                // console.log(response)
            })
            .catch(error => {
                console.log(error);
            })
    }
}
        handleSaveEdit = (event) =>{
        event.preventDefault();
        // $("#modal_member").modal("hide")
        let url = "http://localhost:4000/api/transaksi"
        let form = {
            status: this.state.status,
            batas_waktu: this.state.batas_waktu,
        }
    }

        GantiStatusBayar(id_transaksi, dibayar) {
            if (dibayar === 'belum_dibayar') {
                return (
                    <div className="badge bg-danger text-white">
                        Belum Dibayar

                        <br />

                        {/* <a className="text-primary"
                            onClick={() => this.GantiStatusBayar(id_transaksi, 1)}>
                            Kilik disini untuk mengganti status
                        </a> */}
                    </div>
                )
            } else if (dibayar === 'dibayar') {
                return (
                    <div className="badge bg-success text-white">
                        Sudah Dibayar
                    </div>
                )
            }
        }
        GantiStatus(status) {
            if (status === 'baru') {
                return (
                    <div className="badge bg-info">
                        Baru
                        <br />
    
                    </div>
                )
            } else if (status === 'proses') {
                return (
                    <div className="badge bg-warning">
                        Sedang diproses
                        <br />

                    </div>
                )
            } else if (status === 'selesai') {
                return (
                    <div className="badge bg-secondary">
                        Siap Diambil
    
                        <br />
    
                        <a onClick={() => this.GantiStatus( 'diambil')} className="text-danger">
                        Klik disini untuk mengganti level
                        </a>
                    </div>
                )
            } else if (status === 'diambil') {
                return (
                    <div className="badge bg-success">
                        Telah Diambil
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
                            Data Transaksi
                        </h2>
                        <br />

                        <ul className="list-group mx-3">
                            <li className="list-group-item">
                            {this.state.transaksis.map(transaksi => (
                                <div className="row">
                                    <div className="col-lg-2">
                                        <small className="text-secondary">Tgl :</small>
                                        <h6>{moment(transaksi.tgl).format('DD-MM-YYYY')}</h6>
                                    </div>
                                    <div className="col-lg-2">
                                        <small className="text-secondary">Nama :</small>
                                        <h6>{transaksi.member.nama}</h6>
                                    </div>
                                    <div className="col-lg-2">
                                        <small className="text-secondary">Tgl Bayar :</small> <br />
                                        <h6>{moment(transaksi.tgl_bayar).format('DD-MM-YYYY')}</h6>
                                    </div>
                                    <div className="col-lg-2">
                                        <small className="text-secondary">Status :</small> <br />
                                        <h6>{this.GantiStatus(transaksi.status)}</h6>
                                    </div>
                                    <div className="col-lg-2">
                                        <small className="text-secondary">Batas Waktu :</small> <br />
                                        <h6>{moment(transaksi.batas_waktu).format('DD-MM-YYYY')}</h6>
                                    </div>
                                    <div className="col-lg-2">
                                        <small className="text-secondary">Pembayaran :</small> <br />
                                        <h6>{this.GantiStatusBayar(transaksi.id_transaksi, transaksi.dibayar)}
                                        </h6>
                                    </div>
                                    <div className="col-lg-2">
                                        <button className="btn btn-sm btn-info m-2">
                                        <Link to="/print"><BsPrinterFill style={{color: "white"}}/></Link>
                                        </button>
                                    </div>
                                </div>
                                ))}
                            </li>
                        </ul>
                    </Card.Body>
                </Card>
            </Container>
            </div>

            <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Form Tambah Transaksi</Modal.Title>
                </Modal.Header>
                <Form onSubmit={this.handleSave}>
                    <Modal.Body>
                    {/* <Form.Group className="mb-2">
                            <Form.Label> Nama User </Form.Label>
                            <Form.Control type="number" value={this.state.idUser} 
                            onChange={ev => this.setState({idUser: ev.target.value})}/>
                        </Form.Group> */}
                        <Form.Group className="mb-2">
                            <Form.Label> Nama User </Form.Label>
                            <Form.Select id= "mySelect" value={this.state.idUser} onChange={ev => this.setState({id_user: ev.target.value})}>
                                <option className = "opsitransaksi" value="" readOnly={true} hidden = "true">Pilih user</option>
							{this.state.users.map(user => (
								<option     value={user.id_user} >{user.nama}</option>
                                 ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label> Nama Member </Form.Label>
                            <Form.Select id= "mySelect" value={this.state.id_member} onChange={ev => this.setState({id_member: ev.target.value})}>
                                <option className = "firstOption" value="" hidden = "true">Pilih Member</option>
							{this.state.members.map(member => (
								<option value={member.id_member}>{member.nama}</option>
                                 ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label> Nama Outlet </Form.Label>
                            <Form.Select id= "mySelect" value={this.state.id_outlet} onChange={ev => this.setState({id_outlet: ev.target.value})}>
                                <option className = "firstOption" value="" hidden = "true">Pilih Outlet</option>
							{this.state.outlets.map(outlet => (
								<option value={outlet.id_outlet}>{outlet.nama}</option>
                                 ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label> Jenis Paket </Form.Label>
                            <Form.Select id= "mySelect" value={this.state.id_paket} onChange={ev => this.setState({id_paket: ev.target.value})}>
                                <option className = "firstOption" value="" hidden = "true">Pilih Paket</option>
							{this.state.pakets.map(paket => (
								<option value={paket.id_paket}>{paket.jenis}</option>
                                 ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label> Tanggal </Form.Label>
                            <Form.Control type="date" value={this.state.tgl} 
                            onChange={ev => this.setState({tgl: ev.target.value})} />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label> Batas Waktu </Form.Label>
                            <Form.Control type="date" value={this.state.batas_waktu}
                            onChange={ev => this.setState({batas_waktu: ev.target.value})} />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label> Tanggal Bayar </Form.Label>
                            <Form.Control type="date" value={this.state.tgl_bayar}
                            onChange={ev => this.setState({tgl_bayar: ev.target.value})}>
                            </Form.Control>
                        </Form.Group>
                        <div className="divider"></div>
                        <Form.Group className="mb-2">
                        <Form.Label> Status </Form.Label>
                            <Form.Select id= "mySelect" value={this.state.status} 
                            onChange={ev => this.setState({status: ev.target.value})}>
                                <option className = "firstOption" value="" hidden = "true">Pilih Status</option>
                                <option value="baru">Baru</option>
                                <option value="proses">Proses</option>
                                <option value="selesai">Selesai</option>
                                <option value="diambil">Diambil</option>
                            </Form.Select>
                            </Form.Group>
                            <Form.Label> Status Pembayaran </Form.Label>
                            <Form.Select id= "mySelect" value={this.state.dibayar} 
                            onChange={ev => this.setState({dibayar: ev.target.value})}>
                                <option className = "firstOption"  value="" hidden = "true">Pilih Status Pembayaran</option>
                                <option value="dibayar">Di Bayar</option>
                                <option value="belum_dibayar">Belum Dibayar</option>
                            </Form.Select>
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
