<ul>
    <!-- Recibe parametro $titulo-->
    <h1>{{$titulo}}</h1>

    <!-- bucle (con arroba delante) para recorrer el array .
        Recibe parámetro animales-->

    @foreach($animales as $animal)
     <li>{{$animal}}</li>       <!--Imprime un elemnto del array: usar dobles llaves -->
    @endforeach
</ul>