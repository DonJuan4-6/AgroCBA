import { useState } from 'react';

import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

export default function App() {
  const [nombre, setNombre] = useState('');
  const [producto, setProducto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precioUnitario, setPrecioUnitario] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [pedido, setPedido] = useState('');
  const [totalPedidos, setTotalPedidos] = useState(0);
  const [valorAcumulado, setValorAcumulado] = useState(0);

  const confirmarPedido = () => {
    const cantidadIngresada = Number(cantidad);
    const precioNormalizado = precioUnitario.trim().replace(',', '.');
    const precioIngresado = Number(precioNormalizado);

    if (nombre.trim() === '' || producto.trim() === '' || cantidad.trim() === '' || precioUnitario.trim() === '') {
      setMensaje('Por favor, completa todos los campos');
      setPedido('');
    } else if (/\d/.test(nombre) || /\d/.test(producto)) {
      setMensaje('Ingresa solo texto, sin números, en los campos Nombre y Producto');
      setPedido('');
    } else if (!/^\d+$/.test(cantidad) || !Number.isSafeInteger(cantidadIngresada) || cantidadIngresada <= 0) {
      setMensaje('Ingresa una cantidad válida mayor que cero');
      setPedido('');
    } else if (!/^\d+(?:\.\d+)?$/.test(precioNormalizado) || !Number.isFinite(precioIngresado)) {
      setMensaje('Ingresa un precio unitario válido');
      setPedido('');
    } else {
      const total = cantidadIngresada * precioIngresado;

      if (!Number.isFinite(total)) {
        setMensaje('El valor total del pedido es demasiado grande');
        setPedido('');
        return;
      }

      const totalFormateado = total.toLocaleString('es-CO', {
        maximumFractionDigits: 2
      });

      setTotalPedidos((totalActual) => totalActual + 1);
      setValorAcumulado((valorActual) => valorActual + total);
      setMensaje('Pedido registrado correctamente');
      setPedido(
        `Nombre: ${nombre.trim()}\nProducto: ${producto.trim()}\nCantidad: ${cantidadIngresada}\nValor total: $${totalFormateado}`
      );
    }
  };

  const limpiarFormulario = () => {
    setNombre('');
    setProducto('');
    setCantidad('');
    setPrecioUnitario('');
    setMensaje('Limpiado correctamente');
    setPedido('');
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.titulo}>
        Bienvenido a AgroCBA
      </Text>

      <Text style={styles.subtitulo}>
        Registra tus productos en el formulario
      </Text>

      <Text style={styles.contador}>
        Pedidos registrados en esta sesión: {totalPedidos}
      </Text>

      <Text style={styles.contador}>
        Valor acumulado de los pedidos: $
        {valorAcumulado.toLocaleString('es-CO', { maximumFractionDigits: 2 })}
      </Text>

      <Text style={styles.etiqueta}>Nombre</Text>

      <TextInput
        style={styles.input}
        placeholder="Escribe tu nombre"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.etiqueta}>Producto</Text>

      <TextInput
        style={styles.input}
        placeholder="Escribe el nombre del producto"
        value={producto}
        onChangeText={setProducto}
      />

      <Text style={styles.etiqueta}>Cantidad</Text>

      <TextInput
        style={styles.input}
        placeholder="Escribe la cantidad de unidades del producto"
        keyboardType="numeric"
        value={cantidad}
        onChangeText={setCantidad}
      />

      <Text style={styles.etiqueta}>Precio unitario</Text>

      <TextInput
        style={styles.input}
        placeholder="Escribe el precio por unidad"
        keyboardType="decimal-pad"
        value={precioUnitario}
        onChangeText={setPrecioUnitario}
      />

      <Pressable
        style={styles.boton}
        onPress={confirmarPedido}
      >
        <Text style={styles.textoBoton}>
          Registrar pedido
        </Text>
      </Pressable>

      <Pressable
        style={styles.botonLimpiar}
        onPress={limpiarFormulario}
      >
        <Text style={styles.textoBoton}>
          Limpiar formulario
        </Text>
      </Pressable>

      <View style={styles.resultado}>
        <Text
          style={[
            styles.mensaje,
            mensaje.startsWith('Ingresa') || mensaje.startsWith('Por favor') || mensaje.startsWith('El valor')
              ? styles.mensajeError
              : null
          ]}
        >
          {mensaje}
        </Text>
        <Text style={styles.pedido}>
          {pedido}
        </Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: '#F2F4F8',
  },

  titulo: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#176b0c',
  },

  subtitulo: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 12,
  },

  contador: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#176b0c',
    marginBottom: 24,
  },

  etiqueta: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 7,
    color: '#127a13',
  },

  input: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    fontSize: 16,
  },

  boton: {
    backgroundColor: '#127a13',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },

  botonLimpiar: {
    backgroundColor: '#DC2626',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  textoBoton: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },

  resultado: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    minHeight: 60,
    justifyContent: 'center',
  },

  mensaje: {
    fontSize: 22,
    color: '#127a13',
    fontWeight: 'bold',
  },

  mensajeError: {
    color: '#DC2626',
  },

  pedido: {
    fontSize: 20,
    padding: 5,
  },
});