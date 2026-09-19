import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

const EventosContexto = createContext(null);

export function EventosProvedor({ children }) {
  const [eventos, setEventos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const carregarEventos = useCallback(() => {
    setCarregando(true);
    setErro(null);
    return fetch("https://api.campus.iftm.edu.br/eventos")
      .then((resposta) => resposta.json())
      .then((dados) => setEventos(dados))
      .catch((e) => setErro(e.message))
      .finally(() => setCarregando(false));
  }, []);

  useEffect(() => {
    carregarEventos();
  }, [carregarEventos]);

  const valor = useMemo(
    () => ({ eventos, carregando, erro, carregarEventos }),
    [eventos, carregando, erro, carregarEventos],
  );

  return (
    <EventosContexto.Provider value={valor}>
      {children}
    </EventosContexto.Provider>
  );
}

export function useEventos() {
  const contexto = useContext(EventosContexto);
  if (contexto === null) {
    throw new Error("useEventos precisa estar dentro de EventosProvedor");
  }
  return contexto;
}
