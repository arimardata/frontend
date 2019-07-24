import MUIDataTable from "mui-datatables";
import React, { Component } from "react"
import fetchApi from "../utils/fetchApi";
import CustomToolbar from "./CustomToolbar";

class Cheque extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cheques: [],
      selectedUsers: [],
      data: { authority: "ROLE_USER" },
      info: "",
      open: false,
      clicked: {}
    };

  }

  async componentWillMount() {
    const data = await fetchApi({
      method: "GET",
      url: "/api/Cheques/find",
      token: window.localStorage.getItem("token")
    });
    let donnee = [];
    data.map(elmnt => donnee.push([elmnt.id,
    elmnt.createdAt,
    elmnt.updatedAt,
    elmnt.date,
    elmnt.emetteur,
    elmnt.recepteur,
    elmnt.banque,
    elmnt.alerte,
    elmnt.somme,
    elmnt.etat]))

    this.setState({ donnee: donnee })
    console.log(data)
  }

  render() {
    const columns = ["id", "Updated at", "Updated at", "date", "Emetteur", "Recepteur", "Banque", "Alerte", "Somme", "etat"];

    /*const data = [
     ["Joe James", "Test Corp", "Yonkers", "NY"],
     ["John Walsh", "Test Corp", "Hartford", "CT"],
     ["Bob Herm", "Test Corp", "Tampa", "FL"],
     ["James Houston", "Test Corp", "Dallas", "TX"],
    ];*/

    const options = {
      filterType: 'checkbox',
      customToolbar: () => {
        return (
          <CustomToolbar />
        );
      }
    };

    return <div>
      <MUIDataTable
        title={"Employee List"}
        data={this.state.donnee}
        columns={columns}
        options={options}
      />




    </div>


  }


}




export default Cheque;