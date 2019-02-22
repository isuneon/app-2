# Pasos para clonar repositorio
  - Desde la terminal ingresar a la ubicación en la cual queremos clonar el proyecto
    ```sh
    cd C:\Users\XXXX\Documents\miproyecto
    ````
  - Clonar repositorio
       ```sh
       git clone https://billyrogers@bitbucket.org/billyrogers/app-2.git
       ````
  - Ejecutar el comando para instalar todos los paquetes y dependencias
    ```sh
    $ npm install
    ```
# Pasos para generar apk
- Remover la plataforma para asegurarnos que tenga los ultimos cambios (se debe realizar
    cada vez que se vaya a compilar una versión nueva)
    ```sh
    ionic cordova platform rm {android / ios}
    ionic cordova platform rm android
    ```
- Agregar el plugin para obtener informacion de nuestro dispositivo
    ```sh
    ionic cordova plugin add cordova-plugin-uid
    ```
    
- Agregar el plugin para obtener las coordenadas en segundo plano
    ```sh
    ionic cordova plugin add cordova-plugin-mauron85-background-geolocation@alphacordova-plugin-mauron85-background-geolocation@alpha
    ```
- Agregar el plugin para darle permisos al dispositivo y poder obtener el IMEI
    ```sh
    ionic cordova plugin add cordova-plugin-android-permissions
    ```
- Agregar la plataforma 
    ```sh
    ionic cordova platform add {android / ios}
    ionic cordova platform add android
    ```
- Crear APK  
    ```sh
    ionic cordova build {android / ios}
    ionic cordova build android
    ```