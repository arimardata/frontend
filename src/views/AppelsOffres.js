import React, { Component } from "react";
import Table from "../utils/table";
import PageTitle from "../components/common/PageTitle";
import fetchApi from "../utils/fetchApi";
import AoModal from "../utils/AoModal";
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
  CardBody,
  Modal,
  ModalBody,
  ModalHeader
} from "shards-react";
import { Store, Constants } from "../flux";
import lanesLayout from "../utils/lanesLayout";
import Board from "react-trello";

class AppelsOffres extends Component {
  constructor(props) {
    super(props);

    this.state = {
      aos: [],
      selectedUsers: [],
      data: { authority: "ROLE_USER" },
      info: "",
      open: false,
      clicked: {}
    };
    this.onChange = this.onChange.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onCardClick = this.onCardClick.bind(this);
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

  handleDragStart(cardId) {}

  async componentWillMount() {
    Store.addChangeListener(Constants.SELECTE_USER, this.onChange);
    const data = await fetchApi({
      method: "GET",

      url: "/api/projects/find",
      token: window.localStorage.getItem("token")
    });
    let aos = lanesLayout;
    data.map((ao, id) => {
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

  onCardClick(cardId, metadata, laneId) {
    console.log(laneId);
    let lane = this.state.baord.lanes.filter(elt => elt.id == laneId);
    let card = lane[0].cards.filter(elt => elt.id == cardId);
    console.log(card);
    let ao = this.state.aos.filter(ao => ao.num_AO == card[0].title);
    this.setState({
      open: !this.state.open,
      clicked: ao[0]
    });
    this.toggle();
  }
  toggle() {
    this.setState({
      open: !this.state.open
    });
  }
  render() {
    let baord;
    if (this.state.baord) {
      baord = (
        <Board
          data={this.state.baord}
          draggable
          style={{ backgroundColor: "#efefef" }}
          handleDragStart={this.handleDragStart}
          onCardClick={this.onCardClick}
        />
      );
    } else {
      baord = "loading";
    }
    const { open } = this.state;
    return (
      <Container fluid className="main-content-container px-4">
        <Card small className="mt-1">
          <CardBody className="p-0 pb-3">{baord}</CardBody>
        </Card>
        <Modal size="lg" open={open} toggle={this.toggle}>
          <ModalHeader>Header</ModalHeader>
          <ModalBody>
            <AoModal data={this.state.clicked} />
          </ModalBody>
        </Modal>
      </Container>
    );
  }
}

export default AppelsOffres;
