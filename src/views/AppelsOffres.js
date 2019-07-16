import React, { Component } from "react";
import Table from "../utils/table";
import PageTitle from "../components/common/PageTitle";
import fetchApi from "../utils/fetchApi";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  FormInput,
  Button,
  Container,
  Card,
  CardHeader,
  InputGroup,
  Alert,
  ButtonGroup,
  CardBody
} from "shards-react";
import { Store, Constants } from "../flux";
import Board from "react-trello";

class AppelsOffres extends Component {
  constructor(props) {
    super(props);

    this.state = {
      aos: [],
      board: [],
      selectedUsers: [],
      data: { authority: "ROLE_USER" },
      info: ""
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillUnmount() {
    Store.removeChangeListener(Constants.SELECTE_USER, this.onChange);
  }

  onChange() {
    this.setState({
      ...this.state,
      selectedUsers: Store.getSelectedUsers()
    });
  }

  async componentWillMount() {
    Store.addChangeListener(Constants.SELECTE_USER, this.onChange);
    const data = await fetchApi({
      method: "GET",

      url: "/api/projects/find",
      token: window.localStorage.getItem("token")
    });
    let aos = {
      lanes: [
        {
          id: "lane1",
          title: "Step 1",
          label: "",
          cards: []
        },
        {
          id: "lane2",
          title: "Step 2",
          label: "",
          cards: []
        },
        {
          id: "lane3",
          title: "Step 3",
          label: "",
          cards: []
        },
        {
          id: "lane4",
          title: "Step 4",
          label: "",
          cards: []
        }
      ]
    };
    data.map((ao, id) => {
      console.log(ao);
      aos.lanes[0].cards.push({
        id: "Card" + id,
        title: ao.num_AO,
        description: ao.chef_ouvrage,
        label: ao.ville,
        draggable: false
      });
    });

    this.setState({
      aos: data,
      baord: aos
    });
  }
  render() {
    let baord;
    if (this.state.baord) {
      baord = <Board data={this.state.baord} draggable />;
    } else {
      baord = "loading";
    }
    return (
      <Container fluid className="main-content-container px-4">
        <Card style={{ height: 33 }} small className="  mt-1">
          {this.state.selectedUsers.length > 0 && (
            <ButtonGroup>
              <Button outline theme="primary">
                <i class="material-icons">settings</i>
              </Button>
              <Button outline theme="danger">
                <i class="material-icons">delete</i>
              </Button>
              <Button outline theme="black">
                <i class="material-icons">done</i>
              </Button>
            </ButtonGroup>
          )}
        </Card>
        <Card small className="mt-1">
          <CardBody className="p-0 pb-3">
            {/* <Table
              table={this.state.aos}
              selected={this.state.selectedUsers}
              actionOne={Constants.SELECT_USER}
              actionMany={Constants.SELECT_ALL_USERS}
            /> */}
            {baord}
          </CardBody>
        </Card>
      </Container>
    );
  }
}

export default AppelsOffres;
