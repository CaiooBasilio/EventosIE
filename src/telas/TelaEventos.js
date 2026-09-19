import { useContext, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import CartaoEvento from "../componentes/CartaoEvento";
import { AppContexto } from "../contextos/AppContexto";
import { useEventos } from "../contextos/EventosContexto";

export default function TelaEventos({ navigation }) {
  const { temaEscuro } = useContext(AppContexto);

  const { eventos, carregando, erro, carregarEventos } = useEventos();

  const [enviado, setEnviado] = useState(false);

  const [eventoSelecionadoId, setEventoSelecionadoId] = useState(null);

  const [busca, setBusca] = useState("");

  const [inscricoesIds, setInscricoesIds] = useState([]);

  const eventosFiltrados = eventos.filter((ev) =>
    ev.titulo.toLowerCase().includes(busca.toLowerCase()),
  );
  const totalInscricoes = inscricoesIds.length;
  const eventoSelecionado = eventos.find((ev) => ev.id === eventoSelecionadoId);

  function inscrever(id) {
    if (inscricoesIds.includes(id)) return;
    setInscricoesIds((listaAtual) =>
      listaAtual.includes(id) ? listaAtual : [...listaAtual, id],
    );

    setEventoSelecionadoId(id);
    setEnviado(true);
  }

  console.log("[render] TelaEventos");

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: temaEscuro ? "#121212" : "#FFFFFF" },
      ]}
    >
      <Text style={styles.contador}>Inscrições: {totalInscricoes}</Text>
      <TextInput
        style={styles.campo}
        value={busca}
        onChangeText={setBusca}
        placeholder="Buscar evento"
      />
      {carregando && eventos.length === 0 && <ActivityIndicator size="large" />}
      {erro && <Text style={styles.erro}>Falha: {erro}</Text>}
      {enviado && eventoSelecionado && (
        <Text style={styles.aviso}>
          Inscrição confirmada em {eventoSelecionado.titulo}
        </Text>
      )}
      <FlatList
        data={eventosFiltrados}
        keyExtractor={(itemLista) => String(itemLista.id)}
        refreshing={carregando}
        onRefresh={carregarEventos}
        renderItem={({ item }) => (
          <CartaoEvento
            evento={item}
            aoInscrever={() => inscrever(item.id)} // só o id
            aoAbrir={() => navigation.navigate("Detalhe", { id: item.id })} // só o id
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  contador: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  campo: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  erro: { color: "#B00020", marginBottom: 8 },
  aviso: { color: "#2E7D32", marginBottom: 8 },
});
