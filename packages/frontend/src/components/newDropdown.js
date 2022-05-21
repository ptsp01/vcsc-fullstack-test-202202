import React, { Component } from "react";
import { DropDownContent } from "./newDropdownContent.js";

export class DropDown extends Component {
  constructor() {
    super();
    this.state = {
      name: [
        {
          id: 0,
          title: "VCSC",
          selected: true,
          key: "name",
        },
        {
          id: 1,
          title: "VinaCapital",
          selected: false,
          key: "name",
        },
        {
          id: 2,
          title: "DragonCapital",
          selected: false,
          key: "name",
        },
        {
          id: 3,
          title: "SSI",
          selected: false,
          key: "name",
        },
        {
          id: 4,
          title: "Techcombank",
          selected: false,
          key: "name",
        },
      ],
    };
  }

  render() {
    return (
      <div>
        <DropDownContent title="Choose Company" list={this.state.name} />
      </div>
    );
  }
}
