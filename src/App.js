import React,{useState,useEffect} from 'react';
import Formulario from './components/Formulario.js';
import Listado from './components/Listimage';
function App() {

  // states de la aplicación
  const [search, setSearch] = useState('');
  const [images, setImage] = useState([]);
  const [page, setPage] = useState(1);
  const [totalpages, setTotalpages] = useState(1);

  
  useEffect(() => {
    const consAPI = async () =>{
      if (search === '') return null;
      const imagebyPage = 30;
      const key = '16697549-45979cf26561fd64b9d34edbe';
      const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${imagebyPage}&page=${page}`;
      const resp = await fetch(url);
      const resultado = await resp.json();

      setImage(resultado.hits);
      // calcular el total de las paginas

      const calcTotalPages = Math.ceil(resultado.totalHits / imagebyPage);
      setTotalpages(calcTotalPages);

      // Mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior:'auto'})

    }
    consAPI();

  }, [search,page]);
  // definir la pagina anterior
  const backPage = () => {
    const newsetPage = page - 1;
    if (newsetPage === 0) return;
    setPage(newsetPage);
  }
  // definir la pagina siguiente
  const nextPage = () => {
    const newsetPage = page + 1;
    if(newsetPage > totalpages) return;
    setPage(newsetPage);
  }

  return (
      <div className="container">
        <div className="jumbotron">
            <h1 className="lead text-center">Buscador de imagenes</h1>
            <hr/>
            <Formulario
              setSearch={setSearch}
            />
        </div>
        <div className="row justify-content-center">
            <Listado
              images={images}
            />
          {(page === 1) ? null :(
              <button
              type="button"
              className="btn btn-info mr-1"
              onClick={backPage}
            >Anterior &laquo;</button>
          )}
            
          {(page === totalpages) ? null :(
            <button
            type="button"
            className="btn btn-info"
            onClick={nextPage}
          >Siguiente &raquo;</button>
          )}
            
        </div>
      </div>
  );
}

export default App;
