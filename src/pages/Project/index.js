import React, { Component } from "react";
import api from "../../services/api";

import "./styles.css";

export default class Project extends Component {
  state = {
    project: {},
    appointments: []
  };

  async componentDidMount() {
    const { id } = this.props.match.params;

    const response = await api.get(`/projects/${id}`);

    this.setState({
      project: response.data.project,
      appointments: response.data.appointments
    });
  }

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div className="project-info">
        <h1>{this.state.project.name}</h1>
        <p>{this.state.project.description}</p>

        <p>Total de horas: {this.state.project.total_hours}</p>
        <h2>Apontamentos</h2>
        <p>
          <ul>
            {this.state.appointments.map(ap => (
              <li>
                Horas: {ap.hours}(Usuário:{ap.user_id})
              </li>
            ))}
          </ul>
        </p>
        <button onClick={() => this.goBack()}>Voltar</button>
      </div>
    );
  }
}
