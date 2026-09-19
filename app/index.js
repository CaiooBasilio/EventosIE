import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { AppProvedor } from "../src/contextos/AppContexto";
import { EventosProvedor } from "../src/contextos/EventosContexto";
import TelaDetalheEvento from "../src/telas/TelaDetalheEvento";
import TelaEventos from "../src/telas/TelaEventos";
import TelaMinhasInscricoes from "../src/telas/TelaMinhasInscricoes";

const Abas = createBottomTabNavigator();

export default function Page() {
  return (
    <AppProvedor>
      <EventosProvedor>
        <NavigationContainer>
          <Abas.Navigator>
            <Abas.Screen name="Eventos" component={TelaEventos} />
            <Abas.Screen name="Detalhe" component={TelaDetalheEvento} />
            <Abas.Screen name="Inscricoes" component={TelaMinhasInscricoes} />
          </Abas.Navigator>
        </NavigationContainer>
      </EventosProvedor>
    </AppProvedor>
  );
}
