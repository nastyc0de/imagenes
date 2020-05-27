import React,{useState} from 'react';
import Error from './Error';

const Formulario = ({setSearch}) => {

  const [termino, setTermino] = useState('');
  const [error, setError] = useState(false);
  const searchImage = e =>{
    e.preventDefault();

    // validar
    if (termino.trim()==='') {
      setError(true);
    }
    setError(false);
    // enviar el termino de búsqueda hacia el componente principal

    setSearch(termino);

  }

  return(
          <form
            onSubmit={searchImage}
          >
            <div className="row">
              <div className="form-group col-md-8">
                <input type="text"
                       className="form-control form-control-lg"
                       placeholder="Busca una imagen"
                       onChange={e => setTermino(e.target.value)}
                />
              </div>
              <div className="form-group col-md-4">
                <button type="submit"
                        className="btn btn-info btn-lg btn-block">Buscar</button>
              </div>
            </div>
            {error ? <Error mensaje="Agrega un término de búsqueda"/>:null}
          </form>
        );
}
export default Formulario;
