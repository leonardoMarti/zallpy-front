import React, { Component } from "react";
import api from "../../services/api";

import "./styles.css";

export default class Appointment extends Component {
  state = {
    projects: [],
    users: [],
    appointment: {
      user_id: 1,
      project_id: 1,
      hours: null,
      date: new Date()
    }
  };

  async componentDidMount() {
    const projects = await api.get(`/projects`);
    const users = await api.get(`/users`);

    this.setState({ projects: projects.data.projects, users: users.data });
  }

  save = async () => {
    const response = await api.post(`/appointments`, this.state.appointment);
    this.props.history.goBack();
  };

  handleChangeProject = event => {
    const value = event.target.value;

    this.setState(state => ({
      appointment: {
        ...state.appointment,
        project_id: value
      }
    }));
  };

  handleChangeAppointment = event => {
    const value = event.target.value;

    this.setState(state => ({
      appointment: {
        ...state.appointment,
        hours: value
      }
    }));
  };

  handleChangeUser = event => {
    const value = event.target.value;

    this.setState(state => ({
      appointment: {
        ...state.appointment,
        user_id: value
      }
    }));
  };

  render() {
    return (
      <div className="project-info">
        <h1>Apontamento</h1>
        <p>
          <label>Projeto: </label>
          <select onChange={this.handleChangeProject}>
            {this.state.projects.map(project => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </p>
        <p>
          <label>Usuário: </label>
          <select onChange={this.handleChangeUser}>
            {this.state.users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </p>
        <p>
          <label>Horas: </label>
          <input onChange={this.handleChangeAppointment} type="number" />
        </p>

        <button onClick={() => this.save()}>Apontar</button>
      </div>
    );
  }
}
