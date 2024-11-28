// MathLibrary.cpp : Defines the exported functions for the DLL.
#include "pch.h" // use stdafx.h in Visual Studio 2017 and earlier
#include <utility>
#include <stdio.h>
#include <vector>
#include <iostream>
#include <cmath>
#include <tuple>
#include <string>
#include <queue>
#include <climits>
#include <algorithm>
#include <cmath>
#include <math.h>
#include "AlgoritmosLibrary.h"


using namespace std;


//Nodo con ciudad y su distancia
struct Nodo {
    int IDciudad; //Es el indice de la ciudad en la matriz 
    double distancia; //Es la distacncia acumulada desde el nodo inicial

    /*Se modifica el comportamiento del operador '>' ,para que la
    priority_queue ordene de MENOR A MAYOR comparando
    solo las distancias de 2 nodos*/
    bool operator>(const Nodo& nodoAcomparar) const {
        return distancia > nodoAcomparar.distancia;
    }
};

const double RAD_TIERRA = 6371.0;
const double PI = 3.131592;

double convertRadianes(double grados) {
    return grados * PI / 180.0;
}

 double haversine(double lat1, double lon1, double lat2, double lon2) {
    double difLat = convertRadianes(lat2 - lat1);
    double difLon = convertRadianes(lon2 - lon1);

    double senoLat = sin(difLat / 2);
    double senoLon = sin(difLon / 2);

    double a = senoLat * senoLat + cos(convertRadianes(lat1)) * cos(convertRadianes(lat2)) * senoLon * senoLon;

    double c = 2 * atan2(sqrt(a), sqrt(1 - a));
    return RAD_TIERRA * c;
}

 vector<vector<double>> calcularDistancias(const vector<tuple<string, double, double>>& ciudades) {
    int totalCiudades = ciudades.size();
    vector<vector<double>> matrizAdyacencia(totalCiudades, vector<double>(totalCiudades, 0.0));

    int i = 0, j = 1; // Comenzamos con el primer par válido (0, 1)
    while (i < totalCiudades - 1) {
        auto [nombre1, lat1, lon1] = ciudades[i];
        auto [nombre2, lat2, lon2] = ciudades[j];

        // Calcula la distancia usando la fórmula de Haversine
        double distancia = haversine(lat1, lon1, lat2, lon2);

        // Asigna la distancia en ambas direcciones (simetría)
        matrizAdyacencia[i][j] = distancia;
        matrizAdyacencia[j][i] = distancia;

        // Avanza al siguiente par
        ++j;
        if (j == totalCiudades) { // Si hemos recorrido todos los valores de j
            ++i;                  // Avanza a la siguiente fila
            j = i + 1;            // Reinicia j para que siempre sea mayor que i
        }
    }

    return matrizAdyacencia;
}


 vector<int> Prim(const vector<vector<double>>& matriz) {
    int n = matriz.size();
    vector<bool> visitado(n, false); // Marca si un nodo fue visitado e inicia todo en false
    vector<double> dist(n, UINT_MAX); //Se inicializa todas las posiciones con el max valor de Unsigned Int
    vector<int> previo(n, -1); // Nodo previo(el -1 indica que ningun nodo tiene previo asignado) 
    vector<int> ruta;
    /* Priority_queue(estructura de datos):
     (Tipo de dato/Contenedor para almacenar datos/Como sera la relacion de orden)*/
    priority_queue<Nodo, vector<Nodo>, greater<Nodo>> cola;

    cola.push({ 0, 0.0 }); // Empezamos con el nodo 0, con distancia 0
    dist[0] = 0.0;  //La distancia del nodo 0 es 0

    while (!cola.empty()) { //Mientras la cola no este vacia
        Nodo actualNodo = cola.top(); // Extraemos el nodo con la menor distancia 
        cola.pop();  //Lo eliminamos para no volver a procesarlo
        int actual = actualNodo.IDciudad;
        if (visitado[actual]) continue;  // Si ya lo hemos visitado, lo ignoramos

        visitado[actual] = true;    // Marca el nodo como visitado
        ruta.push_back(actual);     //Lo agregamos ala ruta

        /*Actualiza las distancias de los nodos vecinos
        Se van insertando a la cola de prioridad los nodos que no han sido visitados,
        Y al ser cola de prioridad quedara siempre primero (como nodo raiz) el nodo mas cercano*/
        for (int i = 0; i < n; ++i) {
            /*Si el nodo i no ha sido visitado y la distancia desde el nodo actual al nodo i
            es menor que la distancia conocida hasta ahora (dist[i])*/
            if (!visitado[i] && matriz[actual][i] < dist[i]) {
                dist[i] = matriz[actual][i];  // Actualizar distancia mínima
                previo[i] = actual;           // Guardar el nodo previo
                cola.push({ i, dist[i] });      // Insertar el vecino en la cola de prioridad
            }
        }
    }

    return ruta;  // Devuelve los indices del nodo recorrido en el MST
}


 vector<int> Greedy(const vector<vector<double>>& matriz) {
    int n = matriz.size();
    vector<bool> visitado(n, false);  //Para marcar los nodos visitados
    vector<int> ruta;
    int actual = 0; // Nodo desde donde empezamos
    ruta.push_back(actual); //Agregar el nodo inicial al recorrido
    visitado[actual] = true;//Marcar como visitado

    while (ruta.size() < n) { //Mientras quedan nodos por visitar
        int siguiente = -1;
        double distanciaMinima = UINT_MAX;

        //Busca el vecino más cercano no visitado
        for (int vecino = 0; vecino < n; ++vecino) {
            if (!visitado[vecino] && matriz[actual][vecino] < distanciaMinima) {
                siguiente = vecino;
                distanciaMinima = matriz[actual][vecino];
            }
        }
        // Si no hay vecinos disponibles, terminamos el recorrido
        if (siguiente == -1) break;

        // Moverse al siguiente nodo más cercano
        actual = siguiente;
        ruta.push_back(actual);
        visitado[actual] = true;  // Marcar el nodo como visitado
    }

    return ruta;  // Devolver la ruta encontrado
}



 vector<int> Dijkstra(const vector<vector<double>>& matriz) {
    int n = matriz.size();
    int origen = 0;
    vector<bool> visitado(n, false); // Marca los nodos visitados
    vector<int> ruta; // Almacena la ruta final

    ruta.push_back(origen); // Añade el nodo inicial a la ruta
    visitado[origen] = true;

    int actual = origen;
    while (ruta.size() < n) { // Asegura que se recorran todos los nodos
        int siguiente = -1;
        double menorDistancia = UINT_MAX;

        // Busca el nodo vecino más cercano no visitado
        for (int vecino = 0; vecino < n; ++vecino) {
            if (!visitado[vecino] && matriz[actual][vecino] > 0 && matriz[actual][vecino] < menorDistancia) {
                siguiente = vecino;
                menorDistancia = matriz[actual][vecino];
            }
        }

        if (siguiente == -1) break; // Si no hay vecinos disponibles, termina

        ruta.push_back(siguiente); // Añade el nodo siguiente a la ruta
        visitado[siguiente] = true; // Marca como visitado
        actual = siguiente; // Avanza al nodo siguiente
    }

    return ruta;
}




// Funcion para encontrar el conjunto de un nodo (Union-Find)
 int encontrarConjunto(vector<int>& parent, int nodo) {
    if (parent[nodo] != nodo)
        parent[nodo] = encontrarConjunto(parent, parent[nodo]);
    return parent[nodo];
}

// Funcion para unir dos conjuntos (Union-Find)
 void unirConjuntos(vector<int>& parent, vector<int>& rank, int nodo1, int nodo2) {
    int raiz1 = encontrarConjunto(parent, nodo1);
    int raiz2 = encontrarConjunto(parent, nodo2);
    if (raiz1 != raiz2) {
        if (rank[raiz1] > rank[raiz2]) {
            parent[raiz2] = raiz1;
        }
        else if (rank[raiz1] < rank[raiz2]) {
            parent[raiz1] = raiz2;
        }
        else {
            parent[raiz2] = raiz1;
            rank[raiz1]++;
        }
    }
}

// Función recursiva que va armando la ruta
 void armarRuta(int nodo, const vector<vector<int>>& mst, vector<bool>& visitado, vector<int>& ruta) {
    visitado[nodo] = true;
    ruta.push_back(nodo);  // Agrega el nodo actual a la ruta
    for (int vecino : mst[nodo]) {
        if (!visitado[vecino]) {
            armarRuta(vecino, mst, visitado, ruta);  // Para los vecinos no visitados
        }
    }
}

// Algoritmo de Kruskal
 vector<int> Kruskal(const vector<vector<double>>& matriz) {
    int n = matriz.size();
    vector<tuple<double, int, int>> aristas;
    vector<int> ruta;  // Almacena la ruta para recorrer el MST

    // Convierte la matriz de adyacencia en una lista de aristas
    for (int i = 0; i < n; ++i) {
        for (int j = i + 1; j < n; ++j) {
            if (matriz[i][j] > 0) {
                aristas.push_back({ matriz[i][j], i, j });
            }
        }
    }

    // Ordena las aristas por peso
    sort(aristas.begin(), aristas.end());

    // Inicializa estructuras de Union-Find
    vector<int> parent(n); //representante de un conjunto
    vector<int> rank(n, 0); //Altura del arbol, osea la distancia
    for (int i = 0; i < n; ++i) parent[i] = i;

    // Construcción del MST
    vector<vector<int>> mst(n);  // Lista de adyacencia para el MST
    for (const auto& [peso, u, v] : aristas) {
        int conjuntoOrigen = encontrarConjunto(parent, u);
        int conjuntoDestino = encontrarConjunto(parent, v);

        // Si no forman un ciclo, añade la arista al MST
        if (conjuntoOrigen != conjuntoDestino) {
            unirConjuntos(parent, rank, u, v);
            mst[u].push_back(v);
            mst[v].push_back(u);
        }
    }

    // Realiza un recorrido para obtener la ruta
    vector<bool> visitado(n, false);
    armarRuta(0, mst, visitado, ruta);  // Llama a DFS desde el nodo 0
    return ruta;
}



 void imprimirRuta(const vector<int>& ruta, const vector<tuple<string, double, double>>& ciudades) {
    for (int i = 0; i < ruta.size(); ++i) {

        //HAY QUE CAMBIAR ESTA LINEA PARA QUE JALE EL NOMBRE DE LA CIUDAD CON ESE INDICE DE LA BD
        cout << get<0>(ciudades[ruta[i]]); //el get accede al primer elemento de la tupla (0)

        if (i < ruta.size() - 1) cout << " -> ";
    }
    cout << endl;
}

 double calcularKMruta(const vector<int>& ruta, const vector<vector<double>>& matriz) {
    double distanciaTotal = 0.0;

    for (size_t i = 0; i < ruta.size() - 1; ++i) {
        int ciudadActual = ruta[i];
        int ciudadSiguiente = ruta[i + 1];
        // Suma la distancia entre la ciudad actual y la siguiente
        distanciaTotal += matriz[ciudadActual][ciudadSiguiente];
    }

    return distanciaTotal;
}

double calculaCosto(double distancia) { //A350
    double combustibleXlitro = 1.89; // Costo de 1L de combustible
    double litrosXkm = 0.03;        // Litros de combustible gastado por km recorrido del avión

    return distancia * (litrosXkm * combustibleXlitro);
}

