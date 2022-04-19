import React from "react"
// import NavbarKasir from "../component/NavbarKasir"
import { base_url } from "../config"
import "./Navbar.css";
import { Outlet, Link, Home } from "react-router-dom";
import { MdLocalLaundryService  } from  "react-icons/md";

class NavbarKasir extends React.Component

{
    
    constructor(){
        super()
        this.state = {
            token: "",
            adminName: null,
            productsCount: 0,
            membersCount: 0,
            transactionsCount: 0,
            adminsCount: 0
        }
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
    }
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }
    getAdmin = () => {
        let admin = JSON.parse(localStorage.getItem('admin'))
        this.setState({adminName: admin.name})
    }

    componentDidMount(){
        this.getAdmin()
    }

  render()
  {
    
   
    return (
        <div>
            <div id="sidenav">

            
            <ul class="NavbarKasir-nav bg-gradient-info sidebar sidebar-dark accordion" id="accordionSidebar">

              
                <a class="sidebar-brand d-flex align-items-center justify-content-center" href="#">
                <div class="sidebar-brand-icon rotate-n-15">
                <MdLocalLaundryService size={59} style={{color: "white"}}/>  
                </div>
                <div class="sidebar-brand-text mx-3">Laundry Kasir</div>
                </a>

                
                <hr class="sidebar-divider my-0" />
               
                <li class="nav-item active">
                <a class="nav-link" href="#">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <Link to="/dashboard">Dasbor</Link>
                    </a>
                    
                  
                </li>

              
                <hr class="sidebar-divider" />

              
                <div class="sidebar-heading">
                Interface
                </div>

               
                <li class="nav-item">
                <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                    <i class="fas fa-fw fa-cog"></i>
                    <span>Data</span>
                </a>
                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">Data - Data:</h6>
                    <a class="collapse-item" ><Link className="fix" to="/datamember">Member</Link></a>
                    <a class="collapse-item" ><Link to="/datatransaksi">Transaksi</Link></a>
                    <a class="collapse-item" ><Link to="/dataoutlet">Outlet</Link></a>
                    <a class="collapse-item" ><Link to="/datapaket">Paket</Link></a>
                    <a class="collapse-item"  ><Link disabled to="/petugas">Petugas</Link></a>
                    </div>
                </div>
                </li>

               
                <li class="nav-item">
                <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                    <i class="fas fa-fw fa-wrench"></i>
                    <span>Utilities</span>
                </a>
                <div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">Custom Utilities:</h6>
                    <a class="collapse-item" href="#">Colors</a>
                    <a class="collapse-item" href="#">Borders</a>
                    <a class="collapse-item" href="#">Animations</a>
                    <a class="collapse-item" href="#">Other</a>
                    </div>
                </div>
                </li>

              
                <hr class="sidebar-divider" />

               
                <div class="sidebar-heading">
                Addons
                </div>

               
                <li class="nav-item">
                <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
                    <i class="fas fa-fw fa-folder"></i>
                    <span>Pages</span>
                </a>
                <div id="collapsePages" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">Login Screens:</h6>
                    <a class="collapse-item" href="#">Login</a>
                    <a class="collapse-item" href="#">Register</a>
                    <a class="collapse-item" href="#">Forgot Password</a>
                    <div class="collapse-divider"></div>
                    <h6 class="collapse-header">Other Pages:</h6>
                    <a class="collapse-item" href="#">404 Page</a>
                    <a class="collapse-item" href="#">Blank Page</a>
                    </div>
                </div>
                </li>

               
                <li class="nav-item">
                <a class="nav-link" href="#">
                    <i class="fas fa-fw fa-chart-area"></i>
                    <span>Charts</span></a>
                </li>

                
                <li class="nav-item">
                <a class="nav-link" href="#">
                    <i class="fas fa-fw fa-table"></i>
                    <span>Tables</span></a>
                </li>

                
                <hr class="sidebar-divider d-none d-md-block" />

                
                <div class="text-center d-none d-md-inline">
                <button class="rounded-circle border-0" id="sidebarToggle"></button>
                </div>

            </ul>
    </div>
    </div>
) } }
 export default NavbarKasir;
