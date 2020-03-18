

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {  TextField, Grid, Icon } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});
class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            precio: "",
            descripcion: "",
            publishing: "sin-publicar",
        }
    }


    render() {

 
        return (
                <Card >
                    <CardContent>
                        <Grid container>

                            <Grid item xs={12}>
                                <TextField
                                    value={this.state.precio}
                                    onChange={(e) => { this.setState({ precio: e.target.value }) }}
                                    fullWidth type="number" id="precio" label="Precio" />
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    placeholder="Coloca aqui la descripción de tu anuncion"
                                    multiline
                                    value={this.state.descripcion}
                                    rows={2}
                                    rowsMax={4}
                                    onChange={(e) => { this.setState({ descripcion: e.target.value }) }}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Button
                            variant="contained"
                            color="primary"
                            endIcon={<Icon>send</Icon>}
                            onClick={() => {
                                this.props.publicarAnuncio({precio:this.state.precio, descripcion: this.state.descripcion});
                            }}
                            disabled={ this.state.precio!==0 && this.state.descripcion!=='' ? false : true }
                        >
                            Publicar tu auto
      </Button>
                    </CardActions>
                </Card>

                
               
        );
    }




}




export default Form