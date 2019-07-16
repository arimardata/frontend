import React from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormSelect
} from "shards-react";

const Select = props => (
  <div>
    <InputGroup className="mb-3">
      <FormSelect>
        {props.values.map(element => (
          <option>{element}</option>
        ))}
      </FormSelect>
    </InputGroup>
  </div>
);

export default Select;
