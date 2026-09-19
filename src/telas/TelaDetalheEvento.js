import { StyleSheet, Text, View } from "react-native";

import { useEventos } from "../contextos/EventosContexto";

export default function TelaDetalheEvento({ route }) {
  const { id } = route.params;
  const { eventos, carregando } = useEventos();
  const evento = eventos.find((ev) => ev.id === id);

  if (!evento) {
    return (
      <View style={styles.container}>
        {carregando ? (
          <ActivityIndicator size="large" />
        ) : (
          <Text style={styles.texto}>
            Este evento não está mais disponível.
          </Text>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{evento.titulo}</Text>
      <Text style={styles.texto}>{evento.descricao}</Text>
      <Text style={styles.texto}>Vagas restantes: {evento.vagas}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 8 },
  titulo: { fontSize: 22, fontWeight: "bold" },
  texto: { fontSize: 16 },
});
