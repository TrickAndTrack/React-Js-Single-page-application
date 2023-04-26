import { AiOutlineCloseSquare } from "react-icons/ai";


const Popup = ({ setIsOpenPopup }, props) => {
    console.log(props);
    

  return (
    <div
      onClick={setIsOpenPopup.bind(this, false)}
      style={{
        position: "fixed",
        background: "rgb(2 255 255 / 0%);",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {/* Content */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          background: "#6c5d5d",
          borderRadius: "8px",
          width: "600px",
          padding: "20px 10px",
          animation: "dropTop .3s linear"
        }}
      >
        {/* Header */}
        <div
          style={{ borderBottom: "1px solid lightgray", paddingBottom: "10px" }}
        >
          <h1 style={{ margin: 0 }}>Profile information</h1>
          <div
            onClick={setIsOpenPopup.bind(this, false)}
            style={{
              cursor: "pointer",
              position: "absolute",
              top: 10,
              right: 10
            }}
          >
            <AiOutlineCloseSquare />
          </div>
        </div>
        {/* Body */}
        <div>
   
          <p>    email  {props.email} </p>
          <p>    firstname {props.firstname}  </p>
          <p>    lastname {props.lastname}  </p>
          <p>    address  {props.addressLineOne}{props.addressLineTwo}{props.pincode} </p>
          <p>    dob  {props.dob} </p>
          <p>    phonenumber{props.phonenumber}   </p>
          <p>    pwd  {props.pwd} </p>

        </div>
        {/* Footer */}
        <footer
          style={{ borderTop: "1px solid lightgray", paddingTop: "10px" }}
        >
          Footer here
        </footer>
      </div>
    </div>
  );
};
export default Popup;
