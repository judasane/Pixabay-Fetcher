import React, {Component} from 'react';
import './App.css';

import Buscador from './components/Buscador'
import Resultado from './components/Resultado'
class App extends Component {
  
  constructor(){
    super();
    this.state={
      termino:'',
      imagenes: [],
      pagina: ''
    }

  }
  
  scroll =()=>{
    const elemento= document.querySelector('.jumbotron');
    elemento.scrollIntoView({block: "start", behavior: "smooth"});
  }

  paginaAnterior = ()=>{   
    console.log("paginaAnterior");
    let pagina= this.state.pagina;
    if(pagina>1){
      pagina-=1;
      this.setState({pagina}, 
        ()=>{
          this.consultarApi();
          this.scroll();
        });
    }
    
  }
  paginaSiguiente = () => {
    console.log("paginaSiguiente");
    let pagina= this.state.pagina;
    pagina++;
    this.setState({pagina},
      ()=>{this.consultarApi()
        this.scroll();
      });
  }

  consultarApi = ()=>{
    const pagina= this.state.pagina;
    const termino= this.state.termino;
    const url= `https://pixabay.com/api/?key=1680832-74d43234194527aae929c2be5&q=${termino}&per_page=30&page=${pagina}`;
    
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(resultado => this.setState({imagenes:resultado.hits}));
  }

  datosBusqueda = (termino) =>{
    this.setState({
      termino,
      pagina:1
    },()=>{
      this.consultarApi();
    })
  }
  

  render(){
    return (
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">
            Buscador de Imágenes
          </p>
          <Buscador 
          datosBusqueda={this.datosBusqueda}
          />
  
          <div className="row justify-content-center">
            <Resultado 
            imagenes={this.state.imagenes} 
            paginaAnterior={this.paginaAnterior}
            paginaSiguiente={this.paginaSiguiente}
            />
          </div>
          
        </div>
      </div>
    );
  }
}

export default App;
