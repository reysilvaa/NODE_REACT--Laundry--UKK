import React from "react"
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login"
import Paket from "./pages/Paket"
import Transaksi from "./pages/Transaksi"
import Home from "./pages/Home"
import User from "./pages/User"
import Outlet from "./pages/Outlet"
import HomeKasir from "./pages/HomeKasir"
import HomeOwner from "./pages/HomeOwner"
import MemberKasir from "./pages/MemberKasir"
import MemberOwner from "./pages/MemberOwner"
import Member from "./pages/Member";
import OutletKasir from "./pages/OutletKasir";
import OutletOwner from "./pages/OutletOwner";
import Print from "./pages/PDFTransaksi";
import TransaksiKasir from "./pages/TransaksiKasir";
import TransaksiOwner from "./pages/TransaksiOwner";
import PaketKasir from "./pages/PaketKasir";
import PaketOwner from "./pages/PaketOwner"
import Detil from "./pages/DetailTransaksi"
import Form from "./pages/FormTransaksi"
 
export default class App extends React.Component{
  render(){
    return(
  //     <div className="container d-flex h-100 justify-content-center align-items-center">
  //               <div className="col-sm-6 card my-5">
  //                   <div className="card-header bg-primary text-white text-center">
  //                       <h4>Computer Store</h4>
  //                       <strong className="text-warning">Admin Sign In</strong>
  //                   </div>
  //                   <div className="card-body">
  //                       { !this.state.logged ? 
  //                       (
  //                           <div className="alert alert-danger mt-1">
  //                               { this.state.message }
  //                           </div>
  //                       ) : null }
  //                       <form onSubmit={ev => this.Login(ev)}>
  //                           <input type="text" className="form-control mb-1" value={this.state.username}
  //                           onChange={ev => this.setState({username: ev.target.value})} />
  //                           <input type="password" className="form-control mb-1" value={this.state.password}
  //                           onChange={ev => this.setState({password: ev.target.value})}
  //                           autoComplete="false" />
 
  //                           <button className="btn btn-block btn-primary mb-1" type="submit">
  //                               Sign In
  //                           </button>
  //                       </form>
  //                   </div>
  //               </div>
  //           </div>
  //       )
  //   }
  // }
  
      <Routes>

        <Route path="/login" element={<Login/>} />

        {/* ADMIN */}
        <Route exact path="/" element={<Home/>} />
        <Route path="/paket" element={<Paket/>} />
        <Route path="/member" element={<Member/>} />
        <Route path="/petugas" element={<User/>} />
        <Route path="/outlet" element={<Outlet/>} />
        <Route path="/transaksi" element={<Transaksi/>} />
        <Route path="/print" element={<Print/>} />
        <Route path="/detil" element={<Detil/>} />
        {/* <Route path="/form" element={<Form/>} /> */}

        {/* KASIR */}
        <Route path="/dashboard" element={<HomeKasir/>} />
        <Route path="/datamember" element={<MemberKasir/>} />
        <Route path="/dataoutlet" element={<OutletKasir/>} />
        <Route path="/datatransaksi" element={<TransaksiKasir/>} />
        <Route path="/datapaket" element={<PaketKasir/>} />

        {/* OWNER */}
        <Route path="/dasbor" element={<HomeOwner/>} />
        <Route path="/mymember" element={<MemberOwner/>} />
        <Route path="/myoutlet" element={<OutletOwner/>} />
        <Route path="/mytransaksi" element={<TransaksiOwner/>} />
        <Route path="/mypaket" element={<PaketOwner/>} />
        
      </Routes>
    )
  }
}
