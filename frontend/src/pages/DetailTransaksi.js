import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from '../component/Navbar';
import { Modal, Button, Card, Container, Form, Row, Col } from "react-bootstrap";
import { AiFillEdit, AiFillPrinter } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import moment from 'moment'
import "./Option.css";
import Pdf from "react-to-pdf";

import { FaInfo } from "react-icons/fa";
import { BsPrinterFill } from "react-icons/bs";

const ref = React.createRef();

export default class Transaksi extends React.Component {
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
            isModalOpen: false,
            isModalEdit: false
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
                this.setState({ transaksis: response.data.data })
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
                this.setState({ members: response.data.data })
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
        this.setState({ idUser: admin.id_user })
        this.setState({ namaUser: admin.nama })
        let url = "http://localhost:4000/api/user"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ users: response.data.data })
                console.log(this.state.users)
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status) {
                        window.alert(error.response.data.message)
                        this.props.history.push("/login")
                    }
                } else {
                    console.log(error);
                }
            })
    }
    getPaket = async () => {
        let url = "http://localhost:4000/api/paket"
        await axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ pakets: response.data.data })
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
                this.setState({ outlets: response.data.data })
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



    handleAdd = () => {
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
    handleEdit = (item) => {
        this.setState({
            id_transaksi: item.id_transaksi,
            id_member: item.id_member,
            id_outlet: item.id_outlet,
            id_paket: item.id_paket,
            tgl_bayar: item.tgl_bayar,
            status: item.status,
            dibayar: item.dibayar,
            action: "update",
            isModalEdit: true
        })
    }
    handleClose = () => {
        this.setState({
            isModalOpen: false
        })
    }
    handleCloseEdit = () => {
        this.setState({
            isModalEdit: false
        })
    }
    handleSave = (event) => {
        event.preventDefault();
        // $("#modal_member").modal("hide")
        let url = "http://localhost:4000/api/transaksi"
        let form = {
            id_transaksi: this.state.id_transaksi,
            id_user: this.state.id_user,
            id_member: this.state.id_member,
            id_outlet: this.state.id_outlet,
            id_paket: this.state.id_paket,
            tgl: this.state.tgl,
            qty: this.state.qty,
            tgl_bayar: this.state.tgl_bayar,
            status: this.state.status,
            batas_waktu: this.state.batas_waktu,
            dibayar: this.state.dibayar,
        }

        if (this.state.action === "insert") {

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
        } else if (this.state.action === "update") {
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
    handleSaveEdit = (event) => {
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

                    <a onClick={() => this.GantiStatus('diambil')} className="text-danger">
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
    // convertPdf() {
    //     // ambil element yang akan diconvert ke pdf
    //     let element = document.getElementById(`target`)
    //     let options = {
    //         filename: "Rincian Data Transaksi.pdf"
    //     }

    //     domToPdf(element, options, () => {
    //         window.alert("file will download soon")
    //     })
    // }

    render() {
        return (
            <div className="row">
                <div className="col col-auto">
                    <Navbar />
                </div>
                <div className="col">
                     <Pdf targetRef={ref} filename="struk-pembayaran.pdf" x={.5} y={.5} scale={0.8}>
                                        {({ toPdf }) =>
                                        <Button variant="contained" sx={{ ml: '3px' }} color='secondary' onClick={toPdf}>
                                            Detail Semua Transaksi
                                        </Button>
                    }
                  </Pdf>
                    <Container className="my-4" style={{ width: '200rem' }}>
                        <Card className="card" >
                            <Card.Body className="card-body">
                                <h2 className="text-black text-center my-4">
                                    Data Transaksi
                                </h2>
                                <br />

                                <ul className="list-group mx-3">
                                    <div ref={ref}>

                                        <li className="list-group-item">
                                            {this.state.transaksis.map(transaksi => (
                                                <div className="row">
                                                    <div className="col-xxx-10">
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
                                                        <small className="text-secondary">Petugas :</small> <br />
                                                        <h6>{transaksi.user.nama}
                                                        </h6>z
                                                    </div>
                                                    <div className="col-lg-2">
                                                        <small className="text-secondary">Qty :</small> <br />
                                                        <h6>{transaksi.qty}
                                                        </h6>
                                                    </div>
                                                </div>
                                            ))}
                                        </li>
                                    </div>
                                </ul>
                            </Card.Body>
                        </Card>
                    </Container>
                </div>
            </div>
        );
    }
}

// 