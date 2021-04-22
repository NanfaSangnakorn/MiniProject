import Link from 'next/link'
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Form } from 'react-bootstrap'
import { MDBBtn } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";



const NavBar = () => {
  return (
      
    
      <nav class="navbar navbar-expand-md  fixed-top navbar-success bg-success mb-4">
        <div className="container">
          <img
            src="https://png.pngtree.com/png-vector/20190801/ourlarge/pngtree-vector-soil-plant-icon-png-image_1638737.jpg"
            width="20%"
            height="20%"
            class="d-inline-block align-left"
          />
          <a className="navbar-brand" href="/">
            Plant
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link href="/">
                  <a className="nav-link">
                    ลงชื่อเข้าใช้
                    <span className="sr-only">(current)</span>
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/register">
                  <a className="nav-link" href="#">
                    ลงทะเบียน
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/profile">
                  <a className="nav-link">Profile</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/test">
                  <a className="nav-link">ข้อมูลพืช</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/admin">
                  <a className="nav-link">การจัดการข้อมูลพืช</a>
                </Link>
              </li>

              <li className="nav-item red-text font-weight-bold">
                <Link href="/about">
                  <a className="nav-link">เกี่ยวกับ</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/logout">
                  <MDBBtn rounded color="danger" align="right">
                    logout
                  </MDBBtn>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav> 
    );
}

export default NavBar;










/**import Link from "next/link";

const Navbar = () => (
  <div>
    <Link href="/">
      <a> Home </a>
    </Link>
    |
    <Link href="/register">
      <a> Register </a>
    </Link>
    |
    <Link href="/login">
      <a> Login </a>
    </Link>
    |
    <Link href="/profile">
      <a> Profile </a>
    </Link>
    |
    <Link href="/foo">
      <a> Foo </a>
    </Link>
    |
    <Link href="/Plant">
      <a> Plant </a>
    </Link>
    <Link href="/photo">
      <a> Photo </a>
    </Link>
    |
    <Link href="/admin">
      <a> Admin </a>
    </Link>
    |
    <Link href="/getConfig">
      <a> Config </a>
    </Link>
    |
    <Link href="/logout">
      <a> Logout </a>
    </Link>
  </div>
);

export default Navbar; */
