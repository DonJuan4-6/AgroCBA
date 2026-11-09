import { useState } from 'react';

import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

export default function App() {

  const [nombre, setNombre] = useState('');
  const [producto, setProducto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [mensaje, setMensaje] = useState('');

  const mostrarInformacion = () => {

    if (nombre.trim() === '' || producto.trim() === '' || cantidad.trim() === '') {
      setMensaje('Por favor, completa todos los campos');
    } else {
      setMensaje(`Hola ${nombre}, registraste:
Producto: ${producto}
Cantidad: ${cantidad}
        `);
    }

  };

  const limpiarFormulario = () => {
    setNombre('');
    setProducto('');
    setCantidad('');
    setMensaje('Limpiado correctamente');
  };

  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        Bienvenido a AgroCBA
      </Text>

      <Text style={styles.subtitulo}>
        Registra tus productos en el formulario ⬇️
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
        placeholder="Escribe la cantidad del producto"
        keyboardType="numeric"
        value={cantidad}
        onChangeText={setCantidad}
      />

      <Pressable
        style={styles.boton}
        onPress={mostrarInformacion}
      >
        <Text style={styles.textoBoton}>
          Mostrar Producto
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
        <Text style={styles.mensaje}>
          {mensaje}
        </Text>
      </View>


    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: '#F2F4F8',
  },

  titulo: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0f3f8b',
  },

  subtitulo: {
    fontSize: 15,
    textAlign: 'center',
    color: '#64748B',
    marginBottom: 30,
  },

  etiqueta: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 7,
    color: '#334155',
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
    backgroundColor: '#2563EB',
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
    fontSize: 16,
    textAlign: 'center',
    color: '#1E293B',
  },

});