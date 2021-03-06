import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  CardBody,
  Modal,
  ModalBody,
  ModalHeader,
  Button,
  CardHeader,
  FormCheckbox
} from "shards-react";
import { Dispatcher, Constants } from "../flux";
import UpdateComponent from "./updateComponent";
// get table as json and return component filled table

export default class Table extends Component {
  constructor(props) {
    super(props);

    this.fillTable = this.fillTable.bind(this);
    this.getTableHeader = this.getTableHeader.bind(this);

    this.selectAll = this.selectAll.bind(this);
  }

  selectAll() {
    if (this.props.table.length != this.props.selected.length)
      Dispatcher.dispatch({
        actionType: this.props.actionMany,
        payload: [...this.props.table]
      });
    else
      Dispatcher.dispatch({
        actionType: this.props.actionMany,
        payload: []
      });
  }

  fillTable(table) {
    const selectedLength = this.props.selected.length;
    const tableLength = this.props.table.length;
    let headerElements = this.getTableHeader(table);
    return (
      <table className="table mb-0">
        <thead className="bg-light">
          <tr>
            {headerElements.map(element => (
              <th scope="col" className="border-0">
                {element}
              </th>
            ))}

            <th scope="col" className="border-0">
              <Button
                onClick={this.selectAll}
                outline={!(selectedLength == tableLength)}
                size="sm"
                theme="success"
                className="mt-0 mb-0 mr-0"
              >
                <i class="material-icons">done</i>
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {table.map((element, idx) => {
            return (
              <>
                <tr key={idx}>
                  {headerElements.map((headerElement, idx) => {
                    return <td className="rt-td ">{element[headerElement]}</td>;
                  })}

                  <td>
                    <Button
                      onClick={() => {
                        Dispatcher.dispatch({
                          actionType: this.props.actionOne,
                          payload: element
                        });
                      }}
                      outline={
                        this.props.selected.findIndex(
                          x => x.id === element.id
                        ) == -1
                      }
                      size="sm"
                      theme="success"
                    >
                      <i class="material-icons">done</i>
                    </Button>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    );
  }
  getTableHeader(table) {
    // all table elements has the same archetechture, we return the first element's archetechture :
    try {
      return Object.keys(table[0]);
    } catch (Error) {
      return [];
    }
  }

  render() {
    // const { open } = this.state;

    return <>{this.fillTable(this.props.table)}</>;
  }
}
