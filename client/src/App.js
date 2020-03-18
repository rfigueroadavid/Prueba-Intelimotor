import React from 'react';
import logo from './logo.svg';
import './App.css';
import ButtonAppBar from './components/navbar';
import { Container, Grid, Backdrop, CircularProgress } from '@material-ui/core';
import Form from './components/form.js';
import Axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      publishing: "no-publicando", //publicando error exito
      src: null,
    }
  }

  render() {
    const publicarAnuncio = (data) => {
      console.log("entra a publicar",data)
      let _this = this;
      this.setState({ publishing: "publicando" })
      let url = "http://localhost:8080/publicarAnuncio" 
      let body = {
        precio: data.precio,
        descripcion: data.descripcion,
        img: null
      }
      Axios.post(url, body)
        .then(function (response) {
          _this.setState({ publishing: "Anuncio Publicado", src: response.data.src })
        })
        .catch(function (error) {
          publicarAnuncio({precio:data.precio , descripcion:data.descripcion})
        });
    }

    return (
      <div className="App">
        <ButtonAppBar />
        {this.state.publishing != "publicando" ?

          <Grid container style={{ paddingTop: "50px", paddingLeft: "10px", paddingRight: "10px" }}>
            <Grid item xs={12} sm={6} >
              <h4 style={{ textAlign: "left", marginLeft: "25px" }}>
                Formulario
      </h4>
              <Form publicarAnuncio={publicarAnuncio} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <h4 style={{ textAlign: "left", marginLeft: "25px" }}>
                {!this.state.src ? "Anuncio sin publicar" :
                  "Anuncio publicado correctamente"
                }
              </h4>

              {!this.state.src ?
                <p>
                  Aqui se mostrará tu anuncio publicado
                 </p>
                : 
                <img width="100%" src={this.state.src}></img>
              }
            </Grid>
          </Grid>
          :
          <Backdrop open={this.state.publishing == "publicando" ? true : false} onClick={() => { }}>
            <Grid container>
              <Grid item xs={12}>
                <h4 style={{ color: "#ffff" }}>
                  Publicando Anuncio
                          </h4>
              </Grid>
              <Grid item xs={12}>
                <CircularProgress color="inherit" />
              </Grid>
            </Grid>
          </Backdrop>

        }
      </div>
    );
  }

}

export default App;
