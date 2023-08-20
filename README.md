#crudApi

// BOILERPLATE PAGINAÇÃO
/** O ARRAY A SER PAGINADO */
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
/** QUANTIDADE DE ITEMS POR PAGINA */
const itemsPorPagina = 3;
/** PAGINA QUE QUERO RETORNAR */
const pagina = 1;


const indiceInicial = (pagina - 1) * itemsPorPagina;
const indiceFinal = pagina * itemsPorPagina - 1;

/** LISTA SOMENTE COM OS ITEMS DAQUELA PAGINA */
const arrayPaginado = array.slice(indiceInicial, indiceFinal + 1);