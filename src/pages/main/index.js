import React, { Component } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

import "./styles.css";

export default class Main extends Component {
  state = {
    projects: [],
    projectInfo: {},
    page: 0
  };

  componentDidMount() {
    this.loadProjects(0);
  }

  loadProjects = async page => {
    const response = await api.get(`/projects?page=${page}`); // diferente, broke

    const { projects } = response.data;

    this.setState({ projects, page }); // diferente
  };

  prevPage = () => {
    const { page } = this.state;

    if (page === 0) return;

    const pageNumber = page - 1;

    this.loadProjects(pageNumber);
  };

  nextPage = () => {
    const { page, projectInfo } = this.state;

    if (page === projectInfo.pages) return;

    const pageNumber = page + 1;

    this.loadProjects(pageNumber);
  };

  //diferente.
  render() {
    const { projects, page, projectInfo } = this.state;

    return (
      <div className="project-list">
        <Link to={`/appointment`}>
          {" "}
          <button onClick={this.prevPage}>Adicionar apontamento</button>
        </Link>

        {projects.map(project => (
          <article key={project.id}>
            <strong>
              {project.name} (Total de horas: {project.total_hours})
            </strong>
            <p>{project.description}</p>

            <Link to={`/project/${project.id}`}>Acessar</Link>
          </article>
        ))}

        <div className="actions">
          <button
            disable={page === 0 ? "true" : "false"}
            onClick={this.prevPage}
          >
            Anterior
          </button>
          <button
            disable={page === projectInfo.pages ? "true" : "false"}
            onClick={this.nextPage}
          >
            Próximo
          </button>
        </div>
      </div>
    );
  }
}
