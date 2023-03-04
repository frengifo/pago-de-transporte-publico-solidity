# Sistema de pago de transporte público en blockchain

Este proyecto es un sistema de pago de transporte público que utiliza la tecnología blockchain para garantizar transacciones seguras y eficientes. Está desarrollado sobre la blockchain Polygon (anteriormente conocida como Matic Network) y utiliza la criptomoneda MATIC como medio de pago.

## Funcionalidades

    Compra de tickets de transporte mediante la criptomoneda MATIC.
    Verificación de tickets en las estaciones de autobús a través de la lectura de códigos QR.
    Devolución del saldo sobrante en la billetera del usuario.
    
    El usuario accede a la Dapp y se conecta a su billetera Metamask.
    El usuario selecciona el tipo de ticket que desea comprar y el sistema le muestra el precio correspondiente en METROTKN.
    El usuario confirma la compra y la Dapp solicita la transferencia de METROTKN de su billetera a la cuenta de la Dapp. 
    La Dapp verifica que la transferencia sea exitosa y actualiza el balance del usuario.
    El usuario recibe un ticket electrónico que se puede escanear en el transporte público.
    Cuando el usuario utiliza el ticket para el transporte público, el conductor escanea el código QR del ticket y verifica que esté vigente.
    Si el ticket es válido, el usuario puede acceder al transporte público y se le descuenta el valor del ticket de su balance.
    Si el ticket no es válido, el usuario no puede acceder al transporte público y se le solicita que compre un nuevo ticket.
    El usuario puede recargar su balance de METROTKN en cualquier momento a través de la Dapp.

## Tecnologías utilizadas

    Solidity: lenguaje de programación utilizado para desarrollar los contratos inteligentes en la blockchain.
    Hardhat: herramienta para desarrollar, compilar y probar contratos inteligentes.
    Node.js: entorno de tiempo de ejecución para JavaScript utilizado para desarrollar la aplicación web del sistema de pago.
    React: librería de JavaScript utilizada para desarrollar la interfaz de usuario del sistema de pago.
    Web3.js: biblioteca de JavaScript utilizada para interactuar con la blockchain desde la aplicación web.

## Instalación y configuración

Para instalar y ejecutar el proyecto, sigue los siguientes pasos:

Clona el repositorio en tu ordenador:

bash

  git clone https://github.com/tu-usuario/sistema-pago-transporte-publico.git

## Instala las dependencias de Node.js:

bash

  cd sistema-pago-transporte-publico
  
  npm install

Configura tus credenciales de la blockchain Polygon en el archivo .env (debes tener una cuenta con saldo de MATIC para realizar transacciones):

  makefile

  RPC_URL=https://rpc-mainnet.matic.network
  PRIVATE_KEY=tu-clave-privada

## Ejecuta el servidor local:

  npm run dev

Abre tu navegador y accede a http://localhost:3000 para utilizar el sistema de pago.

